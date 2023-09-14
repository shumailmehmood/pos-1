var _ = require('lodash'),
	promise = require('bluebird'),
	pg = require('pg'),
	named = require('yesql').pg,
	util = require('./util');

var _pools = {};

pg.types.setTypeParser(pg.types.builtins.INT8, (value) => {
	return parseInt(value);
});

pg.types.setTypeParser(pg.types.builtins.FLOAT8, (value) => {
	return parseFloat(value);
});

pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value) => {
	return parseFloat(value);
});

class pool {
	constructor(database) {
		this.database = database;
		this.config = {
			host: database.host,
			port: database.port,
			database: database.database,
			user: database.user,
			password: database.password,
			max: 20,
			idleTimeoutMillis: 30000,
		};
		this.pool = new pg.Pool(this.config);
		this.pool.on('error', (err) => {
			console.error(err);
		});
	}

	getClient() {
		return new promise((resolve, reject) => {
			this.pool.connect((err, client, done) => {
				if (err) {
					done();
					reject(err);
				} else {
					resolve({
						client,
						done,
					});
				}
			});
		});
	}
}

module.exports = class db {
	static injectParams(params) {
		if (params) {
			if (params.now === null || params.now === undefined) {
				params.now = new Date().getTime();
			}
		} else {
			params = {
				now: new Date().getTime(),
			};
		}
		return params;
	}

	static getPool() {
		var pl = _pools.video;
		if (pl) {
			return promise.resolve(pl);
		} else {
			pl = new pool({
				host: global.config.db.host,
				port: global.config.db.port,
				database: global.config.db.database,
				user: global.config.db.user,
				password: global.config.db.password,
			});
			_pools.video = pl;
			return promise.resolve(pl);
		}
	}

	static execute(query, params) {
		params = db.injectParams(params);
		return this.getPool().then((p) => {
			return p.getClient().then((connection) => {
				return new promise((resolve, reject) => {
					connection.client.query(named(query)(params), (err) => {
						if (err) {
							connection.done();
							reject(err);
						} else {
							connection.done();
							resolve();
						}
					});
				});
			});
		});
	}

	static fetchOne(query, params) {
		params = db.injectParams(params);
		return this.getPool().then((p) => {
			return p.getClient().then((connection) => {
				return new promise((resolve, reject) => {
					connection.client.query(named(query)(params), (err, results) => {
						if (err) {
							connection.done();
							reject(err);
						} else {
							connection.done();
							if (results.rows.length > 0) {
								resolve(results.rows[0]);
							} else {
								resolve();
							}
						}
					});
				});
			});
		});
	}

	static fetchAll(query, params) {
		params = db.injectParams(params);
		return this.getPool().then((p) => {
			return p.getClient().then((connection) => {
				return new promise((resolve, reject) => {
					connection.client.query(named(query)(params), (err, results) => {
						if (err) {
							connection.done();
							reject(err);
						} else {
							connection.done();
							resolve(results.rows);
						}
					});
				});
			});
		});
	}

	static search(input) {
		let limit = 12;
		if (input.page_size) {
			limit = input.page_size;
		}

		let sort = [];
		if (input.sort_columns) {
			sort = input.sort_columns;
		}

		let offset = 0;
		if (input.page) {
			offset = (input.page - 1) * limit;
		}

		let filters = [];
		if (input.search) {
			let searchcols;
			searchcols = input.search_columns;
			filters = _.map(searchcols, (col) => {
				return `${col} ILIKE '${util.sql.varchar(input.search)}%'`;
			});
		}
		let staticFilter = '';
		if (input.filters && input.filters.length > 0) {
			staticFilter = input.filters.join(' AND ');
		}
		let filter = '';
		if (filters.length > 0 && staticFilter) {
			filter = `WHERE (${staticFilter}) AND (${filters.join(' OR ')}) `;
		} else if (filters.length > 0) {
			filter = `WHERE ${filters.join(' OR ')}`;
		} else if (staticFilter) {
			filter = `WHERE ${staticFilter}`;
		}

		var sql = `
            SELECT ${input.cols.join(',')} 
            FROM ${input.from} 
            ${filter}  
            ${sort.length > 0 ? 'ORDER BY' : ''} ${sort.join(',')}  
            LIMIT ${limit} 
            OFFSET ${offset};`;
		return db.fetchAll(sql).then((entities) => {
			return entities;
		});
	}
};
