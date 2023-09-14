module.exports = class {
	// Returns a random integer between min (included) and max (excluded)
	// Using Math.round() will give you a non-uniform distribution!
	static getRandomInt(min, max) {
		if (min === null || min === undefined) {
			min = 0;
		}
		if (max === null || max === undefined) {
			max = 1000;
		}
		if (min === 0 && max === 0) {
			return 0;
		} else {
			return Math.floor(Math.random() * (max + 1 - min)) + min;
		}
	}

	static isEmail(email) {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	static isPhone(phone) {
		return /^\d{7,}$/.test(phone.replace(/[\s()+\-.]|ext/gi, ''));
	}

	static formatPhoneNumber(str) {
		var cleaned = ('' + str).replace(/\D/g, '');
		var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
		if (match) {
			var intlCode = match[1] ? '+1 ' : '';
			return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
		}
		return null;
	}

	static parsePhone(number) {
		var cleaned = ('' + number).replace(/\D/g, '');
		var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
		if (match) {
			var intlCode = match[1] ? '+1' : '+1';
			return [intlCode, match[2], match[3], match[4]].join('');
		}
		return null;
	}
};
