/*
TITLE
Graphics Programming - Coursework 1 submission 
Zinhle Maurice-Mopp  
Graded Assignment 2 - Asteroid Game Clone - asteroid.js file
210125870
April 2023 Session 
*/

/*

The commented labels describe the sections personally written to complete this assignment.
2: Marks the beginning and end of the code that I wrote.
*/

//2: Beginning of the code I wrote.
class AsteroidSystem 
{
  //Creates arrays to store each asteroid's data.
  constructor() {
    this.locations = new createVector(random(width), 0);
    this.velocities = new createVector(0, 0);
    this.accelerations = new createVector(0, random(0.1, 1));
    this.diams = random(30, 50);
  }

  run() {
    this.move();
    this.draw();
  }

  //Move all asteroids.
  move() {
    //Bounces back.
    this.velocities.add(this.accelerations);
    this.locations.add(this.velocities);
    this.accelerations.mult(0);

  //Deducts score if asteroids collide with Earth.
    if (this.locations.y + this.diams/2 > height) {
      game_score -= 1;
    }
  }

  //Draw all asteroids.
  draw() {
    noStroke();
    fill(200);
    ellipse(this.locations.x, this.locations.y, this.diams, this.diams);
  }
}
 //2: End of the code I wrote.