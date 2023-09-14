var path = require('path'),
    common = require('./common');

console.log('starting data...');
common.init();
var location = path.resolve(__dirname, './current/data');
common.execFiles(location).then(() => {
    console.log(`data complete`);
    process.exit();
}).caught((err) => {
    console.error(err);
    process.exit(-1);
});