// let angle = 0;
// let growthSpeed = 0.05;

let spiral = [];
let balls = [];
let activeSpiral = false;
let wasColliding = false;
let palette = [
  // color(255, 104, 189), 
  // color(166, 226, 61), 
  // color(7, 189, 255), 
  // color(168, 144, 255), 
  // color(253, 122, 57), 
  // color(0, 198, 158), 
  // color(245, 228, 95)
  "#ff68bd",
  "#a6e23d",
  "#07bdff",
  "#a890ff",
  "#fd7a39",
  "#00c69e",
  "#f5e45f"
];

let collisionPairs = [];
// let alpha = [100, 150, 200, 255];
let music = [];
let pencil;
// let Do, Re, Mi, Fa, So, La, Si;

let port; // Serial Communication port
let connectBtn;
let wasOpened = false; // tracks port state to update the button label

let sensorVal;
let sensorValue = 0;
let isPressed = false;

let backgroundVid;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  // background(245);

  backgroundVid = createVideo(['background.mp4'], videoPlay);

  port = createSerial(); // creates the Serial Port

  // Connection helpers
  connectBtn = createButton("Connect to Arduino");
  connectBtn.position(20, 20);
  connectBtn.mousePressed(connectBtnClick);

  balls.push(new Ball(random(windowWidth), random(windowHeight)));
  balls.push(new Ball(random(windowWidth), random(windowHeight)));
  balls.push(new Ball(random(windowWidth), random(windowHeight)));
  balls.push(new Ball(random(windowWidth), random(windowHeight)));
  balls.push(new Ball(random(windowWidth), random(windowHeight)));
  balls.push(new Ball(random(windowWidth), random(windowHeight)));

  music[0] = await loadSound("DO.mp3");
  music[1] = await loadSound("RE.mp3");
  music[2] = await loadSound("MI.mp3");
  music[3] = await loadSound("FA.mp3");
  music[4] = await loadSound("SO.mp3");
  music[5] = await loadSound("LA.mp3");
  music[6] = await loadSound("SI.mp3");

  pencil = await loadSound("Pencil.MP3");

}

function videoPlay() {
  backgroundVid.loop();
  // backgroundVid.size(windowWidth, windowHeight);
  // backgroundVid.autoplay();
}

function draw() {
  background(0);

  image(backgroundVid, 0, 0, windowWidth, windowHeight);

  updateConnectBtn();

  // Receive data from Arduino
  if (port.opened()) {
    sensorVal = port.readUntil("\n");
    // Only log data that has information, not empty signals
    if (sensorVal[0]) {
      // Once you verify data is coming in,
      // disable logging to improve performance
      console.log(sensorVal);

      let val = float(sensorVal);

      if (!isNaN(val)) {
        sensorValue = val;
      }
    }
  }

  isPressed = sensorValue > 100 || mouseIsPressed;

  for (let i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].show();

  }
  
  if (isPressed && activeSpiral == false) {
  let spawnX = random(width);
  let spawnY = random(height);

  for (let i = 0; i < spiral.length; i++) {
    let d = dist(spawnX, spawnY, spiral[i].pos.x, spiral[i].pos.y);
    let r2 = 5 * spiral[i].angle;

    if (d < r2 + 30) {
      spawnX = (spawnX + 150) % width;
      spawnY = (spawnY + 150) % height;
    }
  }

  spiral.push(new Spiral(spawnX, spawnY));
  activeSpiral = true;

  // AI used: Initialise collision tracking for the new spiral to prevent continuously colliding between two spirals
  // collisionPairs: an array helps the code remember whether two specific spirals have already collided
  collisionPairs.push([]);

  for (let i = 0; i < collisionPairs.length; i++) {
    collisionPairs[i].push(false);
  }

  pencil.play();
  pencil.amp(0.3);
  pencil.loop();
}

  for (let i = 0; i < spiral.length; i++) {

    if (i == spiral.length - 1 && activeSpiral == true) {
      spiral[i].grow();
    } else {
      spiral[i].move();
    }

    spiral[i].display();
  }

  if (!isPressed) {
    activeSpiral = false;
    pencil.stop();
  }

  for (let i = 0; i < spiral.length; i++) {
  for (let j = i + 1; j < spiral.length; j++) {

    // Check if either spiral is still growing
    let iIsNew = (i == spiral.length - 1 && activeSpiral);
    let jIsNew = (j == spiral.length - 1 && activeSpiral);

    // AI used: 
    // Only check collision when both spirals are finished
    if (!iIsNew && !jIsNew) {

      let d = dist(
        spiral[i].pos.x, spiral[i].pos.y,
        spiral[j].pos.x, spiral[j].pos.y
      );

      let r1 = 5 * spiral[i].angle;
      let r2 = 5 * spiral[j].angle;

      let colliding = d < (r1 + r2);

      if (colliding && !collisionPairs[i][j]) {

        spiral[i].vel.mult(-1);
        spiral[j].vel.mult(-1);

        spiral[i].col = color(random(palette));
        spiral[j].col = color(random(palette));

        let note = floor(random(music.length));
        music[note].play();
        music[note].amp(0.3);
      }

      collisionPairs[i][j] = colliding;
    }
  }
}

for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
     let d = dist(balls[i].pos.x, balls[i].pos.y, balls[j].pos.x, balls[j].pos.y);
     let colliding = d < balls[i].r / 2 + balls[j].r / 2; // true when the balls overlap, false otherwise

     if (colliding && ! wasColliding) {
      balls[i].vel.mult(-1);
      balls[j].vel.mult(-1);

      balls[i].hasCollided = true;
      balls[j].hasCollided = true;

      balls[i].col = color(random(palette));
      balls[j].col = color(random(palette));

   }
      
  wasColliding = colliding;
   }
  }
}

class Spiral {
  constructor(x, y) {
    // pos and vel are vectors — they store x and y together as one object
    this.pos = createVector(x, y);
    this.vel = createVector(random(-1, 1), random(-1, 1));

    this.angle = 0;
    this.growthSpeed = 0.08;
    this.weight = random(4, 8);
    this.col = random(palette);
    
    this.seed = random(100, 1000);
    this.wasColliding = false;

  }

  grow(){
    this.angle = min(this.angle + this.growthSpeed, TWO_PI * 10);
  }

  move() {
    // Adding the velocity vector to position moves the ball each frame
    this.pos.add(this.vel);

    // Handle edges — could you make this bounce instead of wrap?
    if (this.pos.x > width) {
      //this.pos.x = 0;
      this.vel.x *= -1;
    }
    if (this.pos.x < 0) {
      //this.pos.x = width;
      this.vel.x *= -1;
    }
    if (this.pos.y > height) {
      //this.pos.y = 0;
      this.vel.y *= -1;
    }
    if (this.pos.y < 0) {
      //this.pos.y = height;
      this.vel.y *= -1;
    }
  }

  display(){
    push();
    translate(this.pos.x, this.pos.y);

    stroke(this.col);
    strokeWeight(this.weight);
    noFill();

    beginShape();

    for (let a = 0; a <= this.angle; a += 0.02) {

      // AI used:
      // noise() is like changes gradually with no sudden change compare to random
      // map() converts a number from one range to another 
      let shake = map(noise(a * 2, this.seed), 0, 1, -2, 2);
      
      //let r = random(4.92, 5) * a;
      let r = 5 * a + shake;
  
      let x = r * cos(a);
      let y = r * sin(a);

      vertex(x, y);
    }

    endShape();
    pop();
  }
}

class Ball {
  constructor(x, y) {
    // pos and vel are vectors — they store x and y together as one object
    this.pos = createVector(x, y);
    this.vel = createVector(random(-0.7, 0.7), random(-0.7, 0.7));
    this.r = random(10, 30);
    this.hasCollided = false;
    this.col = random(palette);
    this.alpha = random(alpha);
  }

  move() {
    // Adding the velocity vector to position moves the ball each frame
    this.pos.add(this.vel);

    // Handle edges — could you make this bounce instead of wrap?
    if (this.pos.x > width - this.r / 2) {
      // this.pos.x = 0;
      this.vel.x *= -1;
    }
    if (this.pos.x - this.r / 2 < 0) {
      // this.pos.x = width;
      this.vel.x *= -1
    }
    if (this.pos.y > height - this.r / 2) {
      this.vel.y *= -1
    }
    if (this.pos.y - this.r / 2 < 0) {
      // this.pos.y = height;
      this.vel.y *= -1
    }
  }

  show() {
  //  if (this.hasCollided) {
   fill(this.col, this.alpha);
   noStroke();
   ellipse(this.pos.x, this.pos.y, this.r);
  // } else {
  //  fill( "#fdf500");
  //  ellipse(this.pos.x, this.pos.y, this.r);
  //  }
  }
}

function connectBtnClick() {
  
  if (!port.opened()) {
    port.open(9600); // opens port with Baud Rate of 9600
  } else {
    port.close();
  }
}

// Keeps the button in sync with the real port state, since opening is
// asynchronous and can fail (picker cancelled, port busy, board unplugged)
function updateConnectBtn() {
  let isOpened = port.opened();
  
  if (isOpened === wasOpened) return;
  wasOpened = isOpened;

  connectBtn.html(isOpened ? "Disconnect Arduino" : "Connect to Arduino");
  if (isOpened) {
    connectBtn.addClass("connected");
  } else {
    connectBtn.removeClass("connected");
  }
}