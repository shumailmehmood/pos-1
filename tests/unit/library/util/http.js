var expect = require('chai').expect,
	lib = require('../../../library');

describe('Util/http', () => {
	it('get', () => {
		return lib
			.http({
				method: 'GET',
				uri: 'https://vitalchat.s3.amazonaws.com/device/dev/latest.json',
			})
			.then((data) => {
				expect(data).to.exist;
				expect(data.branch).to.equal('dev');
			});
	});

	it('post', () => {
		return lib
			.http({
				method: 'POST',
				body: {
					test: 'test',
				},
				uri: 'http://echo.jsontest.com/key/value',
			})
			.then((data) => {
				expect(data).to.exist;
				expect(data.key).to.equal('value');
			});
	});
});
