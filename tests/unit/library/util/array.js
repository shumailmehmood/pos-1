var expect = require('chai').expect,
	lib = require('../../../library');

describe('Util/Array', () => {
	it('toSelectInList [1,2]', () => {
		var arr = [1, 2];
		var list = lib.util.array.toSelectInList(arr, "'");
		expect(list).to.equal("'1','2'");
	});
	it('toSelectInList []', () => {
		var arr = [];
		var list = lib.util.array.toSelectInList(arr, "'");
		expect(list).to.equal("'0'");
	});
	it('toSelectInList [0]', () => {
		var arr = [0];
		var list = lib.util.array.toSelectInList(arr, "'");
		expect(list).to.equal("'0'");
	});
	it('toSelectInList null', () => {
		var arr = null;
		var list = lib.util.array.toSelectInList(arr, "'");
		expect(list).to.equal("'0'");
		var arr1 = undefined;
		var list1 = lib.util.array.toSelectInList(arr1, "'");
		expect(list1).to.equal("'0'");
	});
});
