var expect = require('chai').expect,
    chance = require('chance').Chance(),
    lib = require('../../library');

describe('Cache', () => {
    it('get basic', async () => {
        var value = chance.string({ length: 5 });
        var returned = await lib.cache.get('key1', 1000, () => {
            return value;
        });
        expect(returned).to.equal(value);
    });
    it('get basic x 2', async () => {
        var returned1 = await lib.cache.get('key2', 1000, () => {
            return 'a';
        });
        var returned2 = await lib.cache.get('key2', 1000, () => {
            return 'b';
        });
        expect(returned1).to.equal('a');
        expect(returned2).to.equal('a');
    });
    it('get timeout', async () => {
        var returned1 = await lib.cache.get('key3', 100, () => {
            return 'a';
        });
        await lib.util.delay(50);
        var returned2 = await lib.cache.get('key3', 100, () => {
            return 'b';
        });
        await lib.util.delay(100);
        var returned3 = await lib.cache.get('key3', 100, () => {
            return 'c';
        });
        expect(returned1).to.equal('a');
        expect(returned2).to.equal('a');
        expect(returned3).to.equal('c');
    });
});
