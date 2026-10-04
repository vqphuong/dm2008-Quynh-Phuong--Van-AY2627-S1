let x = 0;       
let size = 50;   
let bgColor;     

function setup() {
  createCanvas(400, 400);
  bgColor = color(0, 255, 229);
  rectMode(CENTER);
}

function draw() {
  background(bgColor);

  x += 2;

  if (x > width + size / 2) {
    x = 0;
  }

  if (x < width / 2) {
    noStroke();
    fill(255, 38, 0);
    ellipse(x, height / 2, size);
  } else {
    noStroke();
    fill(0, 140, 119);
    rect(x, height / 2, size);
  }

  if (x < width / 2 && keyIsPressed) {
    noStroke();
    fill(255, 234, 0);
    ellipse(x, height / 2, size);
  }
    
  if (x >= width / 2 && keyIsPressed) {
    noStroke();
    fill(255, 234, 0);
    rect(x, height / 2, size);
  }
}

function keyPressed() {
  switch (key) {
    case "1":
      bgColor = color(102, 255, 232);
      break; 
    case "2":
      bgColor = color(255, 30, 0);
      break; 
    case "3":
      bgColor = color(255, 255, 0);
      break; 
    case "4":
      bgColor = color(0, 199, 196); 
  }
}