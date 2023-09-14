const fs = require('fs'),
    p = require('path'),
    promise = require('bluebird'),
    shell = require('shelljs');

module.exports = class files {

    static fileExists(path) {
        return new Promise((resolve) => {
            fs.exists(path, (exists) => {
                resolve(exists);
            });
        });
    }

    static readFile(path) {
        return files.fileExists(path).then((exists) => {
            if (!exists) {
                return;
            }
            return new Promise((resolve, reject) => {
                fs.readFile(path, 'utf8', (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        });
    }

    static deleteFile(path) {
        return files.fileExists(path).then((exists) => {
            if (exists) {
                return new Promise((resolve, reject) => {
                    fs.unlink(path, (err) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                });
            }
        });
    }

    static writeFile(path, content) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, content, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static readFileBase64(path) {
        return files.fileExists(path).then((exists) => {
            if (!exists) {
                return;
            }
            return new Promise((resolve, reject) => {
                fs.readFile(path, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data.toString('base64'));
                    }
                });
            });
        });
    }

    static writeFileBase64(path, base64Data) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, base64Data, 'base64', (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static listDirectory(path) {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, files) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(files);
                }
            });
        });
    }

    static ls(path) {
        return files.listDirectory(path).then((paths) => {
            return promise.map(paths, (file) => {
                return new Promise((resolve, reject) => {
                    fs.stat(p.join(path, file), (err, stats) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({
                                path: p.join(path, file),
                                name: file,
                                isFile: stats.isFile(),
                                isDirectory: stats.isDirectory(),
                                size: stats.size,
                                ctimeMs: stats.ctimeMs
                            });
                        }
                    });
                });
            }).then((results) => {
                return results;
            });
        });
    }

    static lsRecursive(path, results, isRecursed) {
        if (!results) {
            results = [];
        }
        return files.ls(path).then((items) => {
            return promise.map(items, (item) => {
                results.push(item);
                if (item.isDirectory) {
                    return files.lsRecursive(item.path, results, true);
                }
            }).then(() => {
                if (!isRecursed) {
                    return results;
                }
            });
        });
    }

    static download(url, path, progress, interval = 10000) {
        return new Promise((resolve, reject) => {
            var progressInterval;
            var sameSizeCount = 0;
            var lastSize;
            if (progress) {
                progressInterval = setInterval(() => {
                    fs.stat(path, (err, stats) => {
                        if (!err) {
                            if (stats.size === lastSize) {
                                if (sameSizeCount < 3) {
                                    sameSizeCount++;
                                } else {
                                    // cancel download here
                                    shell.exec(`sudo pkill wget`, {
                                        silent: true,
                                        async: true
                                    }, () => {
                                        return;
                                    });
                                }
                            } else {
                                lastSize = stats.size;
                                sameSizeCount = 0;
                            }
                            progress(stats.size);
                        }
                    });

                }, interval);
            }
            shell.exec(`wget -O ${path} ${url}`, {
                silent: true,
                async: true
            }, (code, stdout) => {
                clearInterval(progressInterval);
                if (code === 0) {
                    resolve(stdout);
                } else {
                    reject(new Error(stdout));
                }
            });
        });
    }
};