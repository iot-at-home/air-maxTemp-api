'use strict';
const AWS = require('aws-sdk');
const s3 = new AWS.S3({region: 'eu-central-1'});


const BUCKET = process.env.BUCKET;
module.exports.athome = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }, null, 2),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
