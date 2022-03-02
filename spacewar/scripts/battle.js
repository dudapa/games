class Battle {
  constructor(spacewar) {
    this.settings = spacewar.settings;
    this.areaOfMove = spacewar.areaOfMove;
    this.spaceShip = new SpaceShip();
    this.enemy = new Enemy();
    this.enemies = [];
    this.asteroids = [];
    this.bullets = [];
    this.lastBulletTime = null;
  }

  // update method
  update(spacewar) {
    const spaceShip = this.spaceShip;
    const spaceShipSpeed = spaceShip.speed;

    const leftRestriction = this.areaOfMove.horizontal;
    const rightRestriction =
      spacewar.width - this.areaOfMove.horizontal - spaceShip.shipSize;

    // Move with the spaceship
    if (spacewar.pressedKeys['ArrowLeft']) {
      spaceShip.x -= spaceShipSpeed;
    }

    if (spacewar.pressedKeys['ArrowRight']) {
      spaceShip.x += spaceShipSpeed;
    }

    // Check if the spaceship is after area of move
    if (spaceShip.x < leftRestriction) {
      spaceShip.x = leftRestriction;
    }

    if (spaceShip.x > rightRestriction) {
      spaceShip.x = rightRestriction;
    }

    // Check if the player is shooting
    if (spacewar.pressedKeys[' ']) {
      this.shoot();
    }

    // Move bullets
    for (let i = 0; i < this.bullets.length; i++) {
      const bullet = this.bullets[i];
      bullet.y -= bullet.speed;
      console.log(this.bullets);
      if (bullet.y < 0) {
        this.bullets.splice(i, 1);
      }
    }
  }

  // draw method
  draw(spacewar) {
    ctx.clearRect(0, 0, spacewar.width, spacewar.height);

    // Draw the spaceship
    this.spaceShip.draw();

    // Draw bullets
    for (let bullet of this.bullets) {
      bullet.draw();
    }

    // Draw enemies
    this.enemy.draw();
  }

  // Shoot bullets
  shoot() {
    if (
      this.lastBulletTime === null ||
      new Date().getTime() - this.lastBulletTime > this.settings.bulletFrequency
    ) {
      const x = this.spaceShip.x + this.spaceShip.shipSize / 2 - 7;
      const y = this.spaceShip.y - this.spaceShip.shipSize / 2;
      this.bullets.push(new playerBullet(x, y));
      this.lastBulletTime = new Date().getTime();
    }
  }
}

// Display actual level of the game on the screen
class ShowLevel {
  constructor(spacewar) {
    this.level = spacewar.level;
    this.sizeFont = 5;
  }

  draw(spacewar) {
    this.sizeFont += 0.7;
    if (this.sizeFont > 90) {
      spacewar.goToPosition(new Battle(spacewar));
    }
    ctx.clearRect(0, 0, spacewar.width, spacewar.height);
    ctx.font = `${this.sizeFont}px Open Sans bold`;
    ctx.fillStyle = '#ffc709';
    ctx.textAlign = 'center';
    ctx.fillText('Get ready for level 1', spacewar.width / 2, 100);
  }
}
