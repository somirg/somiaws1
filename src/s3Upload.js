require('dotenv').config();
const AWS = require('aws-sdk');
const fs = require('fs');

// Configure AWS
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1'
});

const s3 = new AWS.S3();
const BUCKET_NAME = 'somi-test-bucket-1739077039007'; // Replace with your actual bucket name

// Upload a file
async function uploadFile(fileName) {
    try {
        // Create a test file
        fs.writeFileSync(fileName, 'This is a test file content');

        // Upload to S3
        const fileContent = fs.readFileSync(fileName);
        const params = {
            Bucket: BUCKET_NAME,
            Key: fileName,
            Body: fileContent
        };

        const data = await s3.upload(params).promise();
        console.log(`File uploaded successfully. ${data.Location}`);
    } catch (err) {
        console.error("Error", err);
    }
}

// List all files in bucket
async function listFiles() {
    try {
        const params = {
            Bucket: BUCKET_NAME
        };
        const data = await s3.listObjects(params).promise();
        console.log("Files in bucket:", data.Contents);
    } catch (err) {
        console.error("Error", err);
    }
}

// Run operations
async function run() {
    console.log("Uploading file...");
    await uploadFile('test.txt');
    
    console.log("\nListing all files...");
    await listFiles();
}

run();
