const path = require('path'),
	promise = require('bluebird'),
	ejs = require('ejs'),
	moment = require('moment'),
	lib = require('../index');

module.exports = class mfa {
	static async generateAndSend(admin) {
		// generate new id and code
		var mfaid = lib.util.guid.generate();
		var mfacode = lib.util.string.generateNumeric(6);

		// save mfa record
		await lib.orm.mfa_admin.save({
			id: mfaid,
			admin_id: admin.admin_id,
			code: mfacode
		});

		if (admin.phone) {
			// send email
			await lib.util.sms.send(global.config.twilio.number, admin.phone, `Verification code: ${mfacode}`);
		} else {
			// generate email
			let filePath = path.resolve(__dirname, './emails/mfa.ejs');
			let html = await promise.promisify(ejs.renderFile)(
				filePath,
				{
					code: mfacode,
				},
				{}
			);

			// send email
			await lib.util.email.send(`mfa@${global.config.email.domain}`, admin.email, 'Your verification code', html);
		}

		// return new id
		return mfaid;
	}

	static async validate(id, code) {
		// validate params
		if (id === undefined || id === null || code === undefined || code === null) {
			return false;
		}

		// get mfa record
		var record = await lib.orm.mfa_admin.fetch({
			id: id
		});
		if (!record) {
			return false;
		}

		// check code
		if (record.code !== code) {
			return false;
		}

		// check time
		var minsAgo = moment().diff(moment(Number(record.created_on)), 'minutes');
		if (minsAgo > 15) {
			return false;
		}

		// delete mfa record
		await lib.orm.mfa_admin.delete(record);

		// mfa code is good
		return record.admin_id;
	}
};
