var canvas;

//screen text
var title;
var greeting;
var firstOption;
var secondOption;
var userName;

//inputs
var nameInput;

// animation variables
var sunX;
var sunY;

//boolean
var firstScreen;
var walkToSun;
var sunAnimate;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0,0);
	canvas.style("z-index", "-1");

}

function beginning() {
	background(0);
	//create paragraph
	greeting = createP("Please type your name and press enter");
	createElement("br");

	nameInput = createInput("type your name here");
nameInput.changed(startstory);
}

function startStory() {
	greeting.hide();
	nameInput.hide();
	userName = createElement('h1', nameInput.value());
	title = createElement('h1', "Get home before the sun goes down");
	firstOption = createP("Walk towards the sun");
	secondOption = createP("Go home");

	firstOption.mousePressed(toSun);
	secondOption.mousePressed(toHome);
}

function toSun() {
	walkToSun = true;
	userName.html(nameInput.value());

	title.html('You walk towards the sun, it gets bigger');
	firstOption.html('Walk closer');
	secondOption.html('Control the sun');
}

function toHome() {
	firstOption.hide();
	secondOption.hide();

	title.html('You have gone home, goodnight!');
}

function draw(){
	if(walkToSun == true) {
	toSunAnim();
	}
}

function toSunAnim(){
	background(0);
	sunX = windowWidth/2;
	sunY = windowHeight/2;
	sunX = sunX + random(-5,5);
	sunY = sunY + random(-3,3);
	ellipse(sunX, sunY, 300, 300);
}

function windowResized() {
	canvas = createCanvas(windowWidth, windowHeight);
}