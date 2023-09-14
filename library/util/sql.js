const _ = require('lodash');

class sql {

    static generateListUpsert(input) {

        let deletes = _.map(input.selected, (item) => {
            return `'${sql.varchar(item)}'`;
        }).join(',');

        let upserts = _.map(input.selected, (item) => {
            return `('${sql.varchar(input.id)}', '${sql.varchar(item)}')`;
        }).join(',');

        let query = `
            BEGIN;
            DELETE FROM ${input.table} 
            WHERE ${input.id_column}='${sql.varchar(input.id)}'`;
        if (input.selected.length > 0) {
            query += ` AND ${input.option_id_column} NOT IN (${deletes});`;
        } else {
            query += `;`;
        }
        if (input.selected.length > 0) {
            query += `INSERT INTO ${input.table} (${input.id_column}, ${input.option_id_column}) 
            VALUES ${upserts} ON CONFLICT ON CONSTRAINT ${input.table}_pkey DO NOTHING;`;
        }
        query += `COMMIT;`;
        return query;
    }

    static generateListUpsertWithKey(input) {

        let upserts = _.map(input.selected, (item) => {
            return `('${sql.varchar(input.id)}', '${sql.varchar(item)}', '${sql.varchar(input.key_value)}')`;
        }).join(',');

        let query = `
            BEGIN;
            DELETE FROM ${input.table} 
            WHERE ${input.id_column}='${sql.varchar(input.id)}' AND ${input.key}='${sql.varchar(input.key_value)}';`;
        if (input.selected.length > 0) {
            query += `INSERT INTO ${input.table} (${input.id_column}, ${input.option_id_column}, ${input.key}) 
            VALUES ${upserts} ON CONFLICT ON CONSTRAINT ${input.table}_pkey DO NOTHING;`;
        }
        query += `COMMIT;`;
        return query;
    }

    static generateUpsert(table, id, object) {
        var columns = [];
        var values = [];
        var sets = [];
        _.forOwn(object, (value, key) => {
            columns.push(key);
            values.push(`:${key}`);
            if (key !== id) {
                sets.push(`${key}=:${key}`);
            }
        });
        if (!_.has(object, 'updated_at')) {
            columns.push('updated_at');
            values.push(`jsNow()`);
            sets.push(`updated_at=jsNow()`);
        }

        var c = columns.join();
        var v = values.join();
        var s = sets.join();
        var sql = `INSERT INTO ${table} (${c}) VALUES (${v}) ON CONFLICT ON CONSTRAINT ${table}_pkey DO UPDATE SET ${s}`;
        return sql;
    }

    static num(value) {
        if (value === undefined || value === null) {
            return 'NULL';
        }
        var x = Number(value);
        if (isNaN(x)) {
            x = 0;
        }
        return x;
    }

    static varchar(value) {
        if (typeof value === 'string') {
            if (value === undefined || value === null) {
                return '';
            }
            var x1 = value.replace(/'/g, '\'\'');
            x1 = x1.replace(/--/g, '');
            x1 = x1.replace(/\/\*/g, '');
            x1 = x1.replace(/\*\//g, '');
            return x1;
        }
        if (typeof value === 'number') {
            if (value === undefined || value === null) {
                return '0';
            }
            var x2 = value.toString();
            return x2;
        }
        if (typeof value === 'boolean') {
            if (value === undefined || value === null) {
                return '0';
            }
            var x3 = value.toString();
            return x3;
        }
        return '';
    }

    static bool(value) {
        if (value === undefined || value === null) {
            return 'NULL';
        }
        return value ? 'TRUE' : 'FALSE';
    }
}

module.exports = sql;