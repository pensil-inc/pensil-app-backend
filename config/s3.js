const aws = require('aws-sdk');

class S3Storage {
    constructor() {
        this.bucketName = process.env.AWS_BUCKET_NAME;
        // create instance
        this.s3 = new aws.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_KEY
        });

        this.storageDir = "storage/";
    }

    async upload(fileName= "", content= null) {
        const params = {
            Bucket: this.bucketName,
            Key: this.storageDir + fileName,
            Body: content
        };

        return new Promise((res, rej) => {
            // upload 
            this.s3.upload(params, (err, data) => {
                if(err) {
                    return rej(err);
                }
                return res(data);
            });
        });
    }

    // delete an object from bucket
    delete(path = "") {
        const params = {
            Bucket: this.bucketName,
            Key: path
        }

        return new Promise((res, rej) => {
            this.s3.deleteObject(params, function(err, data) {
                if(err) {
                    return rej(err);
                } else {
                    return res(data);
                }
            });
        });
    }

}

module.exports = S3Storage;