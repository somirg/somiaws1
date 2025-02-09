equire('dotenv').config();
const AWS = require('aws-sdk');

// Configure AWS
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1'  // or your preferred region
});

// Create S3 service object
const s3 = new AWS.S3();

// List all buckets
s3.listBuckets((err, data) => {
    if (err) {
        console.log("Error:", err);
    } else {
        console.log("Success! Here are your buckets:", data.Buckets);
    }
});