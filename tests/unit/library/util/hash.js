var expect = require('chai').expect,
	lib = require('../../../library');

describe('Util/hash', () => {
	it('sha256', () => {
		var word = 'test';
		let hashed = lib.util.hash.sha256(word);
		expect(hashed).to.equal('9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08');
	});
});
