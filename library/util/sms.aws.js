var aws = require('aws-sdk');

aws.config.update({
    accessKeyId: global.config.aws.access_key,
    secretAccessKey: global.config.aws.secret_key,
    region: global.config.aws.region,
    sslEnabled: true
});
var _sns = new aws.SNS();

class sms {

    static send(from, to, message) {

        var params = {};

        var phone = to;
        if (phone.length === 10) {
            phone = `+1${phone}`;
        }
        params.PhoneNumber = phone;
        params.Message = message;

        return new Promise((resolve, reject) => {
            _sns.publish(params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}

module.exports = sms;
