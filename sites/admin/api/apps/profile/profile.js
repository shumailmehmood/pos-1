// var _ = require('lodash'),
//     lib = require('../../library');

module.exports = class {

    static async get(req, res, next) {
        try {
            res.json({
                first_name: req.admin.first_name,
                last_name: req.admin.last_name,
            });
        } catch (err) {
            next(err);
        }
    }

    static async roles(req, res, next) {
        try {
            res.json(req.roles);
        } catch (err) {
            next(err);
        }
    }
};