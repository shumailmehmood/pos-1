var _ = require('lodash'),
    fs = require('fs'),
    path = require('path'),
    common = require('./common');

console.log('starting orm...');
common.init();
common
    .fetch(`select * from information_schema.tables where table_schema = 'public'`)
    .then((tables) => {
        return common.fetch(`select * from information_schema.columns where table_schema = 'public'`).then((columns) => {
            return common.fetch(`select * from information_schema.key_column_usage where table_schema = 'public'`).then((keys) => {
                var result = `
const crud = require('./crud');
module.exports = class {
    static setup(orm) {`;
                _.each(tables, (table) => {
                    var cols = _.filter(columns, { table_name: table.table_name });
                    var colkeys = _.filter(keys, { table_name: table.table_name });
                    var colsResult = JSON.stringify(
                        _.map(cols, (col) => {
                            var key = _.find(colkeys, { column_name: col.column_name, constraint_name: `${table.table_name}_pkey` });
                            var isKey = key ? true : false;
                            var isSerial = col.column_default && col.column_default.indexOf('_seq') > -1;
                            return {
                                key: isKey,
                                serial: isSerial,
                                type: col.data_type,
                                name: col.column_name,
                            };
                        })
                    );
                    result += `
        orm.${table.table_name} = class ${table.table_name} extends crud {
            static table = {
                name: '${table.table_name}',
                columns: ${colsResult}
            };
        };
        `;
                });
                result += `
    }
};`;
                fs.writeFileSync(path.join(__dirname, 'tables.js'), result);
            });
        });
    })
    .then(() => {
        console.log(`orm export complete`);
        process.exit();
    })
    .caught((err) => {
        console.error(err);
        process.exit(-1);
    });