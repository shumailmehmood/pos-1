var _ = require('lodash'),
    lib = require('../../library');

module.exports = class general {
    static async get(req, res, next) {
        try {
            let input = lib.forms.input(req, res, ['user_id']);

            let roles = _.map(
                await lib.db.fetchAll(
                    `
            SELECT g.role_id, g.name
			FROM roles g INNER JOIN users_to_roles ug ON g.role_id=ug.role_id 
			WHERE ug.user_id=:user_id`,
                    input
                ),
                'role_id'
            );

            res.json({
                roles: roles,
            });
        } catch (err) {
            next(err);
        }
    }

    static async save(req, res, next) {
        try {
            let input = lib.forms.input(req, res, ['user_id', 'roles']);

            await lib.db.execute(`DELETE FROM users_to_roles WHERE user_id=:user_id`, {
                user_id: input.user_id
            });
            let list = lib.util.array.toSelectInList(input.roles, `'`);
            await lib.db.execute(`INSERT INTO users_to_roles (user_id, role_id) SELECT :user_id, role_id FROM roles WHERE role_id IN (${list}) ON CONFLICT ON CONSTRAINT users_to_roles_pkey DO NOTHING`, {
                user_id: input.user_id
            });

            res.json({
                success: true,
            });
        } catch (err) {
            next(err);
        }
    }
};