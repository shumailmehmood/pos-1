var _ = require('lodash'),
    lib = require('../library');

const paths = [{
    path: '/users',
    roles: ['super', 'users']
}, {
    path: '/devices',
    roles: ['super', 'devices']
}, {
    path: '/reports',
    roles: ['super', 'reports']
}, {
    path: '/admins',
    roles: ['super', 'admins']
}, {
    path: '/admins',
    roles: ['super', 'admins']
}, 

];

module.exports = class {
    static async authorize(req, res, next) {
        try {
            let hasAccess = false;
            if (req.roles) {
                let path = _.find(paths, (path) => {
                    return req.path.startsWith(path.path);
                });
                if (path) {
                    hasAccess = path.some((record) => req.roles.includes(record));

                } else {
                    hasAccess = true;
                }
            }
            if (hasAccess) {
                next();
            } else {
                res.status(401).json({
                    message: 'Not authorized to access this resource'
                });
            }
        } catch (err) {
            next(err);
        }
    }
};