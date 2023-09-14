const twilioo = require('twilio'),
	lib = require('./index');

const ClientCapability = twilioo.jwt.ClientCapability;
const VoiceResponse = twilioo.twiml.VoiceResponse;

var _client;
var _clientCall;

class twilio {
	static init() {
		if (!_client) {
			_client = new twilioo(global.config.twilio.accountSid, global.config.twilio.authToken);
		}
	}

	static initCall() {
		if (!_clientCall) {
			_clientCall = new ClientCapability({
				accountSid: global.config.twilio.accountSid,
				authToken: global.config.twilio.authToken,
				ttl: 3600,
			});

			_clientCall.addScope(
				new ClientCapability.OutgoingClientScope({
					applicationSid: global.config.twilio.voiceSID,
				})
			);
		}
	}

	static async searchNumber(areacode, org_id) {
		let client = await twilio.getClient(org_id);
		let result = await client.availablePhoneNumbers('US').local.list({ areaCode: areacode, limit: 20, capabilities: { sms: true, voice: true } });
		return result;
	}

	static async reserveNumber(number, orgname, org_id) {
		let client = await twilio.getClient(org_id);
		let result = await client.incomingPhoneNumbers.create({
			phoneNumber: number,
			friendlyName: orgname,
			smsUrl: `https://${global.config.host}/portal/api/direct/conversations/recieve`,
			voiceUrl: `https://${global.config.host}/portal/api/direct/phone/receive`,
		});
		return result;
	}

	static async getIceServers(org_id) {
		let client = await twilio.getClient(org_id);
		let token = await client.tokens.create({});
		var data = token.iceServers;
		return data;
	}

	static async getVoiceToken(org_id) {
		let client = await twilio.getCallClient(org_id);
		const token = client.toJwt();
		return token;
	}

	static GetVoiceTwiml(from, to) {
		var twiml = new VoiceResponse();
		var dial = twiml.dial({
			callerId: from,
		});
		dial.number({}, to);
		return twiml.toString();
	}

	static async sendSMS(from, to, message) {
		let client = await twilio.getClient();
		await new Promise((resolve, reject) => {
			client.messages.create(
				{
					to: to,
					from: from,
					body: message,
				},
				(err, message) => {
					if (err) {
						if (err.status === 400) {
							resolve(err);
						} else {
							reject(err);
						}
					} else {
						resolve(message);
					}
				}
			);
		});
	}

	static async getClient() {
		twilio.init();
		return _client;
	}

	static async getCallClient(org_id) {
		if (org_id) {
			let settings = await lib.orm.twilio_accounts.fetch(org_id);
			if (settings && settings.is_custom) {
				let client = new ClientCapability({
					accountSid: global.config.twilio.accountSid,
					authToken: global.config.twilio.authToken,
					ttl: 3600,
				});

				client.addScope(
					new ClientCapability.OutgoingClientScope({
						applicationSid: global.config.twilio.voiceSID,
					})
				);
				return client;
			}
		}
		twilio.initCall();
		return _clientCall;
	}
}

module.exports = twilio;
