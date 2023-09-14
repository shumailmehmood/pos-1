require('dotenv').config({
	path: '/assets/.env',
});

const config = require('./library/config');
global.config = config.get();

// var _ = require('lodash'),
// 	moment = require('moment'),
// 	lib = require('./library');

class example {
	static async process() {
		console.log('running example...');
	}
}

(async () => {
	console.log('starting...');
	await example.process();
	console.log('done');
})();
