/*
 * Aeolian Memories: Texture of Deep Time
 * Author: Huayang Lei
 * Updated: 2026/01/22 (Final High-Contrast Audio)


 * Operation Manual:
  - Run and watch the visuals changes via time.
  - Press the keyboard "F" resizing to full screen
  - Note: each time resizing the window, the programme will restart automatically.
   -click screen to turn on bg sound

 * Optional Blurb:
  Aeolian Memories is a computational exploration of how humans might perceive and experience “Deep Time”. 
  Developed using the p5.js framework, the project visually simulates the incremental and relentless processes of wind erosion and layering characteristic of Yardang landforms. 
  It seeks to give the audience a sensory encounter with scales of time that far exceed the boundaries of a single human lifespan. 
  Through the deployment of high-density particle systems, the work transforms the digital canvas into a “tracing record”, 
  where invisible temporal forces are materialized into intricate patterns and textures composed of countless fine lines.

 * Acknowledgements:
 1. Technical References (Code):
 - Slime Molds by Patt Vira
  https://p5js.org/sketches/2213463/
 - The Nature of Code by Shiffman, D.
  https://natureofcode.com/autonomous-agents/
 
 2. Conceptual Inspiration:
 - The concept of Deep Time by McPhee in <Annals of the Former World>.
 - Deep Time Reckoning: How Future Thinking Can Help Earth Now by Ialenti, Vincent.
 
 */

let particles = [];
let maxParticles = 8000;
let deepTimeT = 0;

// to control the sound
let noiseGen;
let filter;
let audioStarted = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);

  //set audio environment
  noiseGen = new p5.Noise("pink");
  filter = new p5.LowPass(); //filter
  noiseGen.disconnect();
  noiseGen.connect(filter); //add the filter in
  noiseGen.amp(0);
  noiseGen.start();

  //to reset the sketch if windows size changed
  resetSketch();
}

function draw() {
  //almost never refresh beckground and traces will disappear only long time passed
  fill(20, 30, 5, 0.5);
  noStroke();
  rect(0, 0, width, height);

  //overlaping the lines
  blendMode(SCREEN);

  deepTimeT += 0.0002;

  let totalSpeed = 0;

  // draw particles
  for (let p of particles) {
    p.follow(deepTimeT);
    p.update();
    p.display();
    p.checkEdges();
    totalSpeed += p.vel.mag();
  }

  // *************** changing of sound ************************
  if (audioStarted) {
    // get the base speed of paeticles----wind force is relating on particles' speed
    let avgSpeed = totalSpeed / particles.length;

    // using noise to make a virtual "wind", xy--- mimic  of nature wind
    let virtualWind = noise(deepTimeT * 50, frameCount * 0.01);

    // set the volum
    let ampBase = map(avgSpeed, 0.3, 0.6, 0.05, 0.15); //maping speed
    let targetVolume = ampBase * pow(virtualWind, 3) * 2;
    // using Power to strengthen the sudden wind
    //pow(n,e),（底数，指数）, virtualwind is 0-1, so only when wind ≈1, it has subcific effect 阵风效果

    //changing of Frequency
    // when speed is low, only low Hz could pass, while speed up to 1, high Hz can also pass
    let targetFreq = map(virtualWind, 0, 1, 200, 5500);

    //apply the virable effect
    noiseGen.amp(constrain(targetVolume, 0, 0.4), 0.05);
    filter.freq(targetFreq);

    // add resonance, when speed close to 1, it suddenly add to 15 模拟风啸叫
    filter.res(map(virtualWind, 0, 1, 1, 15));
  }

  if (!audioStarted) {
    //fill(0, 0, 100, 40);
    //textAlign(CENTER, CENTER);
    //text("click", width/2, height - 30);
  }
}

// mouse click to turn on sounds
function mousePressed() {
  if (!audioStarted) {
    userStartAudio();
    audioStarted = true;
  }
}

//***************************** points!↓ visual***********************

// clear the canvas, reset time, and restart ro draw the particles when the window is resized
function resetSketch() {
  clear();
  background(20, 30, 5);
  particles = [];
  deepTimeT = 0;
  for (let i = 0; i < maxParticles; i++) {
    particles.push(new Grain());
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  resetSketch();
}

//press keyboard "F" to the full screen
function keyPressed() {
  if (key === "f" || key === "F") {
    let fs = fullscreen();
    fullscreen(!fs);
    setTimeout(windowResized, 100);
  }
}

class Grain {
  constructor() {
    this.init();
  }

  init() {
    // particles randomlly placed in the canvas initically.
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = random(0.1, 0.8); // a very low speed

    // devided layers by Y
    this.layerId = floor(this.pos.y / 25);
    this.setLayerColor();
  }

  setLayerColor() {
    // brown and gold
    let h = map(this.layerId % 5, 0, 4, 20, 45);
    let s = random(30, 60);
    let b = random(20, 50);
    this.c = color(h, s, b, random(15, 40)); //****** tansparenty
  }

  follow(t) {
    // horizontal noise
    // X moves slightly and Y moves much larger to keep a generally horizontal movement

    let angle = noise(this.pos.x * 0.001, this.pos.y * 0.02, t) * TWO_PI * 4;
    let force = p5.Vector.fromAngle(angle);
    force.add(createVector(0.5, 0)); // move from left to right
    force.mult(0.1);
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    stroke(this.c);
    strokeWeight(0.8);
    point(this.pos.x, this.pos.y);
  }

  checkEdges() {
    // when the particle goes out of the right edge, it comes back to the left
    if (this.pos.x > width) {
      this.pos.x = 0;
      // Y generally keep the same, but a slightly shift. --to mimic the wind trace
      this.pos.y += random(-2, 2);
    }

    // to limit Y will not go out of the edges
    if (this.pos.y < 0 || this.pos.y > height) {
      this.pos.y = random(height);
    }
  }
}
