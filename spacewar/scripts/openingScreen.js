
class OpeningScreen {
    draw() {
        ctx.font = '80px Open Sans bold';
        ctx.fillStyle = '#ffc709';
        ctx.fillText('SPACE WAR', canvas.width / 2 - 200, 100);

        ctx.font = '30px Open Sans';
        ctx.fillStyle = '#ffc709';
        ctx.fillText(
          'Press \'Space\' to start the game...',
          canvas.width / 2 - 200,
          canvas.height / 2 + 300
        );

        ctx.font = '15px Open Sans';
        ctx.fillStyle = '#ffc709';
        ctx.fillText('CONTROL', 20, canvas.height - 80);
        ctx.fillText('move right: right arrow', 20, canvas.height - 60);
        ctx.fillText('move left: left arrow', 20, canvas.height - 40);
        ctx.fillText('fire: space', 20, canvas.height - 20);
    }
}