const moment = require('moment');

module.exports = class credits {
	static getDayID(at) {
		let day = moment(at);
		let year = day.year();
		let month = day.month() + 1;
		let date = day.date();
		let day_id = Number(`${year}${month < 10 ? `0${month}` : month}${date < 10 ? `0${date}` : date}`);
		return day_id;
	}

	static getDateFromID(day_id) {
		let date = moment(day_id, 'YYYYMMDD').toDate();
		return date;
	}

	static getDateTimestamp(myDate){
		//myDate = myDate.split('-');
		let timestamp = new Date( myDate[2], myDate[1] - 1, myDate[0]);
		return timestamp;
	}
};
