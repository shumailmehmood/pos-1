var expect = require('chai').expect,
	chance = require('chance').Chance(),
	lib = require('../../../library');

describe('Util/password', () => {
	it('secure/check', () => {
		var original = chance.word();
		return lib.util.password.secure(original).then(function (hash) {
			return lib.util.password.check(original, hash).then(function (isValid) {
				expect(isValid).to.equal(true);
				return lib.util.password.check(original + 'w', hash).then(function (isValid) {
					expect(isValid).to.equal(false);
				});
			});
		});
	});

	it('getLockTime now', () => {
		expect(lib.util.password.getLockTime(0, new Date().getTime())).to.equal(0);
		expect(lib.util.password.getLockTime(1, new Date().getTime())).to.equal(0);
		expect(lib.util.password.getLockTime(2, new Date().getTime())).to.equal(0);
		expect(lib.util.password.getLockTime(3, new Date().getTime())).to.equal(0);
		expect(lib.util.password.getLockTime(4, new Date().getTime())).to.equal(0);
		expect(lib.util.password.getLockTime(5, new Date().getTime())).to.equal(5);
		expect(lib.util.password.getLockTime(6, new Date().getTime())).to.equal(10);
		expect(lib.util.password.getLockTime(7, new Date().getTime())).to.equal(20);
		expect(lib.util.password.getLockTime(8, new Date().getTime())).to.equal(40);
		expect(lib.util.password.getLockTime(9, new Date().getTime())).to.equal(80);
	});

	it('getLockTime 5 mins later (10 min lockout)', () => {
		expect(lib.util.password.getLockTime(6, new Date().getTime() - 5 * 60 * 1000)).to.equal(5);
	});

	it('getLockTime 15 mins later (10 min lockout)', () => {
		expect(lib.util.password.getLockTime(6, new Date().getTime() - 15 * 60 * 1000)).to.equal(0);
	});
});
