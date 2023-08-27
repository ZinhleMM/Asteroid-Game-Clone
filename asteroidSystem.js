/*
TITLE
Graphics Programming - Coursework 1 submission 
Zinhle Maurice-Mopp  
Graded Assignment 2 - Asteroid Game Clone - asteroidSystem.js file
210125870
April 2023 Session 
*/

/*

The commented labels describe the sections personally written to complete this assignment.
2: Marks the beginning and end of the code that I wrote.
*/

class AsteroidSystem {
  //Creates arrays to store each asteroid's data.
  constructor() {
    this.locations = [];
    this.velocities = [];
    this.accelerations = [];
    this.diams = [];
  }

  run() {
    this.spawn();
    this.move();
    this.draw();
  }

  //Spawns the asteroid at random intervals.
  spawn() {
    if (random(1) < 0.01) {
      this.accelerations.push(new createVector(0, random(0.1, 1)));
      this.velocities.push(new createVector(0, 0));
      ///List of all the asteriods.
      this.locations.push(new createVector(random(width), 0)); 
      this.diams.push(random(30, 50));
    }
  }

  //Moves all the asteroids.
  move() {
    for (var i = 0; i < this.locations.length; i++) {
      this.velocities[i].add(this.accelerations[i]);
      this.locations[i].add(this.velocities[i]);
      this.accelerations[i].mult(0);
    }
  }

  applyForce(f) {
    for (var i = 0; i < this.locations.length; i++) {
      this.accelerations[i].add(f);
    }
  }

  //Draws all the asteroids.
  draw() {
    noStroke();
    fill(200);
    for (var i = 0; i < this.locations.length; i++) {
      ellipse(
        this.locations[i].x,
        this.locations[i].y,
        this.diams[i],
        this.diams[i]
      );
    }
  }

  //Function that calculates effect of gravity on each asteroid and accelerates it.
  calcGravity(centerOfMass) {
    for (var i = 0; i < this.locations.length; i++) {
      var gravity = p5.Vector.sub(centerOfMass, this.locations[i]);
      gravity.normalize();
      gravity.mult(0.001);
      this.applyForce(gravity);
    }
  }

  //Destroys all the data associated with each asteroid.
  destroy(index) {
    this.locations.splice(index, 1);
    this.velocities.splice(index, 1);
    this.accelerations.splice(index, 1);
    this.diams.splice(index, 1);
  }
  
  //Associates various object properties to the function that need them. 
  //2: Beginning of the code I wrote.
  get getAccelerations() {
    return this.accelerations;
  }

  get getDiams() {
    return this.diams;
  }

  get getLocation() {
    return this.locations;
  }
}
  //2: End of the code I wrote.