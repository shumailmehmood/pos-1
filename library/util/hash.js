var crypto = require('crypto');

class hash {
    static sha256(value) {
        var hash = crypto.createHash('sha256');
        hash.update(value, 'utf8');
        var hashedValue = hash.digest('hex');
        return hashedValue;
    }
}

module.exports = hash;
