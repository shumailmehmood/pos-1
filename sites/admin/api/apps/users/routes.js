var search = require('./search'),
    general = require('./general'),
    teams = require('./teams'),
    roles = require('./roles'),
    shared = require('../../shared');

module.exports = class {
    static setup(router) {
        router.all('/users', shared.token.authenticate, search.list);
        router.all('/users/:user_id/general', shared.token.authenticate, general.get);
        router.all('/users/:user_id/general/save', shared.token.authenticate, general.save);
        router.all('/users/:user_id/general/unlock', shared.token.authenticate, general.unlock);
        router.all('/users/:user_id/general/invite', shared.token.authenticate, general.invite);
        router.all('/users/:user_id/general/impersonate', shared.token.authenticate, general.impersonate);

        router.all('/users/:user_id/teams', shared.token.authenticate, teams.get);
        router.all('/users/:user_id/teams/save', shared.token.authenticate, teams.save);

        router.all('/users/:user_id/roles', shared.token.authenticate, roles.get);
        router.all('/users/:user_id/roles/save', shared.token.authenticate, roles.save);
    }
};