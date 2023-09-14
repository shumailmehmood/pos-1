var _ = require('lodash'),
	os = require('os'),
	lib = require('../../library');

var _host = os.hostname();

class controller {
	constructor(context) {
		this.context = context || {};
	}

	async home() {
		return {};
	}

	async lb() {
		return {
			host: _host,
		};
	}

	async health() {
		var results = [];

		// test database
		try {
			let test = await lib.orm.test.fetch();
			results.push({
				name: 'db',
				result: true,
			});
		} catch (err) {
			results.push({
				name: 'db',
				result: false,
				err: err,
			});
		}

		var failed = _.find(results, {
			result: false,
		});
		var uptime = process.uptime();
		return {
			failed: failed ? true : false,
			results: results,
			uptime: uptime,
		};
	}
}

module.exports = class {
	static async home(req, res, next) {
		try {
			let data = await new controller(req).home();
			data.req = req;
			res.render('apps/misc/views/home.ejs', data);
		} catch (err) {
			next(err);
		}
	}

	static async lb(req, res, next) {
		try {
			let data = await new controller(req).lb();
			data.req = req;
			res.render('apps/misc/views/lb.ejs', data);
		} catch (err) {
			next(err);
		}
	}

	static async health(req, res, next) {
		try {
			let data = await lib.cache.get(`health`, 1 * 60 * 1000, async () => {
				return await new controller(req).health();
			});
			data.req = req;
			res.status(data.failed ? 207 : 200).render('apps/misc/views/health.ejs', data);
		} catch (err) {
			next(err);
		}
	}
};
