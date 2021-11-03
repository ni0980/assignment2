// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(width, height);
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
  });
  video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);
  drawKeypoints();
  drawSkeleton();
}
function drawKeypoints()  {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    for (let c = 0; c < pose.keypoints.length; c++) {
      let keypoint = pose.keypoints[c];
      if (keypoint.score > 0.3) {
        fill(255, 170, 100);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, random(100,50), random(100,50));
          
      }
    }
  }
    
}


function drawSkeleton() {

  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;

    for (let c = 0; c < skeleton.length; c++) {
      let partA = skeleton[c][0];
      let partB = skeleton[c][1];
      stroke(255, 170, 100);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
