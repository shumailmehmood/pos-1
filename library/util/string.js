var _ = require('lodash');

class string {

    static generate(length) {
        var charset = 'abcdefghijklnopqrstuvwxyz',
            retVal = '';
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

    static generateNumeric(length) {
        var charset = '1234567890',
            retVal = '';
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

    static generateAlphaNumeric(length) {
        var charset = 'abcdefghijklnopqrstuvwxyz1234567890',
            retVal = '';
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }

    static generateUserName() {

        return new Promise(function (resolve) {
            var length = 8,
                charset = 'abcdefghijklnopqrstuvwxyz',
                retVal = '';

            for (var i = 0, n = charset.length; i < length; ++i) {
                retVal += charset.charAt(Math.floor(Math.random() * n));
            }

            resolve(retVal);
        });
    }

    static trimAllProperties(object) {
        for (var key in object) {
            if (object[key] !== undefined && object[key] !== null && object[key].trim) {
                object[key] = object[key].trim();
            }
        }
    }

    static getSubDomain(hostname) {
        if (hostname) {
            var parts = hostname.split('.');
            if (parts.length === 1) {
                return '';
            } else if (parts.length === 2) {
                return '';
            } else if (parts.length === 3) {
                return parts[0];
            } else {
                return parts.slice(0, parts.length - 2).join('.');
            }
        } else {
            return '';
        }
    }

    static getBaseDomain(hostname) {
        if (hostname) {
            return hostname.split('.').slice(-2).join('.');
        } else {
            return '';
        }
    }

    static getNameFromEmail(email) {
        if (email) {
            var index = email.indexOf('@');
            if (index > -1) {
                return email.substring(0, index);
            } else {
                return email;
            }
        } else {
            return '';
        }
    }

    static formatJSON(val) {
        var c;
        if (typeof val === 'string') {
            try {
                c = JSON.parse(val);
            } catch (e) {
                return val;
            }
        } else if (typeof val === 'object') {
            c = val;
        } else {
            return val;
        }
        return JSON.stringify(c, null, 4);
    }

    static toList(val) {
        if (!val) {
            return [];
        }
        if (typeof val !== 'string') {
            return [];
        }
        var t = val.trim().replace(/\n/g, ',');
        var ret = _.map(t.split(','), (i) => {
            return i.trim();
        });

        return ret;
    }
}

module.exports = string;