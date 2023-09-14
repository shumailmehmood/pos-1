var expect = require('chai').expect,
	chance = require('chance').Chance(),
	lib = require('../../../library');

describe('Util/String', () => {
	it('generate', () => {
		var length = chance.integer({
			min: 1,
			max: 12,
		});
		var str = lib.util.string.generate(length);
		expect(str).to.have.length(length);
	});

	it('generateNumeric', () => {
		var length = chance.integer({
			min: 1,
			max: 12,
		});
		var str = lib.util.string.generateNumeric(length);
		expect(str).to.have.length(length);
	});

	it('generateUserName', () => {
		var str = lib.util.string.generateUserName();
		expect(str).to.exist;
	});

	it('trimAllProperties', () => {
		var obj = {
			one: 'one ',
			two: ' two',
			three: ' three ',
			four: ' four four',
			five: 'five',
			six: undefined,
			seven: null,
		};
		lib.util.string.trimAllProperties(obj);
		expect(obj.one).to.equal('one');
		expect(obj.two).to.equal('two');
		expect(obj.three).to.equal('three');
		expect(obj.four).to.equal('four four');
		expect(obj.five).to.equal('five');
		expect(obj.six).to.equal(undefined);
		expect(obj.seven).to.equal(null);
	});

	it('getSubDomain', () => {
		expect(lib.util.string.getSubDomain(undefined)).to.equal('');
		expect(lib.util.string.getSubDomain(null)).to.equal('');
		expect(lib.util.string.getSubDomain('')).to.equal('');
		expect(lib.util.string.getSubDomain('a')).to.equal('');
		expect(lib.util.string.getSubDomain('a.b')).to.equal('');
		expect(lib.util.string.getSubDomain('a.b.c')).to.equal('a');
		expect(lib.util.string.getSubDomain('a.b.c.d')).to.equal('a.b');
		expect(lib.util.string.getSubDomain('a.b.c.d.e')).to.equal('a.b.c');
	});

	it('getBaseDomain', () => {
		expect(lib.util.string.getBaseDomain(undefined)).to.equal('');
		expect(lib.util.string.getBaseDomain(null)).to.equal('');
		expect(lib.util.string.getBaseDomain('')).to.equal('');
		expect(lib.util.string.getBaseDomain('a')).to.equal('a');
		expect(lib.util.string.getBaseDomain('a.b')).to.equal('a.b');
		expect(lib.util.string.getBaseDomain('a.b.c')).to.equal('b.c');
		expect(lib.util.string.getBaseDomain('a.b.c.d')).to.equal('c.d');
		expect(lib.util.string.getBaseDomain('a.b.c.d.e')).to.equal('d.e');
	});

	it('getNameFromEmail', () => {
		expect(lib.util.string.getNameFromEmail(undefined)).to.equal('');
		expect(lib.util.string.getNameFromEmail(null)).to.equal('');
		expect(lib.util.string.getNameFromEmail('')).to.equal('');
		expect(lib.util.string.getNameFromEmail('a')).to.equal('a');
		expect(lib.util.string.getNameFromEmail('a@b')).to.equal('a');
		expect(lib.util.string.getNameFromEmail('a@b.c')).to.equal('a');
		expect(lib.util.string.getNameFromEmail('a.b@@.c.d')).to.equal('a.b');
		expect(lib.util.string.getNameFromEmail('ab@.c.d.e')).to.equal('ab');
	});

	it('toList', () => {
		var test = `a:b ,c:d, r:g
        d:g, o:d`;
		var arr = lib.util.string.toList(test);
		expect(arr[0]).to.equal('a:b');
		expect(arr[1]).to.equal('c:d');
		expect(arr[2]).to.equal('r:g');
		expect(arr[3]).to.equal('d:g');
		expect(arr[4]).to.equal('o:d');
	});
});
