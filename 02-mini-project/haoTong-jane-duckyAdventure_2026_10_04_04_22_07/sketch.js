// DM2008 — Mini Project
// FLAPPY BIRD (Starter Scaffold)
//
// Complete this scaffold into a playable game.
// Your game should have player control, collision detection,
// score tracking, and at least two game states.
//
// Not sure where to start? Try this order:
// 1. (v)Get the bird flapping — add control in keyPressed()
// 2. (v)Get pipes spawning — uncomment the spawn logic in draw()
// 3. (y)Add collision detection between the bird and pipes
// 4. (v)Add scoring when the bird passes a pipe
// 5. (v)Add game states — playing state, game over state, speed up state
//
// Things to do
// 1. How to properly speed up
// 2. How to fit images properly

// Stretch: add a start screen, a high score, or a difficulty curve

/* ----------------- Globals ----------------- */
let bird;
let pipes = []; 
let score = 0;
let spawnCounter = 0;
let s = 0;
let myFont;
let img, imgDuck, imgDuck2, imgDduck3; 
let imgStart, imgHurt, imgBurn, imgCaught;
let obstacles = [], obstacles2 = [];
let bgSound, startSound, overSound;
let butX = 110, butY = 195, butW = 260, butH = 60;
let hitPipes;

let bgScrollX = 0, bgScrollX2 = 0;

let SPAWN_RATE = 90;
let PIPE_SPEED = 2.5;
const PIPE_GAP = 250;
const PIPE_W = 70;

// Game states: "playing" or "gameover" — add more if you need them
let gameState = "start";

/* ----------------- Setup & Draw ----------------- */
async function setup() {
  createCanvas(480, 640);
  noStroke();

  bird = new Bird(120, height / 2);
  pipes.push(new Pipe(width + 40));

  myFont = await loadFont('asset/Minecraft.ttf');
  textFont(myFont); 

  img = await loadImage("asset/Background.jpg"); 
  imgDuck = await loadImage("asset/Duck.png"); 
  imgDuck2 = await loadImage("asset/Duck2.png");
  imgDuck3 = await loadImage("asset/Duck3.png");
  
  obstacles[0] = await loadImage("asset/Bigfire.png");
  obstacles[1] = await loadImage("asset/Smallfire.png");
  obstacles[2] = await loadImage("asset/Ghost.png");
  obstacles[3] = await loadImage("asset/Rock.png");
  
  obstacles2[0] = await loadImage("asset/Bigfire2.png");
  obstacles2[1] = await loadImage("asset/Smallfire2.png");
  obstacles2[2] = await loadImage("asset/Ghost2.png");
  obstacles2[3] = await loadImage("asset/Rock2.png");

  imgStart = await loadImage("asset/Start.png");
  imgHurt = await loadImage("asset/Hurt.png");
  imgBurn = await loadImage("asset/Burn.png");
  imgCaught = await loadImage("asset/Caught.png");

  bgSound = await loadSound("asset/Bgsound.mp3");
  startSound = await loadSound("asset/Startsound.mp3");
  overSound = await loadSound("asset/Gameover.mp3");
}

function draw() {
  background(18, 22, 28);
  
  image(img, bgScrollX, 0, 0, height);
  bgScrollX--;
  image(img, bgScrollX2, 0, 0, height);
  bgScrollX2--;

  if(bgScrollX < -3464){
    bgScrollX = 0;
  }
  if(bgScrollX2 < -2984){
    bgScrollX2 = 480;
  }
  
  if (gameState === "start"){
    image(imgStart, 0, 0, width, height);

    // if (!startSound.isPlaying()){
    //   startSound.play();
    //   startSound.amp(0.3);
    //   startSound.loop();
    // }
    
     if (mouseX >= butX && mouseX >= butX 
         && mouseX <= butX + butW 
         && mouseY >= butY && mouseY <= butY + butH
         && gameState === "start" && mouseIsPressed){
      
        console.log("working!!");

        bgSound.play();
        bgSound.amp(0.3);
        bgSound.loop();
        gameState = "playing"; 
    }
  }
  
  if (gameState === "playing") {
    bird.update();

    // Spawn a new pipe every SPAWN_RATE frames, then reset the counter
    spawnCounter++;
    if (spawnCounter >= SPAWN_RATE) {
      pipes.push(new Pipe(width + 40));
      spawnCounter = 0;
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      pipes[i].show();

      // When the bird hits a pipe, trigger game over
      if (pipes[i].hits(bird)) {
        // What should happen when the game ends?
        bird.clr = color(255, 0, 0);
        gameState = "gameover";   
      }

      // When the bird passes a pipe, increment the score
      // Hint: use pipes[i].passed to make sure you only score once per pipe
        if (!pipes[i].passed && pipes[i].x + pipes[i].w < bird.pos.x) {
        // increment score here
        pipes[i].passed = true;
        s++;

        if ( s < 10 && s >= 5) {
            PIPE_SPEED = 2.8;
            SPAWN_RATE = 80;
        } 
        if (s >= 10) {
            PIPE_SPEED = 3.2;
            SPAWN_RATE = 75;
        }
      } 

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

  //score display
  textSize(80);
  fill(255, 232, 117);
  textAlign(CENTER, CENTER);
  text( s, width / 2, height - 500);
    
  bird.show();
}

  if (gameState === "gameover") {
    
    if (hitPipes === "hurt") {
          image(imgHurt, 0, 0, width, height);
        } else if (hitPipes === "burn") {
          image(imgBurn, 0, 0, width, height);
        } else if (hitPipes === "caught") {
          image(imgCaught, 0, 0, width, height);
        } 
    
    startSound.stop();
    
    overSound.play();
    overSound.amp(0.3);

    if (mouseX >= butX && mouseX >= butX 
        && mouseX <= butX + butW 
        && mouseY >= butY && mouseY <= butY + butH
        && gameState === "gameover" && mouseIsPressed){

        overSound.stop();
        console.log("working!!")
        resetGame();
    }
  }  
}

function resetGame() {
  s = 0;
  gameState = "playing";
  PIPE_SPEED = 2.5;
  SPAWN_RATE = 90;
  bird.pos = createVector(120, height / 2);
  bird.clr = color(255, 205, 80);
  pipes = []; 
  
}


/* ----------------- Input ----------------- */
function keyPressed() {
  // Make the bird flap on space or UP_ARROW — call bird.flap()
    bird.flap();
}

/* ----------------- Classes ----------------- */
class Bird {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 25;
    this.gravity = 0.45;
    this.flapStrength = -8.0;
    this.clr = color(255, 205, 80);
  }

  applyForce(fy) {
    this.acc.y += fy;
  }

  flap() {
    // A negative y velocity moves the bird upward
    this.vel.y = this.flapStrength;
  }

  update() {
    this.applyForce(this.gravity);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // Keep the bird within the canvas vertically
    if (this.pos.y < this.r) {
      this.pos.y = this.r;
      this.vel.y = 0;
    }

    // Touching the ground is game over — same as hitting a pipe
    if (this.pos.y > height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y = 0;
    }
  }

  show() {
    noFill();
    circle(this.pos.x, this.pos.y, this.r * 2);
    noFill();
    circle(this.pos.x + 6, this.pos.y - 4, 4);

    if (s >= 5) {
      image(imgDuck3, this.pos.x - this.r, this.pos.y - this.r,  95, 50)
      } else {
      image(imgDuck2, this.pos.x - this.r, this.pos.y - this.r, 50, 50);
    }
  }
}

class Pipe {
  constructor(x) {
    this.x = x;
    this.w = PIPE_W;
    this.speed = PIPE_SPEED;

    const margin = 40;
    const gapY = random(margin, height - margin - PIPE_GAP);
    this.top = gapY;
    this.bottom = gapY + PIPE_GAP;

    this.passed = false;

    this.topImg = floor(random(obstacles2.length));
    this.botImg = floor(random(obstacles.length));
  }

  update() {
    this.x -= this.speed;
  }

  show() {
    noFill();
    rect(this.x, 0, this.w, this.top);
    rect(this.x, this.bottom, this.w, height - this.bottom);
    
    image(obstacles2[this.topImg], this.x, 0, this.w, this.top);
    image(obstacles[this.botImg], this.x, this.bottom, this.w, height - this.bottom);
    
  }

  offscreen() {
    // 'return' sends a value back to wherever this method was called
    // We'll cover this properly next week, for now just know it gives back true or false
    return this.x + this.w < 0;
  }

  // Checks if the bird overlaps with either pipe rectangle
  // 1) Is the bird within the pipe's x range?
  // 2) If yes, is it outside the gap — above the top or below the bottom?
  hits(bird) {
    // This method also uses 'return' — coming up next week!
    const withinX = (bird.pos.x + bird.r > this.x) && (bird.pos.x - bird.r < this.x + this.w);
    const aboveGap = bird.pos.y - bird.r < this.top;
    const belowGap = bird.pos.y + bird.r > this.bottom;
    
    if (withinX && (aboveGap || belowGap)){
      let hitObject;
      if (aboveGap){
        hitObject = this.topImg;
      } else{
        hitObject= this.botImg;
      }

    if (hitObject === 2) {
      hitPipes = "caught";
    } else if (hitObject === 3) {
      hitPipes = "hurt";
    } else {
      hitPipes = "burn";
    }

    return true;
   }

   return false;
  }
}