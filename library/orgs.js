const lib = require('./index');

module.exports = class orgs {
    static async hasAccess(org_id, user_id) {
        // validate params
        if (org_id === undefined || org_id === null || user_id === undefined || user_id === null) {
            return false;
        }

        // get access
        let record = await lib.cache.get(`orgs-hasAccess-${org_id}-${user_id}`, 60 * 1000, async() => {
            return await lib.orm.users_to_orgs.fetch({
                user_id,
                org_id,
            });
        });

        if (record) {
            return true;
        } else {
            return false;
        }
    }
};