const moment = require('moment'),
	lib = require('../index');

module.exports = class tokens {
	static async generate(app, ref_id) {
		// generate new token
		var token = lib.util.guid.generate();

		// save mfa record
		await lib.orm.tokens.save({
			token: token,
			app: app,
			ref_id: ref_id,
		});

		// return new token
		return token;
	}

	static async validate(token) {
		// validate params
		if (token === undefined || token === null) {
			return false;
		}

		// check token cache
		let result = await lib.cache.get(`token-${token}`, 5 * 60 * 1000, async () => {
			// get token record
			var record = await lib.orm.tokens.fetch(token);
			if (!record) {
				return false;
			}

			// check time
			var daysAgo = moment().diff(moment(Number(record.updated_at)), 'days');
			if (daysAgo > 7) {
				return false;
			}

			// update sliding time
			await lib.orm.tokens.save({
				token: record.token,
				updated_at: new Date().getTime(),
			});

			// token is good
			return record.ref_id;
		});

		return result;
	}

	static async delete(token) {
		// validate params
		if (token === undefined || token === null) {
			return false;
		}

		// delete token record
		await lib.orm.tokens.delete(token);
	}
};
