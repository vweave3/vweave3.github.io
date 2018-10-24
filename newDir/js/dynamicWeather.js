var weatherData;

var api = "https://api.openweathermap.org/data/2.5/weather?q=";
var city = "Chicago";
var apiKey = "&units=imperial&appid=62cf89823babf9923cd2a6eba4afef2d";

var citySelect;

function setup(){
	createCanvas(500, 500);

	citySelect = createSelect();
	citySelect.position(10, 10);
	citySelect.option("Chicago");
	citySelect.option("New York");
	citySelect.option("Houston");
	citySelect.option("Las Vegas");
	citySelect.changed(changeCity);
}

function changeCity(){
	var weatherURL = api + citySelect.value() + apiKey;
	loadJSON(weatherURL, gotWeatherData);
}

function gotWeatherData(data) {
	weatherData = data;
	console.log(weatherData);
}

function draw(){
	background(0);

	if(weatherData){
		ellipse(width/2, height/2, weatherData.main.temp, weatherData.main.temp);
	}
}



