const _ = require('lodash'),
    validate = require('validate.js'),
    lib = require('./index');

module.exports = class forms {
    static input(req, res, checks, rules) {
        let input = _.merge(req.query, req.body, req.params);
        lib.util.string.trimAllProperties(input);

        let allRules = rules || {};
        _.each(checks, (check) => {
            allRules[check] = {
                presence: true
            };
        });


        var vals = validate(input, allRules);
        if (vals) {
            var message = '';
            var inputs = {};
            _.forOwn(vals, (value, key) => {
                var errors = value.join();
                message += `${errors}.`;
                inputs[key] = {
                    message: errors
                };
            });
            res.status(400);
            throw new Error(message);
        } else {
            return input;
        }
    }

    static invalid(message) {
        // res.status(400);
        throw new Error(message);
    }

    static ensure(input, checks, rules) {
        let allRules = rules || {};
        _.each(checks, (check) => {
            allRules[check] = {
                presence: true
            };
        });
        var vals = validate(input, allRules);
        if (vals) {
            var message = '';
            var inputs = {};
            _.forOwn(vals, (value, key) => {
                var errors = value.join();
                message += `${errors}.`;
                inputs[key] = {
                    message: errors
                };
            });
            // res.status(400);
            throw new Error(message);
        } else {
            return input;
        }
    }
};