var expect = require('chai').expect,
	chance = require('chance').Chance(),
	lib = require('../../../library');

describe('Util/Compare', () => {
	it('null-undefined', () => {
		expect(lib.util.compare.value(null, null)).to.equal(true);
		expect(lib.util.compare.value(undefined, undefined)).to.equal(true);
		expect(lib.util.compare.value(undefined, null)).to.equal(true);
		expect(lib.util.compare.value(null, undefined)).to.equal(true);
	});

	it('string', () => {
		expect(lib.util.compare.value('test', 'test')).to.equal(true);
		expect(lib.util.compare.value('1', 1)).to.equal(true);
		expect(lib.util.compare.value('true', true)).to.equal(true);

		expect(lib.util.compare.value('1', 2)).to.equal(false);
		expect(lib.util.compare.value('true', false)).to.equal(false);
		expect(lib.util.compare.value('test', 'test2')).to.equal(false);
		expect(lib.util.compare.value('test', null)).to.equal(false);
		expect(lib.util.compare.value('test', undefined)).to.equal(false);
	});

	it('number', () => {
		expect(lib.util.compare.value(2, '2')).to.equal(true);
		expect(lib.util.compare.value(2, 2)).to.equal(true);

		expect(lib.util.compare.value(2, true)).to.equal(false);
		expect(lib.util.compare.value(2, false)).to.equal(false);
		expect(lib.util.compare.value(2, 'test2')).to.equal(false);
		expect(lib.util.compare.value(2, null)).to.equal(false);
		expect(lib.util.compare.value(2, undefined)).to.equal(false);
	});

	it('boolean', () => {
		expect(lib.util.compare.value(true, true)).to.equal(true);
		expect(lib.util.compare.value(true, 'true')).to.equal(true);
		expect(lib.util.compare.value(true, 1)).to.equal(true);
		expect(lib.util.compare.value(false, false)).to.equal(true);
		expect(lib.util.compare.value(false, 'false')).to.equal(true);
		expect(lib.util.compare.value(false, 0)).to.equal(true);

		expect(lib.util.compare.value(true, false)).to.equal(false);
		expect(lib.util.compare.value(true, 2)).to.equal(false);
		expect(lib.util.compare.value(true, 'test')).to.equal(false);
		expect(lib.util.compare.value(true, null)).to.equal(false);
		expect(lib.util.compare.value(true, undefined)).to.equal(false);
	});
});
