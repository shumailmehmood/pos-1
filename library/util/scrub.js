module.exports = class {
    static scrub() {
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i]) {
                delete arguments[i].password;

                if (arguments[i].body) {
                    delete arguments[i].body.password;
                }
                if (arguments[i].query) {
                    delete arguments[i].query.password;
                }
                if (arguments[i].data) {
                    delete arguments[i].data.password;
                }
            }
        }
    }
};
