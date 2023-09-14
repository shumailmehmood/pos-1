var expect = require('chai').expect,
	chance = require('chance').Chance(),
	lib = require('../../../library');

describe('guid', () => {
	it('isGuid valid', () => {
		var value = chance.guid();
		var result = lib.util.guid.isGuid(value);
		expect(result).to.equal(true);
	});
	it('isGuid not valid', () => {
		var value = chance.word();
		var result = lib.util.guid.isGuid(value);
		expect(result).to.equal(false);
	});
	it('isGuid null', () => {
		var result = lib.util.guid.isGuid(null);
		expect(result).to.equal(false);
	});
	it('isGuid not string', () => {
		var result = lib.util.guid.isGuid({});
		expect(result).to.equal(false);
	});
});
