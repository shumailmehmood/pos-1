var pages = require('./pages');

module.exports = class {
    static setup(router) {
        router.all('/', pages.home);
        router.all('/lb', pages.lbCheck);
    }
};