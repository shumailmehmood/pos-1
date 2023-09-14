var _ = require('lodash'),
	path = require('path'),
	ejs = require('ejs'),
	lib = require('../../library');

module.exports = class general {
	static async get(req, res, next) {
		try {
			let input = lib.forms.input(req, res, ['user_id']);
			let user = await lib.orm.users.fetch(input.user_id);
			res.json(user);
		} catch (err) {
			next(err);
		}
	}

	static async save(req, res, next) {
		try {
			let input = lib.forms.input(req, res, ['user_id', 'first_name', 'last_name', 'email'], {
				email: {
					email: true,
				},
			});

			if (input.user_id === '-') {
				let existing = await lib.orm.users.fetch({
					email: input.email,
				});
				if (existing) {
					return res.json({
						success: false,
						message: 'email already exists',
					});
				}
				input.user_id = lib.util.guid.generate();
				if (input.team_id) {
					await lib.orm.users_to_teams.save({
						user_id: input.user_id,
						team_id: input.team_id,
					});
					if (input.role_id) {
						await lib.orm.users_to_roles.save({
							user_id: input.user_id,
							team_id: input.team_id,
							role_id: input.role_id,
						});
					}
				}
			}

			await lib.orm.users.save(input);

			if (input.sendinvite) {
				await general.sendInvite(req, input.user_id);
			}

			res.json({
				success: true,
				user_id: input.user_id,
			});
		} catch (err) {
			next(err);
		}
	}

	static async unlock(req, res, next) {
		try {
			let input = lib.forms.input(req, res, ['user_id']);
			await lib.orm.users.save({
				user_id: input.user_id,
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
			let input = lib.forms.input(req, res, ['user_id']);

			await general.sendInvite(req, input.user_id);

			res.json({
				success: true,
			});
		} catch (err) {
			next(err);
		}
	}

	static async sendInvite(req, user_id) {
		let user = await lib.orm.users.fetch(user_id);

		let templateData = {
			link: `https://${global.config.host}/teams`,
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
		};
		var templatePath = path.resolve(__dirname, 'templates', `invite.ejs`);
		let message = await ejs.renderFile(templatePath, templateData, { async: false });

		const from = 'invite@vital.chat';
		const subject = `You've been added to a care team!`;

		await lib.util.email.send(from, user.email, subject, message);
	}

	static async impersonate(req, res, next) {
		try {
			let input = lib.forms.input(req, res, ['user_id']);

			let impersonate_id = lib.util.guid.generate();
			let link = `https://${global.config.host}/portal/impersonate?impersonate_id=${impersonate_id}`;
			await lib.orm.impersonate_users.save({
				impersonate_id: impersonate_id,
				user_id: input.user_id,
			});

			res.json({
				link: link,
			});
		} catch (err) {
			next(err);
		}
	}
};
