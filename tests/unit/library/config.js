var expect = require('chai').expect,
    chance = require('chance').Chance(),
    lib = require('../../library');

describe('Config', () => {
    // it('null', () => {
    //     expect(lib.util.config.val(null)).to.equal(false);	
    // });

    // it('undefined', () => {
    //     expect(lib.util.config.val(undefined)).to.equal(false);	
    // });
    // it('toBool', () => {
    //     expect(lib.util.config.toBool(undefined)).to.equal(false);	
	// });
    it('toBool undefined', () => {
        var result = lib.config.toBool(undefined);
        expect(result).to.equal(false);
        });

    it('toBool null', () => {
        var result = lib.config.toBool(null);
        expect(result).to.equal(false);
        });
    it('toArray undefined', () => {
        var result = lib.config.toArray(undefined);
        expect(result).to.not.equal(',');
        });
    it('toArray null', () => {
        var result = lib.config.toArray(null);
        expect(result).to.not.equal(',');
        });
        
    });
