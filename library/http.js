const axios = require('axios');

module.exports = (options) => {
	var opt = {
		url: options.uri || options.url,
		timeout: options.timeout,
		responseType: 'json'
	};

	if (options.headers) {
		opt.headers = options.headers;
	} else {
		opt.headers = {
			'content-type': 'application/json',
			'user-agent': ''
		};
	}

	if (options.method) {
		if (options.method === 'GET') {
			opt.method = 'GET';
		} else {
			opt.method = 'POST';
			opt.data = options.body || {};
		}
	} else {
		if (options.body) {
			opt.method = 'POST';
			opt.data = options.body || {};
		} else {
			opt.method = 'GET';
		}
	}

	return axios(opt).then((response) => {
		if (response.data) {
			return response.data;
		} else {
			return response;
		}
	});
};
