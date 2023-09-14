const app = require('./express/app.js');

app.start();

// cleanup events
process.on('SIGTERM', function() { // ctrl c
    process.exit();
});

process.on('SIGINT', function() { // ctrl z
    process.exit();
});

process.on('uncaughtException', function(err) {
    console.error(err);
});