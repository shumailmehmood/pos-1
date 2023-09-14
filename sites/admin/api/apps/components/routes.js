var teams = require('./teams'),
    admin_roles = require('./admin_roles'),
    roles = require('./roles'),
    shared = require('../../shared');

module.exports = class {
    static setup(router) {
        router.all('/components/teams', shared.token.authenticate, teams.search);
        router.all('/components/teams/list', shared.token.authenticate, teams.list);

        router.all('/components/roles', shared.token.authenticate, roles.search);
        router.all('/components/roles/list', shared.token.authenticate, roles.list);

        router.all('/components/admin_roles', shared.token.authenticate, admin_roles.search);
    }
};