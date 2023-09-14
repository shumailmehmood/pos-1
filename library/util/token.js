var crypto = require('crypto');

const ENCRYPTION_KEY = '2yniu4lfc9kkave1';
const IV_LENGTH = 16;

class token {
    static create() {
        var text = new Date().getTime().toString();
        let iv = crypto.randomBytes(IV_LENGTH);
        let cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        let encryptedText = iv.toString('hex') + ':' + encrypted.toString('hex');
        return encryptedText;
    }

    static check(text) {
        let textParts = text.split(':');
        let iv = Buffer.from(textParts.shift(), 'hex');
        let encryptedText = Buffer.from(textParts.join(':'), 'hex');
        let decipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        let dec = decrypted.toString();
        var dt = Number(dec);

        var validToken = false;
        if (new Date().getTime() - dt < (60 * 60 * 1000)) {
            validToken = true;
        }
        return validToken;
    }
}

module.exports = token;
