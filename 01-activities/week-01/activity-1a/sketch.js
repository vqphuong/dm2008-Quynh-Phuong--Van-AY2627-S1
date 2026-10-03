// DM2008 — Activity 1a
// Simple Creatures (20 min)

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
  background(255, 230, 239);
  noStroke();
  fill(56, 38, 38);
  triangle(75, 175, 100, 50, 175, 150);
  fill(56, 38, 38);
  triangle(225, 150, 300, 50, 325, 175);
  fill(255, 150, 188);
  triangle(75, 175, 100, 50, 100, 150);
  fill(255, 150, 188);
  triangle(300, 150, 300, 50, 325, 175);
  fill(56, 38, 38);
  ellipse(200, 225, 300, 200);
  fill(255, 255, 255);
  ellipse(135, 215, 90, 75);
  fill(255, 255, 255);
  ellipse(265, 215, 90, 75);
  fill(0, 0, 0);
  ellipse(150, 215, 50, 50);
  fill(0, 0, 0);
  ellipse(250, 215, 50, 50);
  stroke(0, 0, 0);
  strokeWeight(2);
  line(25, 250, 100, 250);
  line(105, 260, 37, 288);
  line(300, 250, 375, 250);
  line(290, 258, 362, 288);
  fill(255, 150, 188);
  noStroke();
  ellipse(200, 250, 40, 20);
  
  helperGrid(); // do not edit or remove this line
}
