var expect = require('chai').expect,
    chance = require('chance').Chance(),
    lib = require('../../../library');

    describe('Util/Email', () => {
        it('send', () => {
            var result = lib.util.email.send('test@test.com');
            expect(result).to.not.equal(true);
            });
        it('sendWithAttachments', () => {
            var result = lib.util.email.sendWithAttachments('test@test.com','2323');
            expect(result).to.not.equal(true);
            });
        it('sanitize', () => {
            var result = lib.util.email.sanitize('w,1,2');
            expect(result).to.not.equal(true);
            });
    });