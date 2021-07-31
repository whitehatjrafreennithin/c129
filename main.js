song="";

leftWristY =0;
leftWristX =0;
rightWristY =0;
rightWristX =0;
score_left=0;
score_right=0;
leftWristY1=0;
leftWristY2=0;
volume=0;
function preload(){
    song = loadSound("music.mp3");
}
function setup(){
canvas = createCanvas(500, 500);
canvas.center();

video = createCapture(VIDEO);
video.hide();

posenet = ml5.poseNet(video, modelLoaded);
posenet.on("pose", gotPoses);
    }

function modelLoaded(){
console.log("Posenet is loaded")
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results)
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        score_left=results[0].pose.keypoints[9].score;
        console.log(rightWristX, rightWristY, leftWristX, leftWristY, score_left);
    }
    
}


function draw(){
    image(video, 0, 0 , 500, 500);
    
    if (score_left>0.2) {
        circle(leftWristX,leftWristY, 30)
        leftWristY1 = Number(leftWristY);
        leftWristY2 = floor(leftWristY1);
        volume = leftWristY2/500;

        song.setVolume(volume);
    }
    
}

function play(){
    song.play();
    song.setVolume(0.5);
    song.rate(3);
}