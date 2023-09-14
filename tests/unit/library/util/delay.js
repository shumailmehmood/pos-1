var expect = require('chai').expect,
	chance = require('chance').Chance(),
	lib = require('../../../library');

describe('Util/Delay', async () => {
    it('', async () => {
        // complete
        let now = new Date().getTime();
        await lib.util.delay(100);
        let thn  = new Date().getTime();
        expect(thn-now).to.be.above(99);
    });
});