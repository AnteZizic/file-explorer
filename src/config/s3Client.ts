import { S3Client } from '@aws-sdk/client-s3';

const REGION = process.env.REACT_APP_AWS_REGION;
const CREDENTIAL = {
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID || "",
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY || "",
};

const client = new S3Client({
    region: REGION,
    credentials: CREDENTIAL
});

export { client };
