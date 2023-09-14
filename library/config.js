module.exports = class config {
	static get() {
		return {
			production: process.env.NODE_ENV === 'production' ? true : false,
			db: {
				host: process.env.GLOBAL_DB_HOST,
				port: Number(process.env.GLOBAL_DB_PORT),
				database: process.env.GLOBAL_DB_DATABASE,
				user: process.env.GLOBAL_DB_USER,
				password: process.env.GLOBAL_DB_PASSWORD,
			},
			aws: {
				access_key: process.env.GLOBAL_AWS_ACCESS_KEY,
				secret_key: process.env.GLOBAL_AWS_SECRET_KEY,
				region: process.env.GLOBAL_AWS_REGION,
				bucket: process.env.GLOBAL_AWS_BUCKET,
			},
			email: {
				domain: process.env.GLOBAL_EMAIL_DOMAIN
			},
			welcomeLetter: {
				path: process.env.PATIENTS_WELCOME_PDF_PATH,
				modifiedPath: process.env.PATIENTS_WELCOME_MODIFIED_PDF_PATH
			},
			backup: {
				access_key: process.env.GLOBAL_BACKUP_AWS_ACCESS_KEY,
				secret_key: process.env.GLOBAL_BACKUP_AWS_SECRET_KEY,
				env: process.env.GLOBAL_BACKUP_ENV,
			},
			host: process.env.GLOBAL_HOST,
			test: {
				username: process.env.GLOBAL_TEST_USERNAME,
				password: process.env.GLOBAL_TEST_PASSWORD,
			},
			twilio: {
				accountSid: process.env.GLOBAL_TWILIO_ACCOUNTSID,
				authToken: process.env.GLOBAL_TWILIO_AUTHTOKEN,
				voiceSID: process.env.GLOBAL_TWILIO_VOICE_SID,
				number: process.env.GLOBAL_TWILIO_NUMBER,
			},
			stripe: {
				key: process.env.GLOBAL_STRIPE_KEY,
			},
			newrelic: {
				enabled: config.toBool(process.env.NEWRELIC_ENABLE)
			}
		};
	}

	static toBool(val) {
		if (val === undefined || val === null) {
			return false;
		}
		return val === 'true' || val === true || val.indexOf('true') > -1;
	}

	static toArray(val) {
		if (val === undefined || val === null) {
			return [];
		}
		return val.split(',');
	}
};
