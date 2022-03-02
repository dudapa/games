class SpaceShip {
    constructor() {
        this.sizeShip = 60;
        this.x = canvas.width / 2 - 30;
        this.y = canvas.height - 100;
        this.src = '../images/playerShip.png';
        this.speed = 1;
    }

    draw() {
        const image = new Image();
        image.src = this.src;
        ctx.drawImage(image, this.x, this.y, this.sizeShip, this.sizeShip);
    }
}