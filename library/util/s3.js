var fs = require('fs'),
    uuid = require('uuid'),
    aws = require('aws-sdk');

aws.config.update({
    accessKeyId: global.config.aws.access_key,
    secretAccessKey: global.config.aws.secret_key,
    region: global.config.aws.region,
    sslEnabled: true
});
var _s3 = new aws.S3();
var _knownbuckets = {};

class s3 {
    // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getSignedUrl-property
    static getSignedUrlUpload(bucket, path, contentType) {

        return new Promise((resolve, reject) => {
            var s3_params = {
                Bucket: bucket,
                Key: path,
                ContentType: contentType
            };
            _s3.getSignedUrl('putObject', s3_params, (err, url) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(url);
                }
            });
        });
    }

    static getSignedUrlDownload(bucket, path) {

        return new Promise((resolve, reject) => {
            var s3_params = {
                Bucket: bucket,
                Key: path,
                Expires: 900
            };
            _s3.getSignedUrl('getObject', s3_params, (err, url) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(url);
                }
            });
        });
    }

    static ensureBucket(bucket) {

        if (_knownbuckets[bucket]) {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            var s3_params = {
                Bucket: bucket,
                ACL: 'authenticated-read'
            };
            _s3.createBucket(s3_params, (err, data) => {
                if (err) {
                    return reject(err);
                } else {
                    _knownbuckets[bucket] = data;
                    return resolve();
                }
            });
        });
    }

    static downloadFile(bucket, path) {

        return new Promise((resolve, reject) => {

            var tempname = uuid.v4();
            var filepath = `${global.config.tempdir}/${tempname}`;
            var file = fs.createWriteStream(filepath);
            file.on('finish', () => {
                return resolve(filepath);
            });
            file.on('error', (err) => {
                return reject(err);
            });
            var s3_params = {
                Bucket: bucket,
                Key: path
            };
            _s3.getObject(s3_params).createReadStream().pipe(file);
        });
    }

    static uploadFile(bucket, path, filePath) {

        return new Promise((resolve, reject) => {

            var body = fs.createReadStream(filePath);
            var s3_params = {
                Bucket: bucket,
                Key: path,
                Body: body
            };
            _s3.upload(s3_params).send((err, data) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(data);
                }
            });
        });
    }

    static uploadBase64(bucket, path, content) {

        return new Promise((resolve, reject) => {

            var body = Buffer.from(content.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            var s3_params = {
                Bucket: bucket,
                Key: path,
                Body: body,
                ContentEncoding: 'base64'
            };
            _s3.upload(s3_params).send((err, data) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(data);
                }
            });
        });
    }
}

module.exports = s3;
