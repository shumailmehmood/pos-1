var _ = require('lodash'),
	crypto = require('crypto'),
	lib = require('../library');

class ice {
	static async getIceServers(org_id, id) {
		let ice_settings = await lib.orm.ice_settings.fetch(org_id);

		// using custom ice servers?
		if (ice_settings) {
			if (ice_settings.is_custom) {
				return ice.getCustomIceServers(org_id);
			}
		}

		// using custom twilio account?
		let twilio_settings = await lib.orm.twilio_accounts.fetch(org_id);
		if (twilio_settings) {
			if (twilio_settings.is_custom) {
				return lib.twilio.getIceServers(org_id);
			}
		}

		// using vc turn servers?
		if (global.config.turn.enabled) {
			let turn_servers = await lib.cache.get(`turn_servers`, 30 * 1000, async () => {
				return await lib.orm.turn_servers.fetchAll();
			});
			if (turn_servers.length > 0) {
				return ice.getTurnIceServers(id);
			}
		}

		// use vc twilio account;
		return lib.twilio.getIceServers();
	}

	static async getCustomIceServers(org_id) {
		let servers = await lib.orm.ice_custom_servers.fetchAll({ org_id: org_id });
		let iceServers = [];
		_.each(servers, (server) => {
			let ice = {};
			if (server.type === 'stun') {
				if (server.ssl) {
					ice.url = `stun:${server.domain}:${server.port}?transport=${server.protocol}`;
					ice.urls = `stun:${server.domain}:${server.port}?transport=${server.protocol}`;
				} else {
					ice.url = `stun:${server.domain}:${server.port}?transport=${server.protocol}`;
				}
			} else {
				if (server.ssl) {
					ice.url = `turn:${server.domain}:${server.port}?transport=${server.protocol}`;
					ice.urls = `turn:${server.domain}:${server.port}?transport=${server.protocol}`;
				} else {
					ice.url = `turn:${server.domain}:${server.port}?transport=${server.protocol}`;
				}
				if (server.creds_static) {
					ice.username = server.creds_static_username;
					ice.credential = server.creds_static_secret;
				} else {
					let expire_on = Math.floor(new Date().getTime() / 1000) + 24 * 60 * 60;
					let user = lib.util.string.generate(16);
					let usercombo = `${expire_on}:${user}`;
					let creds = crypto.createHmac('sha1', server.creds_dynamic_secret).update(usercombo).digest('base64');
					ice.username = usercombo;
					ice.credential = creds;
				}
			}
			iceServers.push(ice);
		});
		return iceServers;
	}

	static async getTurnIceServers(id) {

		let server_id;
		var lastCall = new Date().getTime() - 1 * 60 * 60 * 1000;
		let sticky = await lib.db.fetchOne(`SELECT * FROM turn_sticky WHERE id=:id AND updated_at > :lastCall`, {
			id: id,
			lastCall: lastCall,
		});
		if (sticky && sticky.server_id) {
			// use existing server
			await lib.db.execute(`UPDATE turn_sticky SET updated_at=jsNow() WHERE id=:id`, {
				id: id
			});
			server_id = sticky.server_id;
		} else {
			// pick new server
			let servers = await lib.cache.get(`turn_servers`, 30 * 1000, async () => {
				return await lib.orm.turn_servers.fetchAll();
			});
			var random = lib.util.common.getRandomInt(0, servers.length - 1);
			var random_host = servers[random];
			await lib.db.execute(`UPSERT INTO turn_sticky(id, server_id, updated_at) VALUES(:id, :server_id, :now)`, {
				id: id,
				server_id: server_id
			});
			server_id = random_host.server_id;
		}

		// construct ice servers
		let server = await lib.orm.turn_servers.fetch(server_id);
		var expire_on = Math.floor(new Date().getTime() / 1000) + (24 * 60 * 60);
		var user = lib.util.string.generate(16);
		var usercombo = `${expire_on}:${user}`;
		var creds = crypto.createHmac('sha1', server.secret).update(usercombo).digest('base64');
		var iceServers = [{
			url: `stun:${server.domain}:80?transport=udp`,
			urls: `stun:${server.domain}:443?transport=udp`
		}, {
			url: `turn:${server.domain}:80?transport=udp`,
			urls: `turn:${server.domain}:443?transport=udp`,
			username: usercombo,
			credential: creds
		}, {
			url: `turn:${server.domain}:80?transport=tcp`,
			urls: `turn:${server.domain}:443?transport=tcp`,
			username: usercombo,
			credential: creds
		}];

		return iceServers;
	}
}

module.exports = ice;
