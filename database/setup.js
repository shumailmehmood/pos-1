var path = require('path'),
    common = require('./common');

common.init();
common.createDatabase().then((exists) => {
    if(!exists){
        var location = path.resolve(__dirname, './current/schema');
        return common.execFiles(location);
    }
}).then(() => {
    console.log(`setup complete`);
    process.exit();
}).caught((err) => {
    console.error(err);
    process.exit(-1);
});