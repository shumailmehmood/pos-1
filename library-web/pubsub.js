var _websocket;
var _reconnectTimoutHandle;
var _connectionIntervalHandle;
var _obj;
var _token;
var _host;
var _channels = [];

class pubsub {
	static init(obj, token, host) {
		_obj = obj;
		_token = token;
		_host = host;
		pubsub.connect();
	}

	static stop() {
		_obj = null;
		_token = null;
		pubsub.close();
	}

	static connect() {
		if (!_token) {
			return;
		}
		// close current socket if already open
		pubsub.close();

		// setup socket connection
		_websocket = new WebSocket(`wss://${_host}/pubsub?token=${_token}`);

		// Listen for connection opened
		_websocket.onopen = () => {
			if (_channels.length > 0) {
				_websocket.send(JSON.stringify({ channels: _channels }));
			}
		};

		// Listen for connection closed
		_websocket.onclose = () => {
			pubsub.reconnect();
		};

		// Listen for errors
		_websocket.onerror = (err) => {
			console.error(err);
			pubsub.reconnect();
		};

		// Listen for messages
		_websocket.onmessage = (d) => {
			// console.log(d.data);
			var data = JSON.parse(d.data);
			if (data.ping) {
				_websocket.send(JSON.stringify({ pong: 'pong' }));
			} else {
				// send message to object
				if (typeof _obj.onMessage === 'function') {
					_obj.onMessage(data);
				}
			}
		};

		// Check for connection regularly, just in case
		clearInterval(_connectionIntervalHandle);
		_connectionIntervalHandle = setInterval(() => {
			pubsub.reconnect();
		}, 1 * 60 * 60 * 1000);
	}

	static isConnected() {
		return _websocket && _websocket.readyState === 1;
	}

	static close() {
		if (pubsub.isConnected()) {
			_websocket.close();
			_websocket = null;
		}
	}

	static reconnect() {
		if (pubsub.isConnected() || _reconnectTimoutHandle) {
			return;
		}
		pubsub.close();
		_reconnectTimoutHandle = setTimeout(() => {
			pubsub.connect();
		}, 10 * 1000);
	}

	static subscribe(channels) {
		if (!_token) {
			return;
		}
		_channels = channels || [];
		if (pubsub.isConnected()) {
			_websocket.send(JSON.stringify({ channels: _channels }));
		}
	}
}

export default pubsub;
