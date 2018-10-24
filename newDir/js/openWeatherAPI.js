var weatherData;
var canvas;
var windSpeed;
var windX;
var fillTemp;
var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=Chicago&units=imperial&appid=62cf89823babf9923cd2a6eba4afef2d";

var randDino;
var dinos;

function preload() {
	loadJSON(weatherURL, gotWeatherData);
	dinos = loadJSON("js/dinos.json");

}


function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	windX = windowWidth/2;

	// # at 2nd interval is in milliseconds
	setInterval(updateWeather, 60000);

	console.log(dinos.dinosaurs.length)
	// int converts the 2 #'s into a whole number, no decimal numbers'
	randDino = int(random(0,dinos.dinosaurs.length));
}

function updateWeather() {
	loadJSON(weatherURL, gotWeatherData);

}

function gotWeatherData(data) {
	weatherData = data;
	console.log(weatherData);
	console.log(weatherData.weather[0].description);
	console.log(weatherData.main.temp);
	console.log(weatherData.wind.speed);

}

function draw() {
	background(0, 255, 0);
	textSize(30);
	if(weatherData) {
		fillTemp = weatherData.main.temp;
		var mappedFillTemp;
		mappedFillTemp = map(fillTemp, 0, 105, 0, 255);
		fill(mappedFillTemp, 30, 150);
		windSpeed = weatherData.wind.speed;
		windX = windX + windSpeed;
		rect(windX, windowHeight/2, 50, 50);
		text("The " + dinos.dinosaurs[randDino] + " is seeing " + weatherData.weather[0].description, 10, 40);

		if(windX > windowWidth) {
			windX = 0;
		}
	}

}
