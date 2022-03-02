class Battle {
  constructor(spacewar) {
    this.settings = spacewar.settings;
    this.spaceShip = new SpaceShip();
    this.enemies = [];
    this.bullets = [];
  }

  update(spacewar) {
    const spaceShip = this.spaceShip;
    const spaceShipSpeed = spaceShip.speed;

    if (spacewar.pressedKeys['ArrowLeft']) {
      spaceShip.x -= spaceShipSpeed;
    }

    if (spacewar.pressedKeys['ArrowRight']) {
      spaceShip.x += spaceShipSpeed;
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
