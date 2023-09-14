const shell = require('shelljs');

module.exports = class system {

    static runShell(command) {
        return new Promise((resolve, reject) => {
            shell.exec(command, {
                silent: true
            }, (code, stdout, stderr) => {
                if (stderr) {
                    if (command.indexOf('wget') > -1 && stderr.indexOf('200 OK') > -1) { // hack for wget using shelljs
                        resolve(stderr);
                    } else {
                        console.error('failed', command);
                        reject(new Error(stderr));
                    }
                } else {
                    resolve(stdout);
                }
            });
        });
    }

    static runShellIgnoreError(command) {
        return new Promise((resolve) => {
            shell.exec(command, {
                silent: true
            }, (code, stdout, stderr) => {
                resolve(stderr || stdout);
            });
        });
    }
};