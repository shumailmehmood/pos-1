var promise = require('bluebird'),
    fs = require('fs'),
    path = require('path'),
    os = require('os');

var _host = os.hostname();

module.exports = class {

    static home(req, res, next) {
        let ip = fs.readFileSync(path.join(__dirname, '../../ip'));
        res.render('apps/misc/views/home.ejs', { ip: ip });
    }

    static lbCheck(req, res, next) {
        res.render('apps/misc/views/lbcheck.ejs', {
            host: _host
        });
    }
};