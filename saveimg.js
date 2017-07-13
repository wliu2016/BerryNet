/**
 * Created by wliu14 on 7/13/2017.
 */
// Listen to the serial port and save the img to local folder.
//
// subscribe
//     dt42/saveimg
// publish
//     dt42/log
//
// $ node saveimg.js
// $ mosquitto_pub -h localhost -t dt42/saveimg -m <payload data of img, data string>


'use strict';

const mqtt = require('mqtt');
const fs = require('fs');
const config = require('./config');

const broker = config.brokerHost;
const client = mqtt.connect(broker);
const topicEventSaveImage = config.topicEventSaveImage;
const topicActionLog = config.topicActionLog;

function log(m) {
  client.publish(topicActionLog, m);
  console.log(m);
}

client.on('connect', () => {
  client.subscribe(topicEventSaveImage);
  log(`saveimg client: connected to ${broker} successfully.`);
});

client.on('message', (t, m) => {
  log(`Save img client: on topic ${t}, received message ${m}.`);

  // Need to make sure how the message look like, so just ignore the head file for now.
  // Create buffer to decode the data.
   var buf =new buffer(m, 'base64').toString('binary');

  // Receive a image wireless, then save it to local folder.
  fs.writeFile('testimg.png', buf, 'binary', function(err) {
    if (err) {
      log('saveimge client: cannot save image.');
    } else {
      log('saveimge client: locally saving image.');

    }
  });
});