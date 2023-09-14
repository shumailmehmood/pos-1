const _ = require('lodash'),
    lib = require('../index');

module.exports = class crud {
    static save(entity) {
        var columns = [];
        var values = [];
        var updates = [];
        var keyfound = false;
        let now = new Date().getTime();

        // check if table has a serial column
        var serial = _.find(this.table.columns, { serial: true });

        // get keys list 
        var keys = _.map(_.filter(this.table.columns, { key: true }), 'name');

        // loop through provided object
        _.forOwn(entity, (value, key) => {
            var column = _.find(this.table.columns, { name: key });
            if (column) {
                if (column.key) {
                    keyfound = true;
                }
                columns.push(key);
                values.push(`:${key}`);
                updates.push(`${key}=:${key}`);
            }
        });
        if (!serial && !keyfound) {
            return Promise.reject(new Error('must specify key column to save'));
        }

        // auto update created_at
        var column_created_at = _.find(this.table.columns, { name: 'created_at' });
        if (column_created_at) {
            if (entity.created_at === undefined) {
                columns.push('created_at');
                values.push(`:created_at`);
                entity.created_at = now;
            }
        }

        // auto update updated_at
        var column_updated_at = _.find(this.table.columns, { name: 'updated_at' });
        if (column_updated_at) {
            if (entity.updated_at === undefined) {
                columns.push('updated_at');
                values.push(`:updated_at`);
                updates.push(`updated_at=:updated_at`);
                entity.updated_at = now;
            }
        }

        var sql = `
        INSERT INTO ${this.table.name} (${columns.join(',')}) 
        VALUES (${values.join(',')})
        ON CONFLICT (${keys.join(',')})
        DO UPDATE SET ${updates.join(',')};`;
        return lib.db.execute(sql, entity).then(() => {
            return;
        });
    }

    static fetch(entity, columns) {
        let cols = '*';
        if (columns) {
            cols = columns.join(',');
        }
        if (typeof entity === 'object') {
            var filters = [];
            _.forOwn(entity, (value, key) => {
                var column = _.find(this.table.columns, { name: key });
                if (column) {
                    filters.push(`${key}=:${key}`);
                }
            });
            var sql = `SELECT ${cols} FROM ${this.table.name} ${filters.length > 0 ? 'WHERE' : ''} ${filters.join(' AND ')} LIMIT 1;`;
            return lib.db.fetchOne(sql, entity).then((row) => {
                return row;
            });
        } else {
            var keycolumn = _.find(this.table.columns, { key: true });
            var sql2 = `SELECT ${cols} FROM ${this.table.name} WHERE ${keycolumn.name}=:value LIMIT 1;`;
            return lib.db.fetchOne(sql2, {
                value: entity
            }).then((row) => {
                return row;
            });
        }
    }

    static fetchAll(entity, columns, sort_columns) {
        let cols = '*';
        if (columns) {
            cols = columns.join(',');
        }

        let sort = [];
        if (sort_columns) {
            sort = sort_columns;
        }

        var filters = [];
        _.forOwn(entity, (value, key) => {
            var column = _.find(this.table.columns, { name: key });
            if (column) {
                filters.push(`${key}=:${key}`);
            }
        });
        var sql = `
        SELECT ${cols} 
        FROM ${this.table.name} 
        ${filters.length > 0 ? 'WHERE' : ''} ${filters.join(' AND ')}
        ${sort.length > 0 ? 'ORDER BY' : ''} ${sort.join(',')};`;
        return lib.db.fetchAll(sql, entity).then((entities) => {
            return entities;
        });
    }

    static delete(entity) {
        if (typeof entity === 'object') {
            var filters = [];
            _.forOwn(entity, (value, key) => {
                var column = _.find(this.table.columns, { name: key });
                if (column) {
                    filters.push(`${key}=:${key}`);
                }
            });
            var sql = `DELETE FROM ${this.table.name} WHERE ${filters.join(' AND ')};`;
            return lib.db.execute(sql, entity).then(() => {
                return;
            });
        } else {
            var keycolumn = _.find(this.table.columns, { key: true });
            var sql2 = `DELETE FROM ${this.table.name} WHERE ${keycolumn.name}=:value;`;
            return lib.db.execute(sql2, {
                value: entity
            }).then((row) => {
                return row;
            });
        }
    }

    static search(input) {

        let cols = '*';
        if (input.select_columns) {
            cols = input.select_columns.join(',');
        }

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
            if (input.search_columns) {
                searchcols = input.search_columns;
            } else {
                searchcols = _.filter(this.table.columns, { type: 'text' });
            }
            filters = _.map(searchcols, (col) => {
                return `${col} ILIKE '${lib.util.sql.varchar(input.search)}%'`;
            });
        }

        let allfilters;
        if (input.filters && input.filters.length > 0) {
            if (filters.length > 0) {
                allfilters = `${input.filters.join(' AND ')} AND (${filters.join(' OR ')})`;
            } else {
                allfilters = input.filters.join(' AND ');
            }
        } else {
            if (filters.length > 0) {
                allfilters = filters.join(' OR ');
            }
        }

        var sql = `
            SELECT ${cols} 
            FROM ${this.table.name} 
            ${allfilters ? 'WHERE' : ''} ${allfilters}  
            ${sort.length > 0 ? 'ORDER BY' : ''} ${sort.join(',')}  
            LIMIT ${limit} 
            OFFSET ${offset};`;
        return lib.db.fetchAll(sql).then((entities) => {
            return entities;
        });
    }
};