class ShowLevel {
    constructor(spacewar) {
        this.level = spacewar.level;
        this.sizeFont = 5;
    }

    draw(spacewar) {
        this.sizeFont += 1;
        if (this.sizeFont > 70 ) {
            console.log(`Game has started`);
            spacewar.goToPosition(new Battle(spacewar))
        }
        ctx.clearRect(0, 0, spacewar.width, spacewar.height)
        ctx.font = `${this.sizeFont}px Open Sans bold`;
        ctx.fillStyle = '#ffc709';
        ctx.textAlign = 'center';
        ctx.fillText('Get ready for level 1', spacewar.width / 2, 100);
    }
}


class Battle {
    draw(spacewar) {
        ctx.clearRect(0, 0, spacewar.width, spacewar.height);
        ctx.font = `${70}px Open Sans bold`;
        ctx.fillStyle = '#ffc709';
        ctx.textAlign = 'center';
        ctx.fillText('I am in the battle', spacewar.width / 2, 100);
    } 
}