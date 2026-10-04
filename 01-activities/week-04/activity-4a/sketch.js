// DM2008 — Activity 4a [Guided]
// Bake a Cookie (30 min)
//
// A class is a blueprint — Cookie describes what every cookie has and can do.
// Your job is to complete the class, then add movement and a flavor randomizer.
//
// Suggested order:
// 1. Add the missing properties to the constructor (sz, x, y)
// 2. Fix show() so it uses this.flavor, this.x, this.y, this.sz
// 3. Implement move() and randomFlavor()
// 4. Wire them up in keyPressed() and mousePressed()
//
// Stretch: add a second cookie with different starting values.

let cookie;

function setup() {
  createCanvas(400, 400);
  noStroke();
  cookie = new Cookie("chocolate", 150, width / 2, height / 2);
  rectMode(CENTER);
}

function draw() {
  background(0);
  fill(245, 245, 245);
  ellipse(width / 2, height / 2, 250);
  fill(245, 245, 245);
  rect(360, 225, 20, 170);
  fill(245, 245, 245);
  ellipse(360, 311, 20);
  fill(245, 245, 245);
  ellipse(360, 150, 45, 80);
  cookie.show();
}

class Cookie {
  constructor(flavor, sz, x, y) {
    // this. binds each value to this specific cookie object
    // Add the missing properties below
    this.flavor = flavor;
    this.sz = sz;
    this.x = x;
    this.y = y;
    this.rot = random(1,5) * 0.01;
    this.angle = 0;
  }

  show() {
    // Fix this method — it should use this.flavor, this.x, this.y, this.sz
    switch (this.flavor) {
      case "chocolate":
        fill(196, 146, 96);
        break;
      case "vanilla":
        fill(255, 223, 150);
        break;
      case "banana":
        fill(255, 221, 71);
    }
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    
    ellipse(0, 0, this.sz);
    const s = this.sz * 0.1;
    
    fill(36, 0, 0);
    ellipse(0 - this.sz*0.22, 0 - this.sz*0.15, s * 2);
    ellipse(0 + this.sz*0.18, 0 - this.sz*0.20, s);
    ellipse(0 - this.sz*0.25, 0 + this.sz*0.20, s);
    ellipse(0 + this.sz*0.20, 0 + this.sz*0.18, s * 2);
    pop();

    this.angle += this.rot;
  }

  // Add a move() method — update this.x or this.y based on which key is pressed
  move() {
  if (key === '+') {
    this.x = this.x + 1;
  } if (key === '!') {
    this.sz = this.sz + 3;
  } if (key === '?') {
    this.sz = this.sz - 3;
  } else if (key == '-') {
    this.x = this.x - 1; 
  }
}

  // Add a randomFlavor() method — set this.flavor to one of at least 3 options
  randomFlavor() {
  this.flavor = random(["chocolate", "vanilla", "banana"]);
}
}

// Call cookie.move() when an arrow key is pressed
function keyPressed() {
cookie.move();
}

// Call cookie.randomFlavor() when the mouse is clicked
function mousePressed() {
cookie.randomFlavor();
}