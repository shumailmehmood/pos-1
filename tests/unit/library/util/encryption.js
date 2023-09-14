var expect = require('chai').expect,
chance = require('chance').Chance(),
	lib = require('../../../library');

describe.only('Util/Encryption', () => {
    // it('encrypt', async () => {
    //     var value = chance.string({ length: 5 });
    //     var returned = await lib.util.encryption.encrypt('giga');
    //     expect(returned).to.equal(value);
    // });
    // it('encrypt', () => {
    //     var result = lib.util.encryption.encrypt('gamma');
    //     expect(result).to.not.equal(true);
    // });

    it('encrypt/decrypt', () => {
        var original = chance.word();
		return lib.util.encryption.encrypt(original).then(function (createCipheriv) {
			return lib.util.encryption.decrypt(original, createCipheriv).then(function (isString) {
				expect(isString).to.equal(true);
				return lib.util.encryption.check(original + 'w', createCipheriv).then(function (isString) {
					expect(isString).to.equal(false);
				});
			});
		});
    })
       // not done 
    });