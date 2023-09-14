var path = require('path'),
    common = require('./common');

console.log('starting update...');
common.init();
console.log('delete temp database...');
common.deleteTempDatabase().then(() => {
    console.log('create temp database...');
    return common.createTempDatabase().then(() => {
        var location = path.resolve(__dirname, './current/schema');
        return common.execFilesTemp(location).then(() => {
            console.log('running compare...');
            return common.compare().then((statements) => {
                console.log('statements', statements);
                return common.runDiffs(statements).then(() => {
                    return common.deleteTempDatabase().then(() => {
                        return;
                    });
                });
            });
        });
    });
}).then(() => {
    console.log(`update complete`);
    process.exit();
}).caught((err) => {
    console.error(err);
    process.exit(-1);
});