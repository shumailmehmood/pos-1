const exceljs = require('exceljs'),
	moment = require('moment');

module.exports = class excel {
	static async generate(payload, fileName) {
		let excel = new exceljs.Workbook();
		excel.creator = 'VitalChat, Inc.';
		excel.lastModifiedBy = 'VitalChat, Inc.';
		excel.created = new Date();
		excel.modified = new Date();
		excel.views = [
			{
				firstSheet: 0,
				activeTab: 0,
				visibility: 'visible',
			},
		];

		payload.forEach((e) => {
			let sheet = excel.addWorksheet(`${e.sheet_name} (${e.data.length})`);
			sheet.columns = e.headers;
			sheet.addRows(e.data);
		});
		fileName = `${fileName}-${moment().format('MM-DD-YYYY')}.xlsx`;
		var filepath = `/tmp/${fileName}`;
		await excel.xlsx.writeFile(filepath);
		return { path: filepath, name: fileName };
	}
};
