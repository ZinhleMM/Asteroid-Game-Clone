/*
TITLE
Graphics Programming - Coursework 1 submission 
Zinhle Maurice-Mopp  
Graded Assignment 2 - Asteroid Game Clone - sketch.js file
210125870
April 2023 Session 
*/

/*

The commented labels describe the sections personally written to complete this assignment.
2: Marks the beginning and end of the code that I wrote.
*/

var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];

//2: Beginning of the code I wrote.
var lives;
var game_score;
var is_inside = false;
var asteroidEarthCollisionSound;
var asteroidExplosionSound;
var asteroidSpaceshipCollisionSound;
var bulletFiringSound;
var gameMusic; 
var gameOverSound;

//Sound assets loaded and set for each use. 
function preload() {
    soundFormats('mp3','wav'); 
    
    asteroidEarthCollisionSound = loadSound('assets/asteroidEarthCollisionSound.mp3');
    asteroidEarthCollisionSound.setVolume(0.3);
    
    asteroidExplosionSound = loadSound('assets/asteroidExplosionSound.wav');
    asteroidExplosionSound.setVolume(0.3);
    
    asteroidSpaceshipCollisionSound = loadSound('assets/asteroidSpaceshipCollisionSound.wav');
    asteroidSpaceshipCollisionSound.setVolume(0.8);
    
    bulletFiringSound = loadSound('assets/bulletFiringSound.wav');
    bulletFiringSound.setVolume(0.3);
    
    gameMusic = loadSound('assets/gameMusic.wav'); 
    gameMusic.setVolume(0.1);
    
    gameOverSound = loadSound('assets/gameOverSound.wav');
    gameOverSound.setVolume(0.8);
}
//2: End of the code I wrote.

function setup() {
  createCanvas(1200, 800);
  
  //2: Beginning of the code I wrote.
  //Calls start game function. 
  startGame();
  //2: End of the code I wrote. 

  //Defines the location and size of Earth and the atmosphere.
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();
  atmosphereLoc = new createVector(width/2, height * 2.9);
  atmosphereSize = new createVector(width * 3, width * 3);
  earthLoc = new createVector(width/2, height * 3.1);
  earthSize = new createVector(width * 3, width * 3);
}

//2: Beginning of the code I wrote.
//Defines start game function. 
function startGame() {
  gameMusic.loop();
  lives = 5;
  game_score = 0; 
}
//2: End of the code I wrote. 

function draw() {
  //Draws the background and sky. 
  background(0);
  sky();

  spaceship.run();
  asteroids.run();

  drawEarth();

  //2: Beginning of the code I wrote.
  //Draws game score and lives.    
  fill(255);
  textSize(25);
  text("score: " + game_score, 100, 40);
  text("lives: " , 800, 40);
    
  for (var i = 0; i < lives; i++) {
    drawLives(90, i, 45);
  } 
  checkCollisions(spaceship, asteroids);  
}

function drawLives(x, con, y) {
 fill(255, 0 ,0);
    
 beginShape();
    
 vertex(x * 10 + con * 20, y + 3);
 bezierVertex(x * 10 + con * 20, y - 7,(x * 10 + con * 20) + 15, y - 12, (x * 10 + con * 20) + 15, y - 17);
 bezierVertex((x * 10 + con * 20) + 15, y - 22, (x * 10 + con * 20) + 3, y - 27, x * 10 + con * 20, y - 18);
 bezierVertex((x * 10 + con * 20) - 5,y - 27,(x * 10 + con * 20) -  15, y - 22, (x * 10 + con * 20) - 15, y - 17);
 bezierVertex((x * 10 + con * 20) - 15, y -12, x * 10 + con * 20, y - 7,x * 10 + con * 20, y + 3);
    
 endShape();
}
 //2: End of the code I wrote.

//Draws the Earth and atmosphere. 
function drawEarth() {
  noStroke();
  
  fill(0, 10, 255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x, atmosphereSize.y);
  
  fill(100, 255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//Spaceship and asteroids collisions. 
function checkCollisions(spaceship, asteroids) {

  //2: Beginning of the code I wrote.
  for (var i = 0; i < asteroids.getLocation.length; i++) {
    if (isInside(asteroids.getLocation[i], asteroids.getDiams[i], spaceship.Location, spaceship.Size)) 
    {
      asteroids.destroy(i);
      lives -= 1; 
      if(lives < 1) {
        gameOver();
      }
      asteroidSpaceshipCollisionSound.play();  
    }
  }

  for (var i = 0; i < asteroids.getLocation.length; i++) {
    if (isInside(asteroids.getLocation[i], asteroids.getDiams[i], earthLoc, earthSize.y)) {
      asteroids.destroy(i);
      game_score -= 1; 
      if(game_score == -5) {
        gameOver();
      }
      asteroidEarthCollisionSound.play();
    }
  }

  if (isInside(spaceship.Location, spaceship.Size, earthLoc, earthSize.y)) {
    gameOver();  
  }

  if (isInside(spaceship.Location, spaceship.Size, atmosphereLoc, atmosphereSize.y)) {
    spaceship.setNearEarth();
  }

  //Bullet collisions. 
  for (var j = 0; j < spaceship.bulletSystem.getBullets.length; j++) {
    let bulletLoc = spaceship.bulletSystem.getBullets[j];
    let bulletSize = spaceship.bulletSystem.diams;

    for (var i = 0; i < asteroids.getLocation.length; i++) {
      if (
        isInside(
          asteroids.getLocation[i],
          asteroids.getDiams[i],
          bulletLoc,
          bulletSize
        )
      ) {
        asteroids.destroy(i); 
          game_score += 5;
          if(game_score == 30) {
                gameWon();
            }
        asteroidExplosionSound.play();
      }
    }
  }
  //2: End of the code I wrote.
}

//////////////////////////////////////////////////
//Helper function checking if there's collision between object A and object B.
function isInside(locA, sizeA, locB, sizeB) {

  //2: Beginning of the code I wrote.
  let distance = dist(locA.x, locA.y, locB.x, locB.y);

  if (distance < sizeA / 2 + sizeB / 2) {
    return true;
  }
  return false;
  //2: End of the code I wrote.
}

//////////////////////////////////////////////////
//Bullet firing with sound when space bar is pressed. 
function keyPressed() {
  if (keyIsPressed && keyCode == 32) {
    spaceship.fire();
    //2: Beginning of the code I wrote.
    bulletFiringSound.play();
    //2: End of the code I wrote.
  }
}

//Spaceship movements when arrows are pressed. 
//2: Beginning of the code I wrote.
function keyReleased() {
	switch(keyCode) {
    case LEFT_ARROW:
      kleft = false;
      break;
    case RIGHT_ARROW:
      kright = false;
      break;
    case UP_ARROW:
      kup = false;
      break;
  }
}
//2: End of the code I wrote.

//////////////////////////////////////////////////
//Function that ends the game by stopping the loops and displaying "Game Over" with sound.
function gameOver() {
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width / 2, height / 2);
  //2: Beginning of the code I wrote.
  gameMusic.stop();
  gameOverSound.play();
   //2: End of the code I wrote.
   noLoop();
}

//2: Beginning of the code I wrote.
//Game won text and stop game music. 
function gameWon() {
 gameMusic.stop(); 
 fill(
  random(0, 255,0), 
  random(255, 165, 0), 
  random(124,252,0)
 );
 textSize(50);
 textAlign(CENTER); text("Congratulations! You have won!", width / 2 , height / 2 );
 noLoop();        
}
//2: End of the code I wrote.

//////////////////////////////////////////////////
//Function that creates a star lit sky.
function sky() {
  push();
  while (starLocs.length < 300) {
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i = 0; i < starLocs.length; i++) {
    rect(starLocs[i].x, starLocs[i].y, 2, 2);
  }

  if (random(1) < 0.3) starLocs.splice(int(random(starLocs.length)), 1);
  pop();
}
