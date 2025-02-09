// config.js
const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1' // or your preferred region
});

module.exports = AWS;