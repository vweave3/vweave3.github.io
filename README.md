# Narrative.Vince

// life on campus

var canvas;

//buttons
var startClick;
var bed;
var breakfast;
var reset;
var restart;

// texts
var paragraph1;
var paragraph2;
var title;

// images
var img1;
var img2;
var img3;
var img4;

var val = false;

var imgSlider;

// load pictures
function preload() { 
	img1 = loadImage('uic.jpg');
	img2 = loadImage('uicBed.png');
	img3 = loadImage('latePic.png');
	img4 = loadImage('breakfast.png')
}


// setup the initial background
function setup () {
startG();
}

function startG (){
	canvas = createCanvas(windowWidth, windowHeight);
	background(255);

	paragraph1 = createP("Welcome to UIC, are you ready to start your day?");
	paragraph1.position(600, 100);
	startClick = createButton("Click here to get start");
    startClick.mousePressed(roomScreen);   
    startClick.position(700,700);

    // set image
	imageMode(CENTER);
	image(img1, width/2, 400, 900, 500);

	title = createElement('h1', 'My UIC Experience')
	title.position(600,0);
	breakfast = createButton("Go to eat breakfast");
	breakfast.hide();

	bed = createButton("Go back to bed");
	bed.hide();

	paragraph2 = createP("You overslept and are late for class, click here to try again");
	paragraph2.hide();

	reset = createButton("Click Here");
	reset.hide();
	// slider
	imgSlider = createSlider(0,600,600);
	imgSlider.hide();
	imgSlider.position(700,700);
}


function roomScreen() {
	startClick.hide();
	paragraph1.hide();
	imageMode(CENTER);
	image(img2, width/2, 400, 900, 500);

	bed.show();
	bed.position(500,470);
	bed.mouseClicked(lateScreen);

	breakfast.position(700,610);
	breakfast.show();
	breakfast.mousePressed(foodScreen);

}

function lateScreen() {
	bed.hide();
	breakfast.hide();
	imageMode(CENTER);
	image(img3, width/2, 400, 900, 500);

	paragraph2.show();
	paragraph2.position(600,700);

	reset.show();
    reset.position(700,750);
    reset.mousePressed(remove);
}

 function foodScreen() {
 	val = true;
	imageMode(CENTER);
//	image(img4, width/2, 400, 900, 500);

	image(img2,0,0,1,1);
function draw () {
	food = createCanvas(600,600);
	if(val = true) {
		food = createCanvas(600,600);
	//	img4.show();
		background(255);
		imgSlider.show();

		image(img4, width/2, 400, imgSlider.value(), imgSlider.value());
		image(img2,0,0,1,1);
	}
}

}

// draw function is in the breakfast screen
// all create elements are in the setup
// try to get the late screen reset button to restart the app instead of clear it

