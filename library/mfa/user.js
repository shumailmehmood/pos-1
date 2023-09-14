const path = require('path'),
	promise = require('bluebird'),
	ejs = require('ejs'),
	moment = require('moment'),
	lib = require('../index');

module.exports = class mfa {
	static async generateAndSend(user) {
		// generate new id and code
		var mfaid = lib.util.guid.generate();
		var mfacode = lib.util.string.generateNumeric(6);

		// save mfa record
		await lib.orm.mfa_user.save({
			id: mfaid,
			user_id: user.user_id,
			code: mfacode
		});

		if (user.phone) {
			// send sms
			await lib.util.sms.send(global.config.twilio.number, user.phone, `Verification code: ${mfacode}`);
		}
		
		if (user.email) {
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
			await lib.util.email.send(`mfa@${global.config.email.domain}`, user.email, 'Your verification code', html);
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
		var record = await lib.orm.mfa_user.fetch({
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
		await lib.orm.mfa_user.delete(record);

		// mfa code is good
		return record.user_id;
	}
};
