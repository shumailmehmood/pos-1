import Bowser from 'bowser';

const _browser = Bowser.getParser(window.navigator.userAgent);

class browser {
	static checkBrowser() {

		let isValid = _browser.satisfies({
			iOS: {
				chrome: '>=90',
				chromium: '>=90',
				edge: '>=90',
				firefox: '>=29',
				safari: '>=14',
			},
			chrome: '>=90',
			chromium: '>=90',
			edge: '>=90',
			firefox: '>=90',
			safari: '>=14',
		});

		return isValid;
	}

	static isDesktop() {
		var check = _browser.is('desktop');
		return check;
	}

	static isMobile() {
		var check = _browser.is('mobile');
		return check;
	}

	static isTablet() {
		var check = _browser.is('tablet');
		return check;
	}
}

export default browser;
