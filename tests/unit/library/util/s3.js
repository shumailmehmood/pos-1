var expect = require('chai').expect,
	chance = require('chance').Chance(),
	lib = require('../../../library');

describe.only('Util/s3', () => {
        it('getSignedUrlUpload', () => {
            var result = lib.util.s3.getSignedUrlUpload('gulga');
            expect(result).to.equal(err);
            });
        // it('getSignedUrlDownload', () => {
        //     var result = lib.util.s3.getSignedUrlDownload('900');
        //     expect(result).to.not.equal(err);
        //     });
        // it('ensureBucket', () => {
        //     var result = lib.util.s3.ensureBucket('sfsdfs');
        //     expect(result).to.not.equal(err);
        //     });
        // it('downloadFile', () => {
        //     var result = lib.util.s3.downloadFile('file');
        //     expect(result).to.not.equal(err);
        //     });
        // it('uploadFile', () => {
        //     var result = lib.util.s3.uploadFile('mac');
        //     expect(result).to.not.equal(err);
        //     });
        // it('uploadBase64', () => {
        //     var result = lib.util.s3.uploadBase64('fdd11');
        //     expect(result).to.not.equal(err);
        //     });
    });