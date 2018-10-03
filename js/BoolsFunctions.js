// life on campus
var canvas;
//buttons
var startClick;
var bed;
var breakfast;
var reset;
var restart;
var goToClass;
// texts
var paragraph1;
var paragraph2;
var paragraph3;
var title;
// images
var img1;
var img2;
var img3;
var img4;
var img5;

var imgSlider;


//level change booleans
var roomBool;
var lateBool;
var foodBool;
var classBool;

// load pictures 
function preload(){  
 img1 = loadImage('./images/uic.jpg');
 img2 = loadImage('./images/uicBed.png');
 img3 = loadImage('./images/latePic.png');
 img4 = loadImage('./images/breakfast.png');
 img5 = loadImage('./images/classroom.jpg');
}


//you need to create your canvas here in setup, nowhere else.
//there should only be one canvas called in the sketch

function setup(){
	canvas = createCanvas(windowWidth, windowHeight);
 	canvas.position(0,0);
 	canvas.style('z-index', '-1'); 
  	imageMode(CENTER);
   	background(255);
 	startG();

}

//these are your functions to change the booleans and 
//change the visibility and text of DOM elements (paragraphs, buttons, sliders, etc)
//NOT animation elements

function startG(){
	background(255);

	paragraph1 = createP("Welcome to UIC, are you ready to start your day?");
 	paragraph1.position(600, 100);
 	startClick = createButton("Click here to get start");
 	startClick.position(700,700);
   	startClick.mousePressed(roomScreen);   
    
	image(img1, width/2, 400, 900, 500);
 	title = createElement('h1', 'My UIC Experience')
 	title.position(600,0);
 

} 

//I added this reset function
function resetG(){
	background(255);
	roomBool = false;
 	lateBool = false;
 	foodBool = false;
 	classBool = false;
 	paragraph2.hide();
 	reset.hide();
	paragraph1 = createP("Welcome to UIC, are you ready to start your day?");
 	paragraph1.position(600, 100);
 	startClick = createButton("Click here to get start");
 	startClick.position(700,700);
   	startClick.mousePressed(roomScreen);   
    
    // set image

 	image(img1, width/2, 400, 900, 500);
 	title = createElement('h1', 'My UIC Experience')
 	title.position(600,0);

}


function roomScreen() {
 	startClick.hide();
 	paragraph1.hide();
 
 	roomBool = true;
 	lateBool = false;
 	classBool = false;

 	bed = createButton("Go back to bed");
 	bed.position(500,470);
 	bed.mouseClicked(lateScreen);

 	breakfast = createButton("Go to eat breakfast");
 	breakfast.position(700,610);
 
 	breakfast.mousePressed(foodScreen);
}

function lateScreen() {
 	bed.hide();
 	breakfast.hide();


 	roomBool = false;
 	lateBool = true;
 	classBool = false;

 	paragraph2 = createP("You overslept and are late for class, click here to try again");
 	paragraph2.position(600,700);
  	reset = createButton("Click Here");
	
    reset.position(700,750);
    reset.mousePressed(resetG);
}


function foodScreen() {
 	bed.hide();
 	breakfast.hide();

 	roomBool = false; 
 	foodBool = true;
 	classBool = false;

	imgSlider = createSlider(1,600,600);
 	
 	imgSlider.position(700,700);
}

function classScreen() {
	imgSlider.value(600);
	imgSlider.hide();
	goToClass.hide();

	roomBool = false;
	foodBool = false;
	lateBool = false;
	classBool = true;

	paragraph3 = createP("Next time don't come to class on weekends.");
	paragraph3.position(700,100);

}


//you check your booleans in the draw function to see if the level has changed
//then trigger your animation functions. These booleans are changed in the 
//functions above. You should never call draw in any other function. 

function draw(){
	if (roomBool == true){
		roomScreenAnim(); 
	}else if(lateBool == true){
		lateScreenAnim();
	}else if(foodBool == true){
		foodScreenAnim();
	}else if(classBool == true){
		classScreenAnim();
	}
}


//these are your custom animation functions. This is where you reset 
//background, images, animations, mouse interactivity, etc.
// because draw runs 60 fps and will update.

function roomScreenAnim(){

	background(255);
	image(img2, width/2, 400, 900, 500);
}


function lateScreenAnim(){

	background(255);
	image(img3, width/2, 400, 900, 500);

}

function foodScreenAnim(){

	background(255);
	print(imgSlider.value());
	image(img4, width/2, 400, imgSlider.value(), imgSlider.value());
		
	if (imgSlider.value() <= 100) {
		goToClass = createButton("Go to Class");
		goToClass.position(700,700);
		goToClass.mousePressed(classScreen);
	}
}

function classScreenAnim(){
	background(255);
	image(img5, width/2, 400, 900, 500);

}











