const _ = require('lodash'),
	path = require('path'),
	promise = require('bluebird'),
	ejs = require('ejs'),
	lib = require('../index');

module.exports = class self {
	static async notify(consult_id, list, template) {
		let consult = await lib.orm.consults.fetch(consult_id);
		let specialty = await lib.orm.consults_specialties.fetch(consult.specialty_id);
		let acuity = await lib.orm.consults_acuities.fetch(consult.acuity_id);
		consult.speciality_name = specialty.name;
		consult.acuity_name = acuity.name;

		let org = await lib.orm.orgs.fetch(consult.org_id);
		let partner = await lib.orm.consults_partners_to_orgs.fetch({ org_id: consult.org_id });
		let pusers = await lib.orm.consults_lists.fetchAll({
			partner_id: partner.partner_id,
			list: list,
		});

		let link = `https://${global.config.host}/partner/consults/${consult_id}`;

		// generate email
		let emailPath = path.resolve(__dirname, `./emails/consults/${template}.ejs`);
		let subject = `Consultation Requestd by ${org.name}`;
		let email = await promise.promisify(ejs.renderFile)(
			emailPath,
			{
				org: org,
				consult: consult,
				link: link,
			},
			{}
		);

		// generate sms
		let smsPath = path.resolve(__dirname, `./sms/consults/${template}.ejs`);
		let sms = await promise.promisify(ejs.renderFile)(
			smsPath,
			{
				org: org,
				consult: consult,
				link: link,
			},
			{}
		);

		_.each(pusers, (puser) => {
			lib.notifications.puser.sendEmail(puser.puser_id, subject, email);
			lib.notifications.puser.sentSMS(puser.puser_id, sms);
		});
	}

	static async notifyProviders(consult_id) {
		await self.notify(consult_id, 'providers', 'notify_providers');
	}

	static async notifyOperators(consult_id) {
		await self.notify(consult_id, 'operators', 'escalate_operators');
	}

	static async notifyLeaders(consult_id) {
		await self.notify(consult_id, 'leaders', 'escalate_leaders');
	}
};
