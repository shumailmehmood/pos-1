var _ = require('lodash'),
	moment = require('moment'),
	lib = require('../../library');

module.exports = class {
	static async login(req, res, next) {
		try {
			let input = lib.forms.input(req, res, ['email']);
			input.email = input.email.toLocaleLowerCase().trim();

			let admin = await lib.orm.admins.fetch({ email: input.email });
			if (!admin) {
				return res.json({
					success: false,
					inputs: {
						email: {
							message: `Email does not exist in the system`,
						},
					},
				});
			}

			// check if account locked
			var loginAttempts = admin.login_attempts || 0;
			if (loginAttempts >= 3) {
				var attempts = loginAttempts - 5;
				var lockoutMins = 5 * Math.pow(2, attempts);
				var minsAgo = moment().diff(moment(Number(admin.login_attempt_on)), 'minutes');
				var minsLeft = lockoutMins - minsAgo;
				if (minsLeft > 0) {
					return res.json({
						success: false,
						inputs: {
							email: {
								message: `Account locked for ${minsLeft} minutes`,
							},
						},
					});
				}
			}

			// increment attempts
			admin.login_attempts = loginAttempts + 1;
			admin.login_attempt_on = 0;
			admin.updated_at = new Date().getTime();
			await lib.orm.admins.save(admin);

			// generate mfa
			let mfaid = await lib.mfa.admin.generateAndSend(admin);
			res.json({
				success: true,
				mfaid: mfaid,
			});
		} catch (err) {
			next(err);
		}
	}

	static async mfa(req, res, next) {
		try {
			let input = lib.forms.input(req, res, ['mfaid', 'code']);

			let admin_id = await lib.mfa.admin.validate(input.mfaid, input.code);
			if (!admin_id) {
				return res.json({
					success: false,
					inputs: {
						code: {
							message: `Invalid code`,
						},
					},
				});
			}

			// reset attempts
			await lib.orm.admins.save({
				admin_id: admin_id,
				login_attempts: 0,
				login_attempt_on: 0,
			});

			// generate token
			let token = await lib.tokens.generate('admin', admin_id);

			return res.json({
				success: true,
				token: token,
			});
		} catch (err) {
			next(err);
		}
	}

	static async validate(req, res, next) {
		try {
			res.json({ success: true });
		} catch (err) {
			next(err);
		}
	}

	static async logout(req, res, next) {
		try {
			let input = {
				token: req.header('Token'),
			};
			if (input.token) {
				await lib.tokens.delete(input.token);
			}
			res.json({
				success: true,
			});
		} catch (err) {
			next(err);
		}
	}
};
