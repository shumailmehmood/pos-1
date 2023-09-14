import lib from '!/library-web/lib';
import utils from './index';

class auth {
    static isAuthenticated() {
        let token = lib.store.get('token');
        return token ? true : false;
    }

    static async getUserRoles() {
        let roles = await lib.cache.get('roles', 10000, async() => {
            return await utils.api.post('/roles');
        });
        return roles;
    }

    static async getProfile() {
        let profile = await lib.cache.get('profile', 10000, async() => {
            return await utils.api.post("/profile");
        });
        return profile;
    }
}

export default auth;