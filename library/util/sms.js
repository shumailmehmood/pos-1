const lib = require('../../library');

class sms {
	static async send(from, to, message) {
		await lib.twilio.sendSMS(from, to, message);
	}
}

module.exports = sms;
