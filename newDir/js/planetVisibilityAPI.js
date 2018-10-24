// image goal:
// get planets to adjust in size
// get falling dots to represent gravity passing through planet ellipse
// use visibility in #'s to be translated into words
// Ex: 
// compare temperature to make star images of data
// give stars random x and y coordinates
// higher temp means more red the star is and cooler temp means more blue
// 75 and up is red
// 30 and below is blue


var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=Chicago&units=imperial&appid=62cf89823babf9923cd2a6eba4afef2d";

var weatherData;
var canvas;
var planetSelect;
var planetName;
var planetSize;

var allPlanets;

var planetBool;

var imgStar;

var x = [];
var y = [];

var R = 150;

var ySpeed;

var objX;
var objY;

//var color = weatherData.main.temp + 100;

function preload() {
	loadJSON(weatherURL, gotWeatherData);
	allPlanets = loadJSON("js/planets.json");

	imgStar = loadImage('./images/star.png');
}

function setup(){
	canvas = createCanvas(windowWidth, windowHeight); 
	background(255);
	planetBool = false;
	print(planetBool);
	planetSelect = createSelect();
	planetSelect.position(10, 10);
	planetSelect.changed(drawPlanetEllipse);

	for(var i = 0; i < 8; i++){
		planetSelect.option(allPlanets.planets[i].name);
	}
//	drawStars();
	start = createP("Select a planet to see its size in relation to Earth");
	start.position(windowWidth/2-150, windowHeight/2-100);

	rect(windowWidth/2+200-random(400),windowHeight/2-200, 0.5, 30, 20);
}

function gotWeatherData(data) {
	weatherData = data;
	console.log(weatherData);
	console.log(weatherData.main.temp);
}

function gravity (){
	for(var f = 0; f < 10; f++){
		if(allPlanets.planets[i].name == planetSelect.value()){
			ySpeed = allPlanets.planets[i].gravity;
			ySpeed = -ySpeed;
		}
		rect(windowWidth/2+200-random(400), ySpeed, 0.5, 30, 20);
	}
}

function drawStars(){
	for(var g = 0; g < 8; g++){
		x[g] = random(width);
		y[g] = random(height);
		var ran = random(10,40);
		var shader = [color];
		if(weatherData.main.temp <= 39){
			tint(0, R+10, 0);
		}else if(weatherData.main.temp > 39){
			tint(R+10, 0, 0);	
		}
		image(imgStar, x[g], y[g], ran, ran);
	}
}

function drawPlanetEllipse(){
	planetBool = true;
	print(planetBool);
}

function draw(){
	if(planetBool == true){
		changePlanetSize();
		drawStars();
		gravity();
		start.hide();
		text("The temperature today is: " + weatherData.main.temp, windowWidth-300, 20);
	}
}
		

function changePlanetSize(){
	background(0);
	fill(255);
	print(planetSelect.value());
	planetBool = false;
	for(var i = 0; i < 8;	i++){
		text("You chose: " + planetSelect.value(), windowWidth/2-50, 50);
		// text("The temperature today is: " + weatherData.main.temp, windowWidth-300, 20);
		if(allPlanets.planets[i].name == planetSelect.value()){
			print(allPlanets.planets[i].size);
			var planetSize = allPlanets.planets[i].size*0.4;
			ellipse(windowWidth/2,windowHeight/2,planetSize,planetSize);
		}
	}
}





