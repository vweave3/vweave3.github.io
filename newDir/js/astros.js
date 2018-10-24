var x = [];
var y = [];
var xSpeed = [];
var ySpeed = [];

var astros;

function preload() {
	loadJSON("http://api.open-notify.org/astros.json", astroData);
}
function setup () {
	createCanvas(windowWidth, windowHeight);

	for(var i = 0; i < astros.number; i++) {
		x[i] = random(width);
		y[i] = random(height);
		xSpeed[i] = random(-2, 2);
		ySpeed[i] = random(-2, 2);

	}
}

function astroData(data) {
	astros = data;

	print(astros);
}


function draw () {
	background(0);
	fill (255);

	if(astros){
		for(var i = 0; i < astros.number; i++) {
			x[i] = x[i] + xSpeed[i];
			y[i] = y[i] + ySpeed[i];

			ellipse(x[i], y[i], 20, 20);

			text(astros.people[i].name, x[i]-50, y[i]-50);

			if(x[i] >= windowWidth-11 || x[i] <= 11){
				xSpeed[i]*=-1;
			}
			if(y[i] >= windowWidth-11 || y[i] <= 11){
				ySpeed[i]*=-1;
			}
		}
	}
}


