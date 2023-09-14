// TODO: lsRecursive, download

var expect = require('chai').expect,
	chance = require('chance').Chance(),
	lib = require('../../../library');

describe('files', () => {
	it('crud', () => {
		var path = '/tmp/test';
		var content = 'test';
		var content2 = 'test2';
		return lib.util.files.writeFile(path, content).then(() => {
			return lib.util.files.readFile(path).then((c) => {
				expect(c).to.equal(content);
				return lib.util.files.writeFile(path, content2).then(() => {
					return lib.util.files.readFile(path).then((c2) => {
						expect(c2).to.equal(content2);
						return lib.util.files.deleteFile(path).then(() => {
							return lib.util.files.fileExists(path).then((exists) => {
								expect(exists).to.equal(false);
							});
						});
					});
				});
			});
		});
	});

	it('crud Base64', () => {
		var path = '/tmp/test64';
		var content = Buffer.from('test').toString('base64');
		var content2 = Buffer.from('test2').toString('base64');
		return lib.util.files.writeFileBase64(path, content).then(() => {
			return lib.util.files.readFileBase64(path).then((c) => {
				expect(c).to.equal(content);
				return lib.util.files.writeFileBase64(path, content2).then(() => {
					return lib.util.files.readFileBase64(path).then((c2) => {
						expect(c2).to.equal(content2);
						return lib.util.files.deleteFile(path).then(() => {
							return lib.util.files.fileExists(path).then((exists) => {
								expect(exists).to.equal(false);
							});
						});
					});
				});
			});
		});
	});

	it('not exists', () => {
		var path = '/tmp/notexists';
		return lib.util.files.fileExists(path).then((exists) => {
			expect(exists).to.equal(false);
			return lib.util.files.readFile(path).then((c) => {
				expect(c).to.not.exist;
			});
		});
	});

	it('listDirectory', () => {
		var path = '/tmp/';
		return lib.util.files.listDirectory(path).then((results) => {
			expect(results).to.exist;
			expect(results).to.be.an('array');
		});
	});

	it('ls', () => {
		var path = '/tmp/';
		return lib.util.files.ls(path).then((results) => {
			expect(results).to.exist;
			expect(results).to.be.an('array');
		});
	});
});
