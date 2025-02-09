require('dotenv').config();
const AWS = require('aws-sdk');

// Configure AWS
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1'
});

const s3 = new AWS.S3();

// Create a unique bucket name
const BUCKET_NAME = 'somi-test-bucket-' + Date.now();

// Function to create bucket
async function createBucket() {
    try {
        console.log('Creating bucket:', BUCKET_NAME);
        const params = {
            Bucket: BUCKET_NAME
        };
        const data = await s3.createBucket(params).promise();
        console.log('Successfully created bucket:', BUCKET_NAME);
        return data;
    } catch (err) {
        console.error('Error creating bucket:', err);
    }
}

// Function to list buckets
async function listBuckets() {
    try {
        const data = await s3.listBuckets().promise();
        console.log('Your buckets:', data.Buckets);
    } catch (err) {
        console.error('Error listing buckets:', err);
    }
}

// Run operations
async function run() {
    console.log('Listing current buckets...');
    await listBuckets();
    console.log('\nCreating new bucket...');
    await createBucket();
    console.log('\nUpdated bucket list:');
    await listBuckets();
}

run();