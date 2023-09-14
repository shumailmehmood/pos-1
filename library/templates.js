const promise = require('bluebird'),
	ejs = require('ejs');

module.exports = class templates {
	static async renderFile(filePath, data) {
		let html = await promise.promisify(ejs.renderFile)(
			filePath,
			data,
			{}
		);
		return html;
	}
};
