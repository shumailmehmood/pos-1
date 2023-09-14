var expect = require('chai').expect,
	lib = require('../../../library');

describe('Util/scrub', () => {
        it('scrub', () => {
            var result = lib.util.scrub.scrub('gulga');
            expect(result).to.equal(false);
            });
        });