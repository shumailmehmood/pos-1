
var _globalVars = {};

class global {

	static set(key, value) {
		_globalVars[key] = value;
	}

	static get(key) {
		return _globalVars[key];
	}

	static isOptimized() {
		let optimized = global.get('optimized');
		return optimized;
	}
}

export default global;
