var _ = require('lodash'),
    path = require('path'),
    ejs = require('ejs'),
    lib = require('../../library');

module.exports = class general {
    static async get(req, res, next) {
        try {
            let input = lib.forms.input(req, res, ['admin_id']);
            let admin = await lib.orm.admins.fetch(input.admin_id);
            res.json({
                admin: admin,
            });
        } catch (err) {
            next(err);
        }
    }

    static async save(req, res, next) {
        try {
            let input = lib.forms.input(req, res, ['admin_id', 'first_name', 'last_name', 'email']);

            input.admin_id = input.admin_id === '-' ? lib.util.guid.generate() : input.admin_id;
            await lib.orm.admins.save(input);

            if (input.sendinvite) {
                await general.sendInvite(req, input.admin_id);
            }

            res.json({
                success: true,
            });
        } catch (err) {
            next(err);
        }
    }

    static async unlock(req, res, next) {
        try {
            let input = lib.forms.input(req, res, ['admin_id']);

            await lib.orm.admins.save({
                admin_id: input.admin_id,
                login_attempts: 0,
            });

            res.json({
                success: true,
            });
        } catch (err) {
            next(err);
        }
    }

    static async invite(req, res, next) {
        try {
            let input = lib.forms.input(req, res, ['admin_id']);

            await general.sendInvite(req, input.admin_id);

            res.json({
                success: true,
            });
        } catch (err) {
            next(err);
        }
    }

    static async sendInvite(req, admin_id) {
        let admin = await lib.orm.admins.fetch(admin_id);

        let templateData = {
            link: `https://${global.config.host}/admin`,
            first_name: admin.first_name,
            last_name: admin.last_name,
            email: admin.email,
        };
        var templatePath = path.resolve(__dirname, 'templates', `invite.ejs`);
        let message = await ejs.renderFile(templatePath, templateData, { async: false });

        const from = 'invite@vital.chat';
        const subject = `You've been added as an admin`;

        await lib.util.email.send(from, admin.email, subject, message);
    }
};