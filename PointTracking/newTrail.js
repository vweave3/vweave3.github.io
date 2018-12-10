



var capture;
var tracker;
var w = 640, h = 480;
// var erase;
// var eraseBool;

function setup() {
  capture = createCapture(VIDEO);
  var canvas = createCanvas(w, h);
  background(0,180,255);
  capture.size(w, h);
  capture.hide(); 

  tracker = new clm.tracker();
  tracker.init();
  tracker.start(capture.elt);
  // background grass
  fill(0,255,0);
  ellipse(w/2, h*3, 3500,2500);
  noFill();
  house();
  fill(0);
  textSize(20);
  text("Draw a pool!", w/2-260, h/2-150);

  // erase = createButton("Erase");
  // erase.position(w/2-250, h/2-130);
  // erase.mousePressed(eraseBool);

//  eraseBool = false;
}
function house(){
  // red
  fill(255,30,0);
  rect(w/2-100, h/2-100, 200,200);
  // brown
  fill(150,100,10);
  // x1 y1, x2 y2, x3 y3
  triangle(w/2-140,h/2-100, w/2+140,h/2-100, w/2,h/2-250);
  // light brown
  fill(200,150,60);
  rect(w/2-20, h/2+20, 40, 80);

  fill(255);
  rect(w/2-80, h/2-40, 40, 40);
  rect(w/2+40, h/2-40, 40, 40);

  fill(0);
 // text("Draw a pool!", w/2-260, h/2-150);

  noFill();
}

// function eraseAll(){
//   eraseBool = true;
// }

// function reDraw(){
//   background(0,180,255);
//   fill(0,255,0);
//   ellipse(w/2, h*3, 3500,2500);
//   noFill();
//   house();
// }

function draw() {

  // if(eraseBool == true){
  //   reDraw();
  //   eraseBool = false;
  // }

  var bg = 0;
  //image(capture, 0, 0, w, h);
  var positions = tracker.getCurrentPosition();

   for (var i=0; i<positions.length; i++) {
    textSize(12);
    stroke(0);
    fill(0,150,255);

     //uncommenting out the ellipse below will draw all of the face points on your face
        //ellipse(positions[i][0], positions[i][1], 4, 4);
      
     //this ellipse draws on your nose/center of face automatically 
    ellipse(positions[62][0], positions[62][1], 40, 20);
	}
}