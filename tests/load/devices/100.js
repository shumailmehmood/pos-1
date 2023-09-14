const promise = require('bluebird');
puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://dev2.vital.chat/devices/activate');
    await promise.delay(10000)
    let content = await page.content();
    console.log(content);
    let code = await page.$('.code');
    console.log(code);
    await browser.close();
})();