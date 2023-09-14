var _cache = {};

class cache {
    static async get(key, timeout, callback) {
        if(timeout === null || timeout === undefined){
            timeout = 10000;
        }
        if (_cache[key] === undefined) {
            _cache[key] = await callback();
            setTimeout(
                (key) => {
                    _cache[key] = undefined;
                },
                timeout,
                key
            );
            return _cache[key];
        } else {
            return _cache[key];
        }
    }
}

module.exports = cache;