var _ = require('lodash'),
	path = require('path'),
	promise = require('bluebird'),
	fs = require('fs'),
	aws = require('aws-sdk'),
	pg = require('pg'),
	pgInfo = require('pg-info'),
	pgDiffSync = require('@wmfs/pg-diff-sync');

var _allScripts;
var _tempdb;
var _s3;

module.exports = class common {
	static init() {
		require('dotenv').config({
			path: '/assets/.env',
		});

		const config = require('./library/config');
		global.config = config.get();

		_tempdb = `${global.config.db.database}_temp`;

		aws.config.update({
			accessKeyId: global.config.backup.access_key,
			secretAccessKey: global.config.backup.secret_key,
			region: global.config.backup.region,
			sslEnabled: true,
		});
		_s3 = new aws.S3();
	}

	static runDiffs(statements) {
		return common.connectToDB().then((db) => {
			return promise
				.mapSeries(statements, (statement) => {
					console.log('running', statement);
					return common.execute(db, statement);
				})
				.then(() => {
					db.end();
				});
		});
	}

	static compare() {
		var conn = `postgres://${global.config.db.user}:${global.config.db.password}@${global.config.db.host}:${global.config.db.port}/${global.config.db.database}`;
		var conntemp = `postgres://${global.config.db.user}:${global.config.db.password}@${global.config.db.host}:${global.config.db.port}/${_tempdb}`;
		const client = new pg.Client(conn);
		const clienttemp = new pg.Client(conntemp);
		client.connect();
		clienttemp.connect();
		console.log('constructing current db info...');
		return pgInfo({
			client: client,
		}).then((info) => {
			console.log('constructing temp db info...');
			return pgInfo({
				client: clienttemp,
			}).then((infoTemp) => {
				console.log('generating diff...');
				var statements = pgDiffSync(info, infoTemp);
				let changes = _.map(statements, (statement) => { // final cleanup for cockroachdb
					if (statement.indexOf('CREATE INDEX') > -1 && statement.indexOf(' USING prefix') > -1) {
						statement = statement.replace(' USING prefix', '');
					}
					if (statement.indexOf(' public.') > -1) {
						statement = statement.replace(' public.', ' ');
					}
					return statement;
				});
				client.end();
				clienttemp.end();
				return changes;
			});
		});
	}

	static deleteTempDatabase() {
		return common.connectToMaster().then((dbsystem) => {
			return common.execute(dbsystem, `DROP DATABASE IF EXISTS ${_tempdb};`).then(() => {
				dbsystem.end();
			});
		});
	}

	static createDatabase() {
		return common.connectToMaster().then((dbsystem) => {
			return common.fetchAll(dbsystem, 'SELECT datname FROM pg_catalog.pg_database').then((databases) => {
				var exists = _.find(databases, {
					datname: global.config.db.database,
				});
				if (exists) {
					return true;
				} else {
					// console.log(`setting up ${global.config.db.database} database...`);
					return common.execute(dbsystem, `CREATE DATABASE ${global.config.db.database}`).then(() => {
						// console.log(`${global.config.db.database} database successfully setup`);
						return false;
					});
				}
			});
		});
	}

	static createTempDatabase() {
		return common.connectToMaster().then((dbsystem) => {
			return common.fetchAll(dbsystem, 'SELECT datname FROM pg_catalog.pg_database').then((databases) => {
				var exists = _.find(databases, {
					datname: _tempdb,
				});
				if (!exists) {
					// console.log(`setting up ${_tempdb} database...`);
					return common.execute(dbsystem, `CREATE DATABASE ${_tempdb}`).then(() => {
						// console.log(`${_tempdb} database successfully setup`);
					});
				}
			});
		});
	}

	static execFiles(location) {
		return common.getFiles(location).then((files) => {
			_allScripts = _.sortBy(files, (file) => {
				return path.basename(file);
			});
			return common.connectToDB().then((db) => {
				return common.run(_allScripts.shift(), db).then(() => {
					db.end();
				});
			});
		});
	}

	static execFile(file) {
		return common.connectToDB().then((db) => {
			if (!file) {
				return promise.resolve();
			}
			var sql = fs.readFileSync(file, 'utf8');
			return common.execute(db, sql).then(() => {
				db.end();
			});
		});
	}

	static execFilesTemp(location) {
		return common.getFiles(location).then((files) => {
			_allScripts = _.sortBy(files, (file) => {
				return path.basename(file);
			});
			return common.connectToTempDB().then((db) => {
				return common.run(_allScripts.shift(), db).then(() => {
					db.end();
				});
			});
		});
	}

	static fetch(sql) {
		return common.connectToDB().then((db) => {
			return common.fetchAll(db, sql).then((rows) => {
				db.end();
				return rows;
			});
		});
	}

	static fetchOne(sql) {
		return common.connectToDB().then((db) => {
			return common.fetchAll(db, sql).then((rows) => {
				db.end();
				if (rows.length === 0) {
					return null;
				} else {
					return rows[0];
				}
			});
		});
	}

	static exec(sql) {
		return common.connectToDB().then((db) => {
			return common.execute(db, sql).then(() => {
				db.end();
			});
		});
	}

	static run(file, db) {
		if (!file) {
			return promise.resolve();
		}
		// console.log(`running file ${file}...`);
		var sql = fs.readFileSync(file, 'utf8');
		return common.execute(db, sql).then(() => {
			// console.log(`ran file ${file}...`);
			return common.run(_allScripts.shift(), db);
		});
	}

	static connectToMaster() {
		return common.connect({
			host: global.config.db.host,
			port: global.config.db.port,
			database: 'postgres',
			user: global.config.db.user,
			password: global.config.db.password,
		});
	}

	static connectToDB() {
		return common.connect({
			host: global.config.db.host,
			port: global.config.db.port,
			database: global.config.db.database,
			user: global.config.db.user,
			password: global.config.db.password,
		});
	}

	static connectToTempDB() {
		return common.connect({
			host: global.config.db.host,
			port: global.config.db.port,
			database: _tempdb,
			user: global.config.db.user,
			password: global.config.db.password,
		});
	}

	static connect(config) {
		return new promise((resolve, reject) => {
			var db = new pg.Client(config);
			db.connect((err) => {
				if (err) {
					reject(err);
				} else {
					resolve(db);
				}
			});
		});
	}

	static execute(db, query, params) {
		return new promise((resolve, reject) => {
			db.query(query, params, (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}

	static fetchAll(db, query, params) {
		return new promise((resolve, reject) => {
			db.query(query, params, (err, results) => {
				if (err) {
					reject(err);
				} else {
					resolve(results.rows);
				}
			});
		});
	}

	static getFiles(location) {
		// get files list
		// console.log(`collecting sql files ...`);
		var _files = [];
		var walkSync = function (dir, filelist) {
			if (!dir) {
				return;
			}
			if (!fs.existsSync(dir)) {
				return;
			}

			var files = fs.readdirSync(dir);
			files = _.sortBy(files);
			filelist = filelist || [];
			files.forEach(function (file) {
				if (fs.statSync(path.join(dir, file)).isDirectory()) {
					filelist = walkSync(path.join(dir, file), filelist);
				} else {
					if (path.extname(file) === '.sql') {
						_files.push(path.join(dir, file));
					}
				}
			});
		};
		walkSync(location);
		return promise.resolve(_files);
	}

	static uploadFile(bucket, path, filePath) {
		return new Promise((resolve, reject) => {
			var body = fs.createReadStream(filePath);
			var s3_params = {
				Bucket: bucket,
				Key: path,
				Body: body,
			};
			_s3.upload(s3_params).send((err, data) => {
				if (err) {
					return reject(err);
				} else {
					return resolve(data);
				}
			});
		});
	}

	static downloadFile(bucket, path, filePath) {
		return new Promise((resolve, reject) => {
			var s3_params = {
				Bucket: bucket,
				Key: path,
			};
			_s3.getObject(s3_params).send((err, data) => {
				if (err && err.code === 'NotFound') {
					return resolve(false);
				} else if (err) {
					return resolve(false);
				} else {
					fs.writeFileSync(filePath, data.Body.toString('utf-8'));
					return resolve(true);
				}
			});
		});
	}
};
