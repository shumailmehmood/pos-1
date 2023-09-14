class compare {
    static value(value1, value2) {

        if ((value1 === undefined || value1 === null) && (value2 === undefined || value2 === null)) {
            return true;
        }

        if (typeof value1 === 'string') {
            if (typeof value2 === 'string') {
                return value1 === value2;
            } else if (typeof value2 === 'number') {
                return value1 === value2.toString();
            } else if (typeof value2 === 'boolean') {
                return value1 === value2.toString();
            }
        } else if (typeof value1 === 'number') {
            if (typeof value2 === 'string') {
                return value1 === parseInt(value2);
            } else if (typeof value2 === 'number') {
                return value1 === value2;
            } else if (typeof value2 === 'boolean') {
                return value2 === 1;
            }
        } else if (typeof value1 === 'boolean') {
            if (typeof value2 === 'string') {
                return value1 ? value2 === 'true' : value2 !== 'true';
            } else if (typeof value2 === 'number') {
                return value1 ? value2 === 1 : value2 !== 1;
            } else if (typeof value2 === 'boolean') {
                return value1 === value2;
            }
        }
        return false;
    }
}

module.exports = compare;