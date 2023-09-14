var _ = require('lodash'),
	lib = require('../library');

module.exports = class tokenAuth {
	static async authenticate(req, res, next) {
		try {
			var token = req.header('Token');
			let admin_id = await lib.tokens.validate(token);
			if (admin_id) {
				req.admin = await lib.cache.get(`shared-token-authenticate-admin-${admin_id}`, 10000, async () => {
					return await lib.orm.admins.fetch(admin_id);
				});
				req.roles = await lib.cache.get(`shared-token-authenticate-roles-${admin_id}`, 10000, async () => {
					return _.map(await lib.orm.admins_roles_to_admins.fetchAll({ admin_id }, ['role_id']), 'role_id');
				});
				next();
			} else {
				res.status(401).send({
					success: false,
					message: 'invalid request, please check your request token.',
				});
			}
		} catch (err) {
			next(err);
		}
	}
};
