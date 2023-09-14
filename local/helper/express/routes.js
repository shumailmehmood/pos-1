
module.exports = class {
    static setup(app, router) {
        require('../apps/misc/routes').setup(router);
        app.use(router);
    }
};