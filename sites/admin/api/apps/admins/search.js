var _ = require('lodash'),
    lib = require('../../library');

module.exports = class {
    static async list(req, res, next) {
        try {
            let input = lib.forms.input(req);

            let users = await lib.db.search({
                cols: ['a.admin_id', 'a.first_name', 'a.last_name', 'a.email', 'login_attempts'],
                from: `admins a`,
                search: input.search,
                search_columns: ['a.first_name', 'a.last_name', 'a.email'],
                sort_columns: ['a.first_name'],
            });

            res.json(users);
        } catch (err) {
            next(err);
        }
    }
};