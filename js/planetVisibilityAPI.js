// scale planets with earth, use show earth as a button fo comparison
var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=Chicago&units=imperial&appid=62cf89823babf9923cd2a6eba4afef2d";
var weatherData;
var canvas;
var planetSelect;
var planetName;
var planetSize;
var allPlanets;
var planetBool;
var angle = 0;
var imgStar;
var x = [];
var y = [];
var ran = [];
//comet variables
var xSpeed;
var ySpeed;
var xComet = [];
var yComet = [];
var cometButton;
var cometBool;
var jupiterBool;
var earthBool;
var marsBool;
var mercuryBool;
var neptuneBool;
var saturnBool;
var uranusBool;
var venusBool;
var starBool;
var showEarthButton;
var showEarthBool;
//variables to make the deathstar shoot
var shootBool = false;
var lineX = [];
var lineY = [];
var shootXSpeed;
var shootYSpeed;
 var randDeathLineX;
var randDeathLineY; 


function preload() {
 loadJSON(weatherURL, gotWeatherData);
 allPlanets = loadJSON("js/planets.json");
 imgStar = loadImage('./images/fireStar.png');
 imgJupiter = loadImage('./images/jupiter.png');
 imgEarth = loadImage('./images/earth.png');
 imgMars = loadImage('./images/mars.png');
 imgMercury = loadImage('./images/mercury.png');
 imgNeptune = loadImage('./images/neptune.png');
 imgSaturn = loadImage('./images/saturn.png');
 imgUranus = loadImage('./images/uranus.png');
 imgVenus = loadImage('./images/venus.png');
 imgDeathStar = loadImage('./images/deathstar.png');
 imgComet = loadImage('./images/comet.png');
 imgSidious = loadImage('./images/Sidious.png');
}
function setup(){
 canvas = createCanvas(windowWidth, windowHeight); 
 background(255);
 planetBool = false;
 planetSelect = createSelect();
 planetSelect.position(10, 10);
 planetSelect.changed(drawPlanetEllipse);
// change x coordinates for stars
 for(var g = 0; g < 40; g++){
  x[g] = random(width);
  y[g] = random(height);
 }
 for(var r = 0; r < 40; r++){ 
  ran[r] =  random(1,40); 
 }
 for(var i = 0; i < 8; i++){
  planetSelect.option(allPlanets.planets[i].name);
 }
 showEarthButton = createButton("See relative size to Earth");
 showEarthButton.position(10, 40);
 showEarthButton.mousePressed(drawEarth);
 showEarthBool = false;
 showEarthButton.hide();
    // comet button
    cometBool = false;
 cometButton = createButton("Make a Wish");
 cometButton.position(10, 70);
 cometButton.mousePressed(drawComet);
 cometButton.hide();
 
 start = createP("Your Mission is to Gather Data on each Planet");
 start.position(windowWidth/2-150, windowHeight/2-80);
 rect(windowWidth/2-200, windowHeight/2-100, 400, 100, 1, 1, 1, 1);
 textSize(16);
 jupiterBool = false;
 earthBool = false;
  marsBool = false;
 mercuryBool = false;
  neptuneBool = false;  
 saturnBool = false;
 uranusBool = false;
 venusBool = false;
 starBool = false;
 shootBool = false;
// comet speed and coordinates
 xSpeed = -15;
 ySpeed = 10;
 xComet = width;
 yComet = random(-600, 200);
// beam speed and coordinates
 shootXSpeed = 10;
 shootYSpeed = 10;
 lineX = mouseX;
 lineY = mouseY;

 image(imgSidious, 100, windowHeight/2-150, 200, 200);
}
function gotWeatherData(data) {
 weatherData = data;
 console.log(weatherData);
 console.log(weatherData.main.temp);
}
function drawPlanetEllipse(){
 planetBool = true;
 showEarthBool = false;
}
function deathMouse(){
 noCursor();
 image(imgDeathStar, mouseX, mouseY, 50, 50);
}
function keyTyped(){
 if (key === 'q') {
  shootBool = true;
  randDeathLineX = random(mouseX, 50);
  randDeathLineY = random(mouseY, 50);

 }else{
 shootBool = false;
}
}


function shootDeathStar(){
    
  strokeWeight(5);
  stroke(255, 0, 0); 
  line(mouseX-5, mouseY-8, randDeathLineX, randDeathLineY);

}
function draw(){
  
 if(planetBool == true){
  noStroke();
  starShine();
  changePlanetSize();
  fill(255);
  start.hide();
  
  text("The temperature today is: " + weatherData.main.temp, windowWidth-300, 20);
  deathMouse();
 }
 
 if(showEarthBool == true){
  noStroke();
  starShine();
  showEarth();
  deathMouse();
 }
 if (cometBool == true){
  showComet();
 }
 if(shootBool == true){
  print("deth true");
  shootDeathStar();
 }
}
function drawEarth(){
 showEarthBool = true;
 planetBool = false;
}
function drawComet(){
 cometBool = true;
}
function showComet(){
  xComet = xComet + xSpeed;
  yComet = yComet + ySpeed;
  if(xComet < 0){
   xComet = width;
   yComet = random(-600,200);
   cometBool = false;
  }
  if(cometBool == false){
   xComet = width;
   yComet = random(-600, 200);
  }
  image(imgComet, xComet, yComet, 50, 50);
  print("x "+xComet);
  print("y "+yComet);
}
function showEarth(){
 for(var i = 0; i < 8; i++){
  fill(255);
  text("You found "+ planetSelect.value() + " is: ", windowWidth-300, 40);
 // text(allPlanets.planets[i].size + "% the size of Earth.", windowWidth-300, 60);
 if(allPlanets.planets[i].name == planetSelect.value()){
  text(allPlanets.planets[i].size + "% the size of Earth.", windowWidth-300, 60);
  noFill();
  var standardSize = 100;
  var sizeEarth;
   if(planetSelect.value() == "Earth"){
    image(imgEarth, windowWidth/2, windowHeight/2, standardSize, standardSize);
    earthBool = true;
    sizeEarth = 10000/allPlanets.planets[0].size;
    print("earth"); 
   }else if (planetSelect.value() == "Venus"){
    image(imgVenus, windowWidth/2, windowHeight/2, standardSize, standardSize);
    venusBool = true;
    sizeEarth = 10000/allPlanets.planets[1].size;
    print("venus");
   }else if (planetSelect.value() == "Mars"){
    image(imgMars, windowWidth/2, windowHeight/2, standardSize, standardSize);
    marsBool = true;
    sizeEarth = 10000/allPlanets.planets[2].size;
    print("mars");
   }else if (planetSelect.value() == "Jupiter"){
    image(imgJupiter, windowWidth/2, windowHeight/2, standardSize, standardSize);
    jupiterBool = true;
    sizeEarth = 10000/allPlanets.planets[3].size;
   }else if (planetSelect.value() == "Saturn"){
    image(imgSaturn, windowWidth/2, windowHeight/2, standardSize, standardSize);
    saturnBool = true;
    sizeEarth = 10000/allPlanets.planets[4].size;
   }else if (planetSelect.value() == "Neptune"){
    image(imgNeptune, windowWidth/2, windowHeight/2, standardSize, standardSize);
    neptuneBool = true;
    sizeEarth = 10000/allPlanets.planets[5].size;
   }else if (planetSelect.value() == "Uranus"){
    image(imgUranus, windowWidth/2, windowHeight/2, standardSize, standardSize);
    uranusBool = true;
    sizeEarth = 10000/allPlanets.planets[6].size;
   }else if (planetSelect.value() == "Mercury"){
    image(imgMercury, windowWidth/2, windowHeight/2, standardSize, standardSize);
    mercuryBool = true;
    sizeEarth = 10000/allPlanets.planets[7].size;
   }
   var alignEarth = windowWidth/2-allPlanets.planets[i].size*0.2-200;
   
   noStroke();
   fill(0,100,255);
   text("Earth", alignEarth-10, windowHeight/2-20);
//   ellipse(alignEarth, windowHeight/2, sizeEarth, sizeEarth);
   image(imgEarth, alignEarth, windowHeight/2, sizeEarth, sizeEarth);
   noFill();
  }
 }
}
function starShine(){
 background(0);
 for(var r = 0; r < 40; r++){
   
  var starScale = (sin(angle + PI/2) * ran[r]);
  image(imgStar, x[r], y[r], starScale, starScale);
  }
  angle += 0.0075;
 } 
 
function changePlanetSize(){
 cometButton.show();
 showEarthButton.show();
 starBool = true;
 showEarthBool = false;
 noStroke();
 for(var i = 0; i < 8; i++){
  text("You found " + planetSelect.value(), windowWidth/2-50, 50);
  text("Press Q to Shoot", windowWidth-300, 80);
  // text("The planet "+ planetSelect.value() + " is: ", windowWidth-300, 40);
  if(allPlanets.planets[i].name == planetSelect.value()){
   // text(allPlanets.planets[i].size + "% the size of Earth.", windowWidth-300, 60);
   var planetSize = allPlanets.planets[i].size*0.4;
   imageMode(CENTER);
   if(planetSelect.value() == "Earth"){
    image(imgEarth, windowWidth/2, windowHeight/2, planetSize, planetSize);
    earthBool = true;
    print("earth"); 
   }else if (planetSelect.value() == "Venus"){
    image(imgVenus, windowWidth/2, windowHeight/2, planetSize, planetSize);
    venusBool = true;
    print("venus");
   }else if (planetSelect.value() == "Mars"){
    image(imgMars, windowWidth/2, windowHeight/2, planetSize, planetSize);
    marsBool = true;
    print("mars");
   }else if (planetSelect.value() == "Jupiter"){
    image(imgJupiter, windowWidth/2, windowHeight/2, planetSize, planetSize);
    jupiterBool = true;
   }else if (planetSelect.value() == "Saturn"){
    image(imgSaturn, windowWidth/2, windowHeight/2, planetSize, planetSize);
    saturnBool = true;
   }else if (planetSelect.value() == "Neptune"){
    image(imgNeptune, windowWidth/2, windowHeight/2, planetSize, planetSize);
    neptuneBool = true;
   }else if (planetSelect.value() == "Uranus"){
    image(imgUranus, windowWidth/2, windowHeight/2, planetSize, planetSize);
    uranusBool = true;
   }else if (planetSelect.value() == "Mercury"){
    image(imgMercury, windowWidth/2, windowHeight/2, planetSize, planetSize);
    mercuryBool = true;
   }
  }
 }
}

