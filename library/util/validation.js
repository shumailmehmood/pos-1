var _ = require('lodash'),
    validate = require('validate.js'),
    lib = require('../index.js');

module.exports = class {
    static validate(input, rules) {
        lib.util.string.trimAllProperties(input);
        var vals = validate(input, rules);
        if (vals) {
            var message = '';
            var inputs = {};
            _.forOwn(vals, (value, key) => { //(value, key)
                var errors = value.join();
                message += `${errors}.`;
                inputs[key] = {
                    message: errors
                };
            });
            return Promise.resolve({
                valid: false,
                message: message,
                inputs
            });
        } else {
            return Promise.resolve({
                valid: true
            });
        }
    }
};
