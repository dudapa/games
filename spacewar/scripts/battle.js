class Battle {
  constructor(spacewar) {
    this.settings = spacewar.settings;
    this.areaOfMove = spacewar.areaOfMove;
    this.spaceShip = new SpaceShip();
    this.army = new Army();
    this.enemies = this.army.createArmy();
    this.directionOfEnemies = 1;
    this.enemiesGoingDown = false;
    this.horizontalMovingEnemies = 1;
    this.verticalMovingEnemies = 0;
    this.deep = 2000;
    this.currentDeep = 0;
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
      if (bullet.y < 0) {
        this.bullets.splice(i, 1);
      }
    }

    // Move enemy's army
    let enemyReachSide = false;
    for (let i = 0; i < this.enemies.length; i++) {
      let enemy = this.enemies[i];
      let newPosition =
        enemy.x +
        enemy.speed * this.directionOfEnemies * this.horizontalMovingEnemies;

      if (newPosition < leftRestriction || newPosition > rightRestriction) {
        this.directionOfEnemies *= -1;
        enemyReachSide = true;
        this.horizontalMovingEnemies = 0;
        this.verticalMovingEnemies = 1;
        this.enemiesGoingDown = true;
      }

      if (!enemyReachSide) {
        enemy.x = newPosition;
      }
    }

    if (this.enemiesGoingDown) {
      for (let i = 0; i < this.enemies.length; i++) {
        let enemy = this.enemies[i];
        enemy.y += enemy.speed;
        this.currentDeep += enemy.speed * this.verticalMovingEnemies;
        if (this.currentDeep > this.deep) {
          this.horizontalMovingEnemies = 1;
          this.verticalMovingEnemies = 0;
          this.enemiesGoingDown = false;
          this.currentDeep = 0;
        }
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
    for (let enemy of this.enemies) {
      enemy.draw();
    }
  }

  // Shoot bullets
  shoot() {
    if (
      this.lastBulletTime === null ||
      new Date().getTime() - this.lastBulletTime > this.settings.bulletFrequency
    ) {
      const x = this.spaceShip.x + this.spaceShip.shipSize / 2 - 7;
      const y = this.spaceShip.y - this.spaceShip.shipSize / 2;
      this.bullets.push(new PlayerBullet(x, y));
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
