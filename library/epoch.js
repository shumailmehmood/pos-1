// let moment = require('moment');
module.exports = class epoch {
    // convertIntoUnix
    static convertIntoUnix(year, month, day, hours, mins) {
        let allDate = year + "-" + month + "-" + day + " 0" + hours + ":" + mins
        return moment(allDate).unix();
    }

    // convertToUnix
    static convertToUnix(dateTime) {
        return moment(dateTime).unix();
    }

    //getFullDateFromUnix
    static getFullDateFromUnix(unixTime) {
        return moment.unix(unixTime).format("MM/DD/YYYY, h:mm:ss a");
    }

    //getYearFromUnix
    static getYearFromUnix(unixTime) {
        const unixEpochTimeMS = unixTime * 1000;
        const d = new Date(unixEpochTimeMS);
        return d.getFullYear();
    }

    //getMonthFromUnix
    static getMonthFromUnix(unixTime) {
        const unixEpochTimeMS = unixTime * 1000;
        const d = new Date(unixEpochTimeMS);
        return (d.getMonth() + 1);
    }

    //getDateFromUnix
    static getDateFromUnix(unixTime) {
        const unixEpochTimeMS = unixTime * 1000;
        const d = new Date(unixEpochTimeMS);
        return d.getDate();
    }

    //getHourFromUnix
    static getHourFromUnix(unixTime) {
        const unixEpochTimeMS = unixTime * 1000;
        const d = new Date(unixEpochTimeMS);
        return d.getHours();
    }

    //getMinFromUnix
    static getMinFromUnix(unixTime) {
        const unixEpochTimeMS = unixTime * 1000;
        const d = new Date(unixEpochTimeMS);
        return d.getMinutes();
    }
}