// DM2008 — Activity 2b [Guided]
// Pattern Making (40 min)
//
// Use a for loop to draw a repeating row of shapes.
// Add a condition to introduce variation — alternating color, size, or spacing.
// Then add one interaction (mouse or key) that changes the rule.
//
// Stretch: try a second row, or turn your row into a 2D grid.

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
  background(0, 0, 0);
  noStroke();
    for (let y = 0; y < height; y += 50) {
    for (let x = 0; x < width; x += 50) {
      let column = x / 50;
      let row = y / 50;

    // % (modulo) alternates between 0 and non-zero — good for switching every other shape
  if (mouseIsPressed) {
   if ((column + row) % 2 == 0) {
     fill(0, mouseX, 0);   
   } else {
     fill(220, 0, 0);   
   }
 } else {
   if ((column + row) % 2 == 0) {
     fill(255, 220, 0);  
   } else {
     fill(255, mouseY, 180); 
   }
 }
      
    // --- Your shape goes here ---
    // Try swapping this out for your own rule.
   if ((column + row) % 2 == 0) {
        ellipse(x + 25, y + 25, 40);
      } else {
        rect(x + 25, y + 25, 40, 40);
   }
    }
  }
}