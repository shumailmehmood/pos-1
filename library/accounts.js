const lib = require('./index');

module.exports = class orgs {
	static async hasAccess(account_id, user_id) {
		// validate params
		if (account_id === undefined || account_id === null || user_id === undefined || user_id === null) {
			return false;
		}

		// get access
		let record = await lib.cache.get(`accounts-hasAccess-${account_id}-${user_id}`, 60 * 1000, async () => {
			return await lib.orm.users_to_accounts.fetch({
				user_id,
				account_id,
			});
		});

		if (record) {
			return true;
		} else {
			return false;
		}
	}
};
