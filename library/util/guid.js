var uuid = require('uuid');

module.exports = class {
    static generate() {
        return uuid.v4();
    }
    static isGuid(value) {
        if (!value) {
            return false;
        }
        if (typeof value !== 'string') {
            return false;
        }
        return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(value);
    }
};
