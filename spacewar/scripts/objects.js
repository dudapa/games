class SpaceShip {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.sizeShip = 100;
        this.src = '../images/playerShip.png';
    }

    drawShip() {
        const image = new Image();
        image.src = this.src;
        ctx.drawImage(image, this.x, this.y, this.sizeShip, this.size);
        console.log('I drew a ship')
    }
}