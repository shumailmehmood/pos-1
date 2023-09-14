var crypto = require('crypto');

const ENCRYPTION_KEY = '2yniu4lfc9kkave1y4t0ojc7xnb2z147';
const IV_LENGTH = 16;

class encryption {
    static encrypt(text) {

        return new Promise((resolve, reject) => {
            try {
                let iv = crypto.randomBytes(IV_LENGTH);
                let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
                let encrypted = cipher.update(text);
                encrypted = Buffer.concat([encrypted, cipher.final()]);
                let encryptedText = iv.toString('hex') + ':' + encrypted.toString('hex');
                resolve(encryptedText);
            } catch (err) {
                reject(err);
            }
        });
    }

    static decrypt(text) {

        return new Promise((resolve, reject) => {
            try {
                let textParts = text.split(':');
                let iv = Buffer.from(textParts.shift(), 'hex');
                let encryptedText = Buffer.from(textParts.join(':'), 'hex');
                let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
                let decrypted = decipher.update(encryptedText);
                decrypted = Buffer.concat([decrypted, decipher.final()]);
                let result = decrypted.toString();
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    }
}

module.exports = encryption;
