class SpaceShip {
  constructor() {
    this.shipSize = 60;
    this.x = canvas.width / 2 - 30;
    this.y = canvas.height - 100;
    this.src = '../images/playerShip.png';
    this.speed = 7;
    this.shields = 2;
  }

  draw() {
    const image = new Image();
    image.src = this.src;
    ctx.drawImage(image, this.x, this.y, this.shipSize, this.shipSize);
  }
}

class Enemy {
  constructor(x, y, level) {
    this.enemySize = 40;
    this.x = x;
    this.y = y;
    this.level = level;
    this.src = `../images/enemy${this.level}.png`;
    this.speed = 1.5;
  }

  draw() {
    const image = new Image();
    image.src = this.src;
    ctx.drawImage(image, this.x, this.y, this.enemySize, this.enemySize);
  }
}

class Army {
  constructor(level) {
    this.level = level;
  }

  createArmy() {
    const rowCount = 4;
    const columnCount = 8;
    const army = [];
    let x = 100;
    let y = 100;
    for (let row = 0; row < rowCount; row++) {
      for (let column = 0; column < columnCount; column++) {
        const enemy = new Enemy(x, y, this.level);
        army.push(enemy);
        x += 70;
      }
      x = 100;
      y += 50;
    }
    return army;
  }
}

class PlayerBullet {
  constructor(x, y) {
    this.width = 15;
    this.height = 30;
    this.x = x;
    this.y = y;
    this.src = '../images/fire1.png';
    this.speed = 10;
  }

  draw() {
    const image = new Image();
    image.src = this.src;
    ctx.drawImage(image, this.x, this.y, this.width, this.height);
  }
}

class EnemyBullet {
  constructor(x, y, level) {
    this.level = level;
    this.width = 15;
    this.height = this.level <= 4 ? 30 : 60;
    this.x = x;
    this.y = y;
    this.src = this.level <= 4 ? '../images/fire2.png' : '../images/fire3.png';
    this.speed = 10;
  }

  draw() {
    const image = new Image();
    image.src = this.src;
    ctx.drawImage(image, this.x, this.y, this.width, this.height);
  }
}

class BigMeteor {
  constructor(x, y) {
    this.meteorSize = 100;
    this.x = x;
    this.y = y;
    this.src = '../images/meteorBrown_big1.png';
    this.speed = 3;
    this.lives = 3;
    this.notation = 'big';
  }

  draw() {
    const image = new Image();
    image.src = this.src;
    ctx.drawImage(image, this.x, this.y, this.meteorSize, this.meteorSize);
  }
}

class SmallMeteor {
  constructor(x, y) {
    this.meteorSize = 50;
    this.x = x;
    this.y = y;
    this.src = '../images/meteorBrown_med1.png';
    this.speed = 3;
    this.lives = 1;
    this.notation = 'small';
  }

  draw() {
    const image = new Image();
    image.src = this.src;
    ctx.drawImage(image, this.x, this.y, this.meteorSize, this.meteorSize);
  }
}
