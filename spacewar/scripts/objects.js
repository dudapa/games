class SpaceShip {
    constructor() {
        this.shipSize = 60;
        this.x = canvas.width / 2 - 30;
        this.y = canvas.height - 100;
        this.src = '../images/playerShip.png';
        this.speed = 7;
    }

    draw() {
        const image = new Image();
        image.src = this.src;
        ctx.drawImage(image, this.x, this.y, this.shipSize, this.shipSize);
    }
}


class Enemy {
    constructor() {
        this.enemySize = 40;
        this.x = 200;
        this.y = 300;
        this.src = '../images/enemy1.png';
        this.speed = 5; 
    }

    draw() {
        const image = new Image();
        image.src = this.src;
        ctx.drawImage(image, this.x, this.y, this.enemySize, this.enemySize)
    }
}

class playerBullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.src = '../images/fire1.png';
        this.speed = 10;
        }

    draw() {
        const image = new Image();
        image.src = this.src;
        ctx.drawImage(image, this.x, this.y)
    }
}