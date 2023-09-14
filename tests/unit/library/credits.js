var expect = require('chai').expect,
    lib = require('../../library');

describe('Credit', () => {
        it('purchase', () => {
            var result = lib.credits.purchase(250);
            expect(result).to.not.equal(true);
        });
});