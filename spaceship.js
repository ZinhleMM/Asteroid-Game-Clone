/*
TITLE
Graphics Programming - Coursework 1 submission 
Zinhle Maurice-Mopp  
Graded Assignment 2 - Asteroid Game Clone - spaceship.js file
210125870
April 2023 Session 
*/

/*

The commented labels describe the sections personally written to complete this assignment.
2: Marks the beginning and end of the code that I wrote.
*/

class Spaceship 
{
  constructor() {
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width / 2, height / 2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 50;
  }

  run() {
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }

  draw() {
    fill(125);
    triangle(
      this.location.x - this.size / 2,
      this.location.y + this.size / 2,
      this.location.x + this.size / 2,
      this.location.y + this.size / 2,
      this.location.x,
      this.location.y - this.size / 2
    );
  }

  move() {
    //2: Beginning of the code I wrote.
    //Apply for movement behaviour. 
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    this.velocity.limit(3);
    //2: End of the code I wrote.
  }

  applyForce(f) {
    this.acceleration.add(f);
  }
  //Define forces for movement when arrows are pressed. 
  interaction() {
    if (keyIsDown(LEFT_ARROW)) {
      this.applyForce(createVector(-0.1, 0));
    }
    if (keyIsDown(RIGHT_ARROW)) {
      //2: Beginning of the code I wrote.
      this.applyForce(createVector(+0.1, 0));
      //2: End of the code I wrote.
    }
    if (keyIsDown(UP_ARROW)) {
      //2: Beginning of the code I wrote.
      this.applyForce(createVector(0, -0.1));
      //2: End of the code I wrote.
    }
    if (keyIsDown(DOWN_ARROW)) {
      //2: Beginning of the code I wrote.
      this.applyForce(createVector(0, +0.1));
      //2: End of the code I wrote.
    }
  }

  fire() {
    this.bulletSys.fire(this.location.x, this.location.y);
    }

  edges() {
    if (this.location.x < 0) this.location.x = width;
    else if (this.location.x > width) this.location.x = 0;
    else if (this.location.y < 0) this.location.y = height;
    else if (this.location.y > height) this.location.y = 0;
  }

  setNearEarth() {
    //2: Beginning of the code I wrote.
    //Define the frictional force in the atmosphere. 
    this.applyForce(createVector(0, +0.05));
    const friction = this.velocity.copy();
    friction.mult(-0.03);
    this.applyForce(friction);
  }
  
  //Associates various object properties to the function that need them. 
  get Location() {
    return this.location;
  }

  get Size() {
    return this.size / 2;
  }

  get bulletSystem() {
    return this.bulletSys;
  }
  //2: End of the code I wrote.
}
