var _ = require('lodash');

module.exports = class {
    static toSelectInList(arr, delimiter) {
        if (arr && arr.length > 0) {
            return _.map(arr, (item) => {
                return delimiter + item + delimiter;
            }).join(',');
        } else {
            return delimiter + '0' + delimiter;
        }
    }
};
