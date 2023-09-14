class store {
	static save(key, value) {
		let newkey = store.getKey(key);
		if (value === null || value === undefined) {
			localStorage.removeItem(newkey);
		} else {
			localStorage.setItem(newkey, JSON.stringify(value));
		}
	}

	static get(key) {
		let newkey = store.getKey(key);
		let value = localStorage.getItem(newkey);
		if (value) {
			return JSON.parse(value);
		} else {
			return value;
		}
	}

	static clear() {
		let base = store.getBase();
		for (var key in localStorage) {
			if (key.startsWith(base + '-')) {
				localStorage.removeItem(key);
			}
		}
	}
	//SUPORT BOT
	static saveSession(key, value) {
		let newkey = store.getKey(key);
		sessionStorage.setItem(newkey, JSON.stringify(value));
	}

	static getSession(key) {
		let newkey = store.getKey(key);
		let value = sessionStorage.getItem(newkey);
		if (value) {
			return JSON.parse(value);
		} else {
			return value;
		}
	}

	static clearSession() {
		let base = store.getBase();
		for (var key in sessionStorage) {
			if (key.startsWith(base + '-')) {
				sessionStorage.removeItem(key);
			}
		}
	}

	static getKey(key) {
		let base = store.getBase();
		let newkey = `${base}-${key}`;
		return newkey;
	}

	static getBase() {
		let base = window.location.pathname.split('/')[1];
		return base;
	}
}

export default store;
