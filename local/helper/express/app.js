var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    http = require('http'),
    constants = require('constants'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    compression = require('compression'),
    cors = require('cors'),
    ejs = require('ejs'),
    notFoundHandler = require('./middleware/notfoundhandler'),
    errorHandler = require('./middleware/errorhandler'),
    routes = require('./routes');

module.exports = class {
    static start() {
        var app = express();
        app.use(compression());
        app.set('views', path.resolve(__dirname, '..'));
        app.engine('html', ejs.renderFile);
        app.use(cors());
        app.use(bodyParser.json({
            limit: '50mb'
        }));
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(cookieParser());
        routes.setup(app, express.Router());
        app.use(notFoundHandler());
        app.use(errorHandler());

        http.createServer({}, app).listen(7070);
        console.info('server started...');
    }
};