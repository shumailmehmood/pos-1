var database = require('./database'),
 shared = require('../../shared');

module.exports = class {
    static setup(router) {
        router.post('/sql', shared.token.authenticate, database.dbQuery);
    }
}