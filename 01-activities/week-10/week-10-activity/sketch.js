let colorBtn, sizeSlider, shapeSelect;
let shapeColor;
let colorSlider;
let rotateSlider;

function setup() {
  createCanvas(640, 400);
  noStroke();
  textFont("Helvetica");

  let colorPalette = [
    color(255, 189, 248),
    color(255, 194, 216),
    color(184, 235, 255),
    color(255, 239, 196),
    color(223, 255, 199),
    color(224, 209, 255)
  ]

  // starting color
  shapeColor = random(colorPalette);

  // Button: change color
  colorBtn = createButton("Change Color");
  colorBtn.position(16, 16);
  colorBtn.mousePressed(randomShapeColor);
  
  function randomShapeColor() {
    shapeColor = random(colorPalette);
  }

  let colorP = createP("Change transparency");
  colorP.position(0, 45).style("margin", "4px 0 0 16px").style("color", "white").style("font-family", "Helvetica");
  colorSlider = createSlider(0, 255, 255, 1);
  colorSlider.position(15, 70);
  
  // Slider: controls size
  let sizeP = createP("Size");
  sizeP.position(0, 95).style("margin", "4px 0 0 16px").style("color", "white").style("font-family", "Helvetica");
  sizeSlider = createSlider(20, 220, 100, 1);
  sizeSlider.position(15, 120);

  // Dropdown: choose shape
  let shapeP = createP("Shape");
  shapeP.position(0, 145).style("margin", "8px 0 0 16px").style("color", "white").style("font-family", "Helvetica");
  shapeSelect = createSelect();
  shapeSelect.position(16, 175);
  shapeSelect.option("Ellipse");
  shapeSelect.option("Rectangle");
  shapeSelect.option("Triangle");

  let rotateP = createP("Rotation");
  rotateP.position(0, 210).style("margin", "4px 0 0 16px").style("color", "white").style("font-family", "Helvetica");
  rotateSlider = createSlider(0, TWO_PI, 0, 0.01);
  rotateSlider.position(15, 240);
}

function draw() {
  background(0);

  push();
  translate(width * 0.65, height * 0.5);
  let s = sizeSlider.value();

  rotate(rotateSlider.value());

  // fill(shapeColor);

  let transparencyValue = colorSlider.value();
  fill(red(shapeColor), green(shapeColor), blue(shapeColor), transparencyValue);

  // draw chosen shape
  let choice = shapeSelect.value();
  if (choice === "Ellipse") {
    ellipse(0, 0, s, s);
  } else if (choice === "Rectangle") {
    rectMode(CENTER);
    rect(0, 0, s, s);
  } else if (choice === "Triangle") {
    triangle(-s * 0.6, s * 0.5, 0, -s * 0.6, s * 0.6, s * 0.5);
  }
  pop();
}
