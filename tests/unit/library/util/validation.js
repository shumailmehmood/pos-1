var expect = require('chai').expect,
	lib = require('../../../library');

describe('validation', () => {
	it('pass', () => {
		var input = {
			user_id: 1,
		};
		lib.util.validation
			.validate(input, {
				user_id: {
					presence: true,
				},
			})
			.then(() => {
				expect(1).to.equal(1);
			})
			.catch(() => {
				expect(1).to.equal(2);
			});
	});

	it('fail', () => {
		var input = {
			user_id: null,
		};
		lib.util.validation
			.validate(input, {
				user_id: {
					presence: null,
				},
			})
			.then(() => {
				expect(1).to.equal(2);
			})
			.catch(() => {
				expect(1).to.equal(1);
			});
	});
});
