module.exports = class {
	static setup(app, router) {
		require('../apps/misc/routes').setup(router);
		require('../apps/auth/routes').setup(router);
		require('../apps/admins/routes').setup(router);
		require('../apps/users/routes').setup(router);
		require('../apps/components/routes').setup(router);
		require('../apps/profile/routes').setup(router);
		require('../apps/settings/routes').setup(router);
		require('../apps/database/routes').setup(router);
		app.use(router);
	}
};
