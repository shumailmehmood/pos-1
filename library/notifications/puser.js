const lib = require('../index');

module.exports = class puser {
	static async sendEmail(puser_id, subject, body) {
		let puser = await lib.pusers.fetch(puser_id);
		if (puser) {
			if (!puser.notifications_disabled) {
				if (puser.notifications_email) {
					await lib.util.email.send(`notifications@vital.chat`, puser.notifications_email, subject, body);
				}
			}
		}
	}

	static async sentSMS(puser_id, body) {
		let puser = await lib.pusers.fetch(puser_id);
		if (puser) {
			if (!puser.notifications_disabled) {
				if (puser.notifications_phone) {
					await lib.util.sms.send(global.config.partners.sms, puser.notifications_phone, body);
				}
			}
		}
	}
};
