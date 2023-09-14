const puppeteer = require('puppeteer');
const expect = require('chai').expect;

var _browser;

describe('Basic', () => {
	before(async () => {
		_browser = await puppeteer.launch();
	});

	after(async () => {
		await _browser.close();
	});

	it('noop', async () => {	
		const page = await _browser.newPage();
		expect(true).to.equal(true);
	});
});
