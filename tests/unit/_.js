global.env = 'unit';

global.config = require('../../library/config').get();
global.config.twilio.accountSid = 'ACtest';
global.config.twilio.authToken = 'test';

var expect = require('chai').expect;

describe('Basic', () => {
	it('noop', () => {
		expect(true).to.equal(true);
	});
});
