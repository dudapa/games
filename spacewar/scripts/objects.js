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
    constructor(x, y) {
        this.enemySize = 40;
        this.x = x;
        this.y = y;
        this.src = '../images/enemy1.png';
        this.speed = 1.5; 
    }

    draw() {
        const image = new Image();
        image.src = this.src;
        ctx.drawImage(image, this.x, this.y, this.enemySize, this.enemySize)
    }

}

class Army {
    constructor() { 
    }

    createArmy() {
        const rowCount = 4;
        const columnCount = 8;
        const army = [];
        let x = 100;
        let y = 100; 
        for(let row = 0; row < rowCount; row++) {
            for(let column = 0; column < columnCount; column++){
                const enemy = new Enemy(x, y);
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