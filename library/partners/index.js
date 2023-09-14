const lib = require('../index');

module.exports = class orgs {
    static async hasAccess(partner_id, puser_id) {
        // validate params
        if (partner_id === undefined || partner_id === null || puser_id === undefined || puser_id === null) {
            return false;
        }

        // get access
        var record = await lib.orm.pusers_to_partners.fetch({
            puser_id,
            partner_id
        });

        if (record) {
            return true;
        } else {
            return false;
        }
    }
};