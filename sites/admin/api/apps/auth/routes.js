var auth = require('./auth'),
	shared = require('../../shared');

module.exports = class {
	static setup(router) {
		router.all('/auth/login', auth.login);
		router.all('/auth/mfa', auth.mfa);
		router.all('/auth/validate', shared.token.authenticate, auth.validate);
		router.all('/auth/logout', shared.token.authenticate, auth.logout);
	}
};
