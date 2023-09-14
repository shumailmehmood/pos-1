var _ = require('lodash'),
	lib = require('../../library');

module.exports = class {
	static async list(req, res, next) {
		try {
			let input = lib.forms.input(req);

			let users = await lib.db.search({
				cols: ['u.user_id', 'u.first_name', 'u.last_name', 'u.email', 'u.login_attempts'],
				from: `users u`,
				search: input.search,
				search_columns: ['u.first_name', 'u.last_name', 'u.email'],
				sort_columns: ['u.last_name'],
			});

			res.json({
				users: users,
			});
		} catch (err) {
			next(err);
		}
	}
};
