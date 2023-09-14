const _ = require('lodash'),
    lib = require('../index');

const _features = {
    consults: false
};

module.exports = class enterprises {
    static async getFeatures(enterprise_id) {
        let features = await lib.orm.enterprises_features.fetch(enterprise_id);
        if (features) {
            features = _.defaults(features, _features);
        } else {
            features = _.clone(_features);
        }
        return features;
    }
};