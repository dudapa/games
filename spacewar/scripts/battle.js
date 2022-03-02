class Battle {
    constructor(spacewar) {
        this.settings = spacewar.settings
        this.spaceShip = new SpaceShip();
    }

    update() {

    }
    
    draw(spacewar) {
        ctx.clearRect(0, 0, spacewar.width, spacewar.height);
        this.spaceShip.draw()
    } 
}


class ShowLevel {
    constructor(spacewar) {
        this.level = spacewar.level;
        this.sizeFont = 5;
    }

    draw(spacewar) {
        this.sizeFont += 0.7;
        if (this.sizeFont > 90 ) {
            spacewar.goToPosition(new Battle(spacewar));
        }
        ctx.clearRect(0, 0, spacewar.width, spacewar.height)
        ctx.font = `${this.sizeFont}px Open Sans bold`;
        ctx.fillStyle = '#ffc709';
        ctx.textAlign = 'center';
        ctx.fillText('Get ready for level 1', spacewar.width / 2, 100);

    }
}
