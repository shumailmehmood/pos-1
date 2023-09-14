var common = require('./common');

console.log('starting delete...');
common.init();
common.connectToMaster().then((dbsystem) => {
    return common.execute(dbsystem, `DROP DATABASE IF EXISTS ${global.config.db.database};`).then(() => {
        dbsystem.end();
    });
}).then(() => {
    console.log(`delete complete`);
    process.exit();
}).caught((err) => {
    console.error(err);
    process.exit(-1);
});