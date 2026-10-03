// DM2008 — Activity 3a [Guided]
// Array Sampler (20 min)
//
// An array stores a list of values — here it's colors, but it could be
// sizes, positions, or anything else.
// Press any key to cycle through the array one item at a time.
//
// Try these:
// - Replace the colors with your own values (sizes, positions, text).
// - Use mousePressed() instead of keyPressed().
// - Use push() to add new items or splice() to remove them.
// - Loop through the whole array to draw all items at once.
//
// Stretch: visualize all items in the array simultaneously instead of one at a time.

let palette = ["#b18cfe", "#fec700", "#a8c6fe", "#ffffff"];
let length = [50, 20, 30, 40];
let pickedColor, pickedLength;
let currentIndex = 0;

function setup() {
  createCanvas(400, 400);
  noStroke();
  pickedColor = random(palette);
  pickedLength = random(length);
}

function draw() {
  background(mouseX, 50, 100);
  
  const spacing = width / (palette.length + 1);
  
  for (let i = 0; i < palette.length; i++) {
    fill(pickedColor);                   // use the i-th color
    const x = (i + 1) * spacing;        // position from the loop index
    ellipse(x, height / 2, pickedLength);
  }
}

// // Advance to the next color each time a key is pressed
// function keyPressed() {
//   currentIndex++; // shorthand for currentIndex += 1

//   // Wrap back to the start when we reach the end
//   if (currentIndex >= palette.length) {
//     currentIndex = 0;
//   }

  console.log("Current index:", currentIndex, "→", palette[currentIndex]);

function mousePressed() {
  pickedColor = random (palette);
  pickedLength = random (length);
  }

function keyPressed() {
  if (key == 'a') {
    palette.push(color(random(255), random(255), random(255)));
  } else {
      if (palette.length > 0) {
         palette.splice(palette.length - 1, 1);
    }
  }
}