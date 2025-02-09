require('dotenv').config();
const AWS = require('aws-sdk');
const fs = require('fs');

const s3 = new AWS.S3();
const BUCKET_NAME = 'somi-test-bucket-1739077039007'; // Replace with your actual bucket name

// Upload file to a specific folder
async function uploadToFolder(fileName, folderName, content) {
    try {
        const params = {
            Bucket: BUCKET_NAME,
            Key: `${folderName}/${fileName}`,
            Body: content
        };

        const data = await s3.upload(params).promise();
        console.log(`File uploaded successfully to ${folderName}/. URL: ${data.Location}`);
    } catch (err) {
        console.error("Error uploading file:", err);
    }
}

// Create different types of files and upload them
async function uploadMultipleFiles() {
    try {
        // Upload HTML file
        await uploadToFolder('index.html', 'website', '<html><body><h1>Hello AWS!</h1></body></html>');

        // Upload JSON file
        const jsonContent = JSON.stringify({ message: "Hello from JSON" });
        await uploadToFolder('data.json', 'data', jsonContent);

        // Upload text file
        await uploadToFolder('readme.txt', 'documents', 'This is a readme file');

    } catch (err) {
        console.error("Error:", err);
    }
}

// List all files in the bucket with their folders
async function listAllFiles() {
    try {
        const params = {
            Bucket: BUCKET_NAME
        };
        const data = await s3.listObjects(params).promise();
        console.log("\nFiles in bucket:");
        data.Contents.forEach(file => {
            console.log(`- ${file.Key} (${file.Size} bytes)`);
        });
    } catch (err) {
        console.error("Error listing files:", err);
    }
}

// Run all operations
async function run() {
    console.log("Uploading multiple files to different folders...");
    await uploadMultipleFiles();
    console.log("\nListing all files in bucket:");
    await listAllFiles();
}

run();
