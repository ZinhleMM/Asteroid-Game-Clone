/*
TITLE
Graphics Programming - Coursework 1 submission 
Zinhle Maurice-Mopp  
Graded Assignment 2 - Asteroid Game Clone - bulletSystem.js file
210125870
April 2023 Session 
*/

/*

The commented labels describe the sections personally written to complete this assignment.
2: Marks the beginning and end of the code that I wrote.
*/

class BulletSystem {
  constructor() {
    this.bullets = [];
    this.velocity = new createVector(0, -5);
    this.diam = 10;
  }

  run() {
    this.move();
    this.draw();
    this.edges();
  }

  fire(x, y) {
    this.bullets.push(createVector(x, y));
  }

  //Draws all the bullets.
  draw() {
    fill(255);
    for (var i = 0; i < this.bullets.length; i++) {
      ellipse(this.bullets[i].x, this.bullets[i].y, this.diam, this.diam);
    }
  }

  //Updates the location of the all bullets.
  move() {
    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].y += this.velocity.y;
    }
  }

  //Checks if bullets leave the screen and removes them from the array.
  edges() {
   //2: Beginning of the code I wrote.
    for (var i = 0; i < this.bullets.length; i++) {
      if (this.bullets[i].y < 0) {
        this.bullets.splice(i, 1);
      }
    }
  }

  get diams() {
    return this.diam;
  }

  get getBullets() {
    return this.bullets;
  }
  //2: End of the code I wrote.
}
  