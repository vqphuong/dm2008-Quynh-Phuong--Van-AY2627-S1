// DM2008 — Activity 3b
// One Function Wonder (20 min)
//
// Write a function that draws a shape or group of shapes.
// It should take at least one parameter — try x, y, size, or color.
// Call it several times with different values to create variation.
//
// Ideas: a simple face, a flower, a house, an icon.
// Example: myShape(100, 200, 50); myShape(300, 200, 80);
//
// Stretch: call your function inside a for loop to create a repeating pattern

let angle = 0;

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
  background(0);
  flower(width/4, height/4, 40, 40);
  flower(3 * width/4, height/4, 40, 40);
  flower(width/4, 3 * height/4, 40, 40);
  flower(3 * width/4, 3 * height/4, 40, 40);
  flower(width/2, height, 50, 50);
  flower(width, height/2, 50, 50);
  flower(width, height, 50, 50);
  flower(width/2, 0, 50, 50);
  flower(0, height/2, 50, 50);
  flower(0, height, 50, 50);
  flower(width, 0, 50, 50);
  flower(0, 0, 50, 50);
  flower(width/2, height/2, 50, 50);
}

// Define your function outside draw()
// It can be called from anywhere in your sketch
function flower(x, y, w, h) {

push();
  
  translate(x, y);   
  rotate(angle); 
  translate(-x, -y);

  noStroke();
  // stroke(166, 2, 75);
  // strokeWeight(2);
  fill(255, 158, 193);
  push();
  translate(x, y);
  rotate(radians(45));
  ellipse(0, 0 - h, w, h * 1.5);
  ellipse(0, 0 + h, w, h * 1.5);
  ellipse(0 - w, 0, w * 1.5, h);
  ellipse(0 + w, 0, w * 1.5, h);
  pop();
  fill(255, 199, 219);
  ellipse(x, y - h, w, h * 1.5);
  ellipse(x, y + h, w, h * 1.5);
  ellipse(x - w, y, w * 1.5, h);
  ellipse(x + w, y, w * 1.5, h);
  fill(255);
  ellipse(x, y, w, h);

  angle += 0.001;

pop();
}