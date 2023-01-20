let morning;
let afternoon;
let evening;
let night;

var dy = []; // cloud random x coordinate
var dx = []; //cloud random y coordinate
var tx = []; // star random x coordinate
var ty = []; //star random y coordinate

function setup() {
	createCanvas(800,1400); // make an HTML canvas element width x height pixels
	
	morning = loadImage('morning.png');
	afternoon = loadImage('afternoon.png');
	evening = loadImage('night.png')
	night = loadImage('night.png');

	for (d = 0; d<=23; d++){
		dx[d] = random(25, width-25)
		dy[d] = random(25, 500-25)
	  }
	//during nighttime, for every hour randomly located star will pop up
	 for (s=0; s<=23; s++){
	   //tx[s] = random(75, 3*width-25)
	   tx[s] = random(25, width-25)
	   //ty[s] = random(75, 3*500-25)
	   ty[s] = random(25, 500-25)
	 }  
	
}

function draw() {
  	let currh = hour();
  	let currs = second();
  
	//background depending on hour of day
	if (currh>=12 && currh<18){
		background(afternoon);
		cloud();
	}
	else if (currh>=18 && currh<24){
		background(evening);
		drawstar();
	}
	else if (currh>=0 && currh<6){
		background(night);
		drawstar();
	}
	else{
		background(morning);
		cloud();
	}

	/*
	drawGrid(); /position reference

	/current time reference
	textSize(32);
	fill(180);
	text(currh, 10, 30);
	fill(100);
	text(currm, 10, 60);
	fill(0);
	text(currs, 10, 90);
	*/

	
	// two eyes rotate by seconds
	push();
	translate(250,400);
	stroke(0);
	fill(0);
	ellipseMode(CENTER);
	ellipse(0,0,40);
	rotate(2*PI*currs/60);
	noStroke();
	fill(210,180,180);
	ellipse(0,-10,10);
	pop();
	
	push();
	translate(350,400);
	stroke(0);
	fill(0);
	ellipseMode(CENTER);
	ellipse(0,0,40);
	rotate(2*PI*currs/60);
	noStroke();
	fill(210,180,180);
	ellipse(0,-10,10);
	pop();

	//eyelash grow by minutes
	
	eyelash(220, 417);
    eyelash(320, 417);

	//eyelid
	push();
	stroke(0);
	strokeWeight(3)
	arc(251,376,30,3,PI,TWO_PI);
	arc(351,376,30,3,PI,TWO_PI);
	pop();

	//face outline
	push();
	translate(300,400);
	strokeWeight(3);
	stroke(	212, 114, 140);
	noFill();
	circle(0,0,400);
	pop();

	//mouth
	push();
	noStroke();
	fill(173, 216, 250)
	arc(300,475,100,100, 0, PI)
	pop();
	
}

/*
//for position reference 
function drawGrid() {
	stroke(200);
	fill(120);
	for (var x=-width; x < width; x+=50) {
		line(x, -height, x, height);
	}
	for (var y=-height; y < height; y+=50) {
		line(-width, y, width, y);
	}
}
*/

function eyelash(x, y){ 
    let m = minute();
    push();
    translate(x, y);
    strokeWeight(5);
	stroke(0);
    for (var i = 0; i < m; i ++) {
        line(18.5, -45, 18.5, -45 + (-1.25 * i));
        line(30, -45, 30, -45 + (-1.25 * i));
        line(41.5, -45, 41.5, -45 + (-1.25 * i));
    }
    pop();
}

function cloud(){
	//draw cloud in predefined random position
	let h =hour();
	for (var i=0; i<h ;i++){
		fill(250);
		stroke(235);
		ellipse(dx[i],dy[i],60,50);
		ellipse(dx[i]+30,dy[i]-10,60,50);
		ellipse(dx[i]+80,dy[i],60,50);
		ellipse(dx[i]+20,dy[i]+20,60,50);
		ellipse(dx[i]+60,dy[i]+15,60,50);
	}
}

function drawstar(){
	let h = hour();
	for (var i=0; i<h ;i++){
		fill(255,255,0);
		stroke(235);
		star(tx[i],ty[i],30,70,5);
	}
}

function star(x, y, radius1, radius2, npoints) {
	let angle = TWO_PI / npoints;
	let halfAngle = angle / 2.0;
	beginShape();
	for (let a = 0; a < TWO_PI; a += angle) {
	  let sx = x + cos(a) * radius2;
	  let sy = y + sin(a) * radius2;
	  vertex(sx, sy);
	  sx = x + cos(a + halfAngle) * radius1;
	  sy = y + sin(a + halfAngle) * radius1;
	  vertex(sx, sy);
	}
	endShape(CLOSE);
}


  