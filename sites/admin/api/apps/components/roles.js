var _ = require('lodash'),
    lib = require('../../library');

module.exports = class {
    static async search(req, res, next) {
        try {
            let input = lib.forms.input(req);

            let roles = await lib.orm.roles.search({
                search: input.query,
                page: 1,
                page_size: 10,
                select_columns: ['role_id', 'name'],
                search_columns: ['name'],
                sort_columns: ['name'],
            });

            res.json(roles);
        } catch (err) {
            next(err);
        }
    }

    static async list(req, res, next) {
        try {
            let input = lib.forms.input(req, res, ['roles']);

            let roles = [];
            if (input.roles.length > 0) {
                roles = await lib.db.fetchAll(`SELECT role_id, name FROM roles WHERE role_id IN ('${input.roles.join(`','`)}')`);
            }

            res.json(roles);
        } catch (err) {
            next(err);
        }
    }
};