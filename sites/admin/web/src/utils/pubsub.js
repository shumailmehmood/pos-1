import ps from '!/library-web/pubsub';
import lib from '!/library-web/lib';
import utils from './';

class pubsub {
    static init(host) {
        let token = lib.store.get('token');
        if (token) {
            ps.init(pubsub, token, host);
        }
    }

    static stop() {
        ps.stop();
    }

    static onMessage(message) {
        if (message) {
            utils.emitter.emit('pubsub', message);
        }
    }

    static async subscribe(channels) {
        let token = lib.store.get('token');
        if (!token) {
            return;
        }
        if (!channels) {
            channels = [];
        }
        let profile = await utils.auth.getProfile();
        if(profile){
            channels.push(`admin-${profile.admin_id}`);
        }
        await lib.helper.waitForTruthy(() => {
            return ps.isConnected();
        });
        ps.subscribe(channels);
    }
}

export default pubsub;