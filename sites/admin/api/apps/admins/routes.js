var search = require('./search'),
    general = require('./general'),
    roles = require('./roles'),
    shared = require('../../shared');

module.exports = class {
    static setup(router) {
        router.all('/admins', shared.token.authenticate, search.list);
        router.all('/admins/:admin_id/general', shared.token.authenticate, general.get);
        router.all('/admins/:admin_id/general/save', shared.token.authenticate, general.save);
        router.all('/admins/:admin_id/general/unlock', shared.token.authenticate, general.unlock);
        router.all('/admins/:admin_id/general/invite', shared.token.authenticate, general.invite);

        router.all('/admins/:admin_id/roles', shared.token.authenticate, roles.get);
        router.all('/admins/:admin_id/roles/add', shared.token.authenticate, roles.add);
        router.all('/admins/:admin_id/roles/delete', shared.token.authenticate, roles.delete);
    }
};