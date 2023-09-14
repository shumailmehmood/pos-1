var bcrypt = require('bcryptjs'),
    moment = require('moment');

class password {
    static secure(password) {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, function (err, hash) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(hash);
                    }
                });
            });
        });
    }

    static check(password, hash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }

    static generate() {
        return new Promise((resolve) => {
            var length = 8,
                charset = 'abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
                retVal = '';
            for (var i = 0, n = charset.length; i < length; ++i) {
                retVal += charset.charAt(Math.floor(Math.random() * n));
            }
            resolve(retVal);
        });
    }

    static getLockTime(login_fails, login_failed_on) {
        var loginFails = login_fails || 0;
        if (loginFails >= 5) {
            var attempts = loginFails - 5;
            var lockoutMins = 5 * Math.pow(2, attempts);
            var minsAgo = moment().diff(moment(login_failed_on), 'minutes');
            var minsLeft = lockoutMins - minsAgo;
            return minsLeft < 0 ? 0 : minsLeft;
        }
        return 0;
    }

    static canReset(user, reqs) {
        if (reqs.reset_minutes > 0 && user.password_reset_on) {
            var minsAgo = moment().diff(moment(user.password_reset_on), 'minutes');
            if (reqs.reset_minutes > minsAgo) {
                return false;
            }
        }
        return true;
    }
}
module.exports = password;