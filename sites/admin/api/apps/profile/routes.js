var shared = require('../../shared'),
    profile = require('./profile')

module.exports = class {
    static setup(router) {
        router.all('/profile', shared.token.authenticate, profile.get);
        router.all('/roles', shared.token.authenticate, profile.roles);
    }
};