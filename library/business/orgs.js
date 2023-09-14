const _ = require('lodash'),
    lib = require('../index');

const _pricing = {
    device_activation: 5,
    device_multiview: 5,
    device_smartview: 5,
    device_voice_commands: 1,
    device_translation: 1,
    consumption_video: 0.1,
    consumption_phone: 0.1,
    consumption_textmessage: 0.1
};

const _features = {
    direct: true,
    multiview: true,
    smartview: true,
    voice_commands: true,
    translation: false,
    virtual_background: false,
    video_recording: false,
    follow_patient: false,
    consults: false
};

module.exports = class orgs {
    static async getPricing(org_id) {
        let pricing = await lib.orm.orgs_pricing.fetch(org_id);
        if (pricing) {
            pricing = _.defaults(pricing, _pricing);
        } else {
            pricing = _.clone(_pricing);
        }
        return pricing;
    }

    static async getFeatures(org_id) {
        let features = await lib.orm.orgs_features.fetch(org_id);
        if (features) {
            features = _.defaults(features, _features);
        } else {
            features = _.clone(_features);
        }
        return features;
    }
};