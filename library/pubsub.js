const lib = require('./index');

module.exports = class pubsub {
    static async publish(channel, message) {
        lib.http({
            method: 'POST',
            uri: `http://pubsub-api-service:8099/publish`,
            body: {
                channel: channel,
                message: message
            }
        });
    }

    static async broadcast(message) {
        lib.http({
            method: 'POST',
            uri: `http://pubsub-api-service:8099/broadcast`,
            body: {
                message: message
            }
        });
    }
};