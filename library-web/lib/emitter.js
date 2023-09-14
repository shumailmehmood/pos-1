import mitt from 'mitt';

const _emitter = mitt();

class emitter {
	static emit(event, message) {
		_emitter.emit(event, message);
	}

	static on(event, callback) {
		_emitter.on(event, callback);
	}

	static off(event, callback) {
		_emitter.off(event, callback);
	}

	clear() {
		_emitter.all.clear();
	}
}

export default emitter;
