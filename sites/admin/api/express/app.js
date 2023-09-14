var express = require('express'),
	path = require('path'),
	http = require('http'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	compression = require('compression'),
	cors = require('cors'),
	helmet = require('helmet'),
	ejs = require('ejs'),
	rateLimit = require('express-rate-limit'),
	notFoundHandler = require('./middleware/notfoundhandler'),
	errorHandler = require('./middleware/errorhandler'),
	routes = require('./routes');

module.exports = class {
	static start() {
		var app = express();
		app.use(rateLimit({
			windowMs: 1 * 60 * 1000,
			max: 1000,
			standardHeaders: true,
			legacyHeaders: false
		}));
		app.use(helmet());
		app.disable('x-powered-by');
		app.use(compression());
		app.set('views', path.resolve(__dirname, '..'));
		app.engine('html', ejs.renderFile);
		app.use(cors());
		app.use(
			bodyParser.json({
				limit: '50mb'
			})
		);
		app.use(
			bodyParser.urlencoded({
				extended: true
			})
		);
		app.use(cookieParser());
		routes.setup(app, express.Router());
		app.use(notFoundHandler());
		app.use(errorHandler());

		http.createServer({}, app).listen(8092);
		console.info('server started...');
	}
};
