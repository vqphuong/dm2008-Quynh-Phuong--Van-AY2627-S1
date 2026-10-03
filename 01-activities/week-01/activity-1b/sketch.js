// DM2008 — Activity 1b [Georg Nees]
// Learning By Making (30 min)

let x;
let y;
let w;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255, 204, 224, 50);
  
  x = random(width);
  y = random(height);
  w = random(10, 80);
  
  // background(240,40);
  
  stroke(random(200, 255), random(100, 0), random(102, 255), random(0, 255));
  strokeWeight(random(0.5, 2));
  fill(random(200, 255), random(100, 0), random(102, 255), random(0, 255));
  rect(x, y, w, w);
  fill(random(200, 255), random(100, 0), random(102, 255), random(0, 255));
  ellipse(random(0,800), random(0,800), 50, 50);

  fill(random(200, 255), random(100, 0), random(102, 255), random(0, 255));
  ellipse(mouseX, mouseY, 70);
}

function keyPressed() {
    saveCanvas("activity1b-image", "jpg");
}