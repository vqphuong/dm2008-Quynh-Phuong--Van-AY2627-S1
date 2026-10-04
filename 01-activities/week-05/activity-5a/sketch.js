// DM2008 — Activity 5a [Guided]
// Colliding Circles (30 min)
//
// A vector stores position and movement together — cleaner than separate x and y variables.
// Your job is to get two balls moving, then detect and respond to their collision.
//
// Suggested order:
// 1. Create two Ball objects in setup()
// 2. Check the distance between them in draw()
// 3. Trigger a visual response when they collide
// 4. Implement edge behaviour in move() — wrap or bounce, your choice
//
// Stretch: add a third ball, or make the collision response affect both balls.

let balls = [];
let wasColliding = false;
let palette = ["#00fff5", "#ff0000", "#fdf500"];

function setup() {
  createCanvas(400, 400);
  // Create two balls at different starting positions
  balls.push(new Ball(100, 200));
  balls.push(new Ball(300, 200));
  balls.push(new Ball(200, 100));

  // for (let i = 0; i < 10; i++) {
  //   let pos = createVector(x, y);
  //   let vel = createVector(random(-2, 2), random(-2, 2));
  //   let r = 50;
  //   let hasCollided = false;
  //   let col = random(palette);
  //   balls.push(new Balls(pos, vel, r, hasCollided, col));
  // }
}

function draw() {
  background(0);

  // Check collision between the two balls
  // dist() measures the distance between their centers
  // They overlap when that distance is less than the sum of their radii


  for (let i = 0; i < balls.length; i++) {
    balls[i].move();
    balls[i].show();
  }

  // for (let i = 0; i < balls.length; hasColliding = true) {
  //   this.r = this.r * 2;
  // }
   for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
     let d = dist(balls[i].pos.x, balls[i].pos.y, balls[j].pos.x, balls[j].pos.y);
     let colliding = d < balls[i].r / 2 + balls[j].r / 2; // true when the balls overlap, false otherwise

     if (colliding && ! wasColliding) {
       balls[i].vel.mult(-1);
       balls[j].vel.mult(-1);
       // balls[0].r.mult(2);
       // balls[1].r.mult(2);

      balls[i].hasCollided = true;
      balls[j].hasCollided = true;

      balls[i].col = color(random(palette));
      balls[j].col = color(random(palette));

//       let newBall = new Ball(
//   (balls[i].pos.x + balls[j].pos.x) / 2,
//   (balls[i].pos.y + balls[j].pos.y) / 2
// );

//       balls.push(newBall);
   }
      
  wasColliding = colliding;
  }
}
  // for (let i = 0; i < balls.length; i++) {
  //   this.pos = createVector(x, y);
  //   this.vel = createVector(random(-2, 2), random(-2, 2));
  //   this.r = 50;
  //   this.hasCollided = false;
  //   this.col = random(palette);
  //   balls.push(new balls(this.pos, this.vel, this.r, this.hasCollided, this.col));
  // }
}

class Ball {
  constructor(x, y) {
    // pos and vel are vectors — they store x and y together as one object
    this.pos = createVector(x, y);
    this.vel = createVector(random(-2, 2), random(-2, 2));
    this.r = 50;
    this.hasCollided = false;
    this.col = random(palette);
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
   if (this.hasCollided) {
   fill(this.col);
   noStroke();
   ellipse(this.pos.x, this.pos.y, this.r);
  } else {
   fill( "#fdf500");
   ellipse(this.pos.x, this.pos.y, this.r);
   }
  }
}