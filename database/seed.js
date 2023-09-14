var path = require('path'),
    common = require('./common');

var _seed;
process.argv.forEach((val) => {
    if (val.indexOf('.sql') > -1) {
        _seed = val;
    }
});
if (!_seed) {
    console.log('did not specify seed file');
    process.exit();
}

console.log('starting seed...');
common.init();
var location = path.resolve(__dirname, './current/seeds', _seed);
common.execFile(location).then(() => {
    console.log(`seed complete`);
    process.exit();
}).caught((err) => {
    console.error(err);
    process.exit(-1);
});



