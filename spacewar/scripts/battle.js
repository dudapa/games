class Battle {
  constructor(spacewar) {
    this.settings = spacewar.settings;
    this.areaOfMove = spacewar.areaOfMove;
    this.spaceShip = new SpaceShip();
    this.enemies = [];
    this.bullets = [];
  }

  update(spacewar) {
    const spaceShip = this.spaceShip;
    const spaceShipSpeed = spaceShip.speed;
    const leftRestriction = this.areaOfMove.horizontal;
    const rightRestriction =
      spacewar.width - this.areaOfMove.horizontal - spaceShip.sizeShip;

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

    
  }

  draw(spacewar) {
    ctx.clearRect(0, 0, spacewar.width, spacewar.height);
    this.spaceShip.draw();
  }
}

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
