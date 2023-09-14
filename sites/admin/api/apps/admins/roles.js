var _ = require('lodash'),
    lib = require('../../library');

module.exports = class general {
    static async get(req, res, next) {
        try {
            let input = lib.forms.input(req, res, ['admin_id']);

            let roles = await lib.db.fetchAll(
                `
			SELECT u.role_id, u.name
			FROM admins_roles u INNER JOIN admins_roles_to_admins ug ON u.role_id=ug.role_id 
			WHERE ug.admin_id=:admin_id`,
                input
            );

            res.json({
                roles: roles,
            });
        } catch (err) {
            next(err);
        }
    }

    static async add(req, res, next) {
        try {
            let input = lib.forms.input(req, res, ['admin_id', 'roles']);

            _.each(input.roles, async(role_id) => {
                await lib.orm.admins_roles_to_admins.save({
                    admin_id: input.admin_id,
                    role_id: role_id,
                });
            });

            res.json({
                success: true,
            });
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            let input = lib.forms.input(req, res, ['admin_id', 'role_id']);

            await lib.orm.admins_roles_to_admins.delete({
                role_id: input.role_id,
                admin_id: input.admin_id,
            });
            res.json({
                success: true,
            });
        } catch (err) {
            next(err);
        }
    }
};