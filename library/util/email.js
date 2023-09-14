const { SESClient, SendEmailCommand, SendRawEmailCommand } = require("@aws-sdk/client-ses");
const mailcomposer = require('nodemailer/lib/mail-composer');
const _ = require('lodash'),
    common = require('./common');

const _ses = new SESClient({
    region: global.config.aws.region,
    credentials: {
        accessKeyId: global.config.aws.access_key,
        secretAccessKey: global.config.aws.secret_key
    }
});


class email {

    static send(from, to, subject, body) {

        let list = email.sanitize(to);
        if (list.length === 0) {
            return Promise.resolve();
        }

        let sendEmailCommand = new SendEmailCommand({
            Source: from,
            Destination: {
                ToAddresses: list,
                CcAddresses: []
            },
            ReplyToAddresses: [],
            Message: {
                Body: {
                    Html: {
                        Charset: "UTF-8",
                        Data: body,
                    },
                    Text: {
                        Charset: "UTF-8",
                        Data: body,
                    },
                },
                Subject: {
                    Charset: "UTF-8",
                    Data: subject,
                },
            },
        });
        return _ses.send(sendEmailCommand);
    }

    static async sendWithAttachments(from, to, subject, body, attachments) {
        const toAddresses = email.sanitize(to);
        if (!toAddresses.length) {
            return Promise.resolve();
        }

        const mail = new mailcomposer({
            from: from,
            replyTo: from,
            to: toAddresses,
            subject: subject,
            html: body,
            attachments: _.map(attachments, (att) => {
                return {
                    path: att
                };
            })
        });

        const message = await mail.compile().build();
        const command = new SendRawEmailCommand({
            RawMessage: {
                Data: message 
            } 
        });

        return _ses.send(command);
    }

    static sanitize(to) {
        let list = [];
        if (to) {
            if (typeof to === 'string' || to instanceof String) {
                to = to.trim();
                to = to.replaceAll(';', ',');
                to = to.split(',');
            }
            _.each(to, (em) => {
                if (em) {
                    em = em.trim();
                    if (common.isEmail(em)) {
                        list.push(em);
                    }
                }
            });
        }
        return list;
    }
}

module.exports = email;
