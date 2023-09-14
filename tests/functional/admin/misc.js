const puppeteer = require('puppeteer');
const expect = require('chai').expect;

var _browser;

describe('Admin Misc', () => {
	before(async () => {
		_browser = await puppeteer.launch();
	});

	after(async () => {
		await _browser.close();
	});

	it('home', async () => {
		const page = await _browser.newPage();

		// go to home page
		await page.goto('https://secole.io/admin');
		await page.waitForSelector(`input[name="email"]`, { timeout: 5000 });
		let emailInput = await page.$$(`input[name="email"]`);

		expect(emailInput.length).to.toBe(1);
	});

	it('login', async () => {
		const page = await _browser.newPage();

		// login and check for mfa screen
		await page.goto('https://secole.io/admin');
		await page.waitForSelector(`input[name="email"]`, { timeout: 5000 });
		await page.type('input[name="email"]', 'test@vitalchat.com');
		await page.click('input[type="submit"]');
		await page.waitForSelector('#results');		
		const hasText = await page.evaluate(() => {
			return document.body.textContent.includes('Code');
		});

		expect(hasText).to.equal(true);
	});
});
