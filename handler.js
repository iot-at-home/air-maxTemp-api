'use strict';
const AWS = require('aws-sdk');
const s3 = new AWS.S3({region: 'eu-central-1'});


const BUCKET = process.env.BUCKET;
const ROOMS = process.env.ROOMS;


module.exports.air = async (event, context) => {
  let room = ROOMS.split(",");
  let roomdata = [];

  let lowest = Number.POSITIVE_INFINITY;
  let highest = Number.NEGATIVE_INFINITY;
  let tmpMax,tmpMin,coldroom,warmroom,tsMin,tsMax;

  for (let i=0;i<room.length;i++){
    let data = await s3.getObject({
      Bucket: BUCKET,
      Key: room[i]+'.json'
    }).promise();
    roomdata.push(JSON.parse(data.Body.toString()));
  }
  console.log(roomdata);
  for (let i=roomdata.length-1; i>=0; i--) {
    tmpMax = roomdata[i].maxTemp;
    tmpMin = roomdata[i].minTemp;
    if (tmpMin < lowest){
      lowest = tmpMin;
      coldroom = roomdata[i].room;
      tsMin = roomdata[i].minTempTS;

    }
    if (tmpMax > highest){
      highest = tmpMax;
      warmroom = roomdata[i].room;
      tsMax = roomdata[i].maxTempTS;
    }
  }
  console.log(highest, lowest);
  let obj = {
    coldest: {
      temp: lowest,
      room: coldroom,
      date: tsMin
    },
    warmest: {
      temp: highest,
      room: warmroom,
      date: tsMax
    }
  };



  return {
    statusCode: 200,
    body: obj
    //body: JSON.parse(data.Body.toString())
  };
};

