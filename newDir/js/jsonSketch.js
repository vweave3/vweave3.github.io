var me;

function preload(){
	
	me = loadJSON("js/me.json");

}

function setup(){
	createCanvas(400,400);
//	print(me);
//	print(me.name);
//	print(me.age);
//	print(me.weight);
//	print(me.birth);

}

function draw(){
	background(0);
	fill(255);
	text(me.name, 10, 30);
	text(me.Birth, 10, 50);

}