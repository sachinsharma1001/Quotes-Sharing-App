import 'source-map-support/register';
import * as AWS from 'aws-sdk';
const AWSXRay = require('aws-xray-sdk');
const XAWS = AWSXRay.captureAWS(AWS);

export class QuotesAws {

    constructor(
        private readonly s3 = new XAWS.S3({ signatureVersion: 'v4' }),
        private readonly bucketName = process.env.IMAGES_S3_BUCKET
    ) {}

    async uploadGeneratedUrl(quotesId: string): Promise<string> {
        const uploadUrl = this.s3.getSignedUrl('putObject', {
            Bucket: this.bucketName,
            Key: quotesId,
            Expires: 300
        });

        return uploadUrl;
    }

    async attachmentUrl(quotesId: string): Promise<string> {
        const attachmentUrl = `https://${this.bucketName}.s3.amazonaws.com/${quotesId}`;
        return attachmentUrl;
    }
}