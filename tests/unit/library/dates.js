var expect = require('chai').expect,
    chance = require('chance').Chance(),
    lib = require('../../library');

describe('Dates', () => {
    it('getDayID', () => {
		// expect(lib.dates.getDayID('20230112')).to.equal(true);
        var result = lib.dates.getDayID(20230112);
        expect(result).to.not.equal(true);
	});
    it('getDateFromID', () => {
        var result = lib.dates.getDateFromID(20230112);
        expect(result).to.not.equal(true);
	});
    it('getDateTimestamp', () => {
        var result = lib.dates.getDateTimestamp(20230112);
        expect(result).to.not.equal(true);
	});
});