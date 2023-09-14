var _cache = {};

class cache {
	static async get(key, timeout = 10000, callback) {
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

	static clear() {
		_cache = {};
	}
	
	static async remove(key) {
        _cache[key] = undefined;
    }
}

export default cache;
