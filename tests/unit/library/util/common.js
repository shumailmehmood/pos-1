var expect = require('chai').expect,
	lib = require('../../../library');

describe('Util/Common', () => {
	it('getRandomInt', () => {
		expect(lib.util.common.getRandomInt()).to.be.within(0, 1000);
		expect(lib.util.common.getRandomInt(2, 20)).to.be.within(2, 20);
		expect(lib.util.common.getRandomInt(10000, 99999)).to.be.within(10000, 99999);
	});

	it('isEmail', () => {
		expect(lib.util.common.isEmail('test@test.com')).to.equal(true);
		expect(lib.util.common.isEmail('test@test.org')).to.equal(true);

		expect(lib.util.common.isEmail('test')).to.equal(false);
		expect(lib.util.common.isEmail('test@test')).to.equal(false);
		expect(lib.util.common.isEmail('test.com')).to.equal(false);
	});

	it('isPhone', () => {
		expect(lib.util.common.isPhone('+1 (123) 456-7890')).to.equal(true);
		expect(lib.util.common.isPhone('(123) 456-7890')).to.equal(true);
		expect(lib.util.common.isPhone('123 456-7890')).to.equal(true);
		expect(lib.util.common.isPhone('123 456 7890')).to.equal(true);
		expect(lib.util.common.isPhone('1234567890')).to.equal(true);
		expect(lib.util.common.isPhone('+1 123 456-7890')).to.equal(true);
		expect(lib.util.common.isPhone('+1 123 456 7890')).to.equal(true);
		expect(lib.util.common.isPhone('+1 1234567890')).to.equal(true);
		expect(lib.util.common.isPhone('+11234567890')).to.equal(true);
		
		expect(lib.util.common.isPhone('+')).to.equal(false);
		expect(lib.util.common.isPhone('++')).to.equal(false);
		expect(lib.util.common.isPhone('test')).to.equal(false);
		expect(lib.util.common.isPhone('')).to.equal(false);
		expect(lib.util.common.isPhone('test test test')).to.equal(false);
	});

	it('formatPhoneNumber', () => {
		expect(lib.util.common.formatPhoneNumber('+11234567890')).to.equal('+1 (123) 456-7890');
		expect(lib.util.common.formatPhoneNumber('1234567890')).to.equal('(123) 456-7890');
	});

	it('parsePhone', () => {
		expect(lib.util.common.parsePhone('+1 (123) 456-7890')).to.equal('+11234567890');
		expect(lib.util.common.parsePhone('(123) 456-7890')).to.equal('+11234567890');
	});
});
