var expect = require('chai').expect,
    chance = require('chance').Chance(),
    lib = require('../../library');

    describe('Creditcard', () => {
        it('charge', () => {
            var result = lib.creditcard.charge(250);
            expect(result).to.not.equal(true);
        });
        it('createCardToken', () => {
            var result = lib.creditcard.createCardToken(250);
            expect(result).to.not.equal(true);
        });
        it('ensureStripe', () => {
            var result = lib.creditcard.ensureStripe(1212123131);
            expect(result).to.not.equal(true);
        });
        it('hasExpired', () => {
            var result = lib.creditcard.hasExpired(2023011622445);
            expect(result).to.not.equal(true);
        });
    });