var expect = require('chai').expect,
	lib = require('../../../library');

describe('Util/token', () => {
	it('create/check', () => {
		var token = lib.util.token.create();
		var isValid = lib.util.token.check(token);
		expect(isValid).to.equal(true);
	});
});
