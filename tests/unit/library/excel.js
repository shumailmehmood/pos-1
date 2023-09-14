var expect = require('chai').expect,
	lib = require('../../library');

describe('Excel', () => {
	it('generate', () => {
		var result = lib.excel.generate('vital code', 'vital chat', 'comply', '2023:01:16');
		expect(result).to.not.equal(true);
	});

	// not done
});
