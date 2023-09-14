const path = require('path');
require('dotenv').config({
	path: path.resolve(__dirname, '../../operations/local/assets/.env'),
});
process.env.GLOBAL_DB_HOST = 'database.complydev.com';
global.config = require('../library/config.js').get();
