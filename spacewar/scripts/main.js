const canvas = document.querySelector('.canvas');
canvas.width = 900;
canvas.height = 700;
const ctx = canvas.getContext('2d');

resize();

// Functions to resize the game screen depending on size of screen
function resize() {
  const ratio = canvas.width / canvas.height;

  const height = window.innerHeight - 20;
  const width = height * ratio;

  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
}

// Main class of the game
class Spacewar {
  constructor() {
    this.width = canvas.width;
    this.height = canvas.height;
    this.settings = {
      fps: 1 / 60,
    };
  }
}

// const spacewar = new Spacewar();
// const spaceShip = new SpaceShip();

// spaceShip.drawShip();

// function start() {
//   setInterval(function () {
//     drawStuff();
//   }, (1 / 60) * 1000);
// }

// function drawStuff() {
//   const myImage = new Image();
//   myImage.src = 'images/enemy1.png';
//   ctx.drawImage(myImage, 50, 50, 40, 40);

//   const myImage2 = new Image();
//   myImage2.src = 'images/playerShip.png';
//   ctx.drawImage(myImage2, canvas.width / 2, canvas.height - 100, 60, 50);

//   const myImage4 = new Image();
//   myImage4.src = 'images/enemy4.png';
//   ctx.drawImage(myImage4, 350, 50, 40, 40);

//   const myImage7 = new Image();
//   myImage7.src = 'images/meteorBrown_med1.png';
//   ctx.drawImage(myImage7, 500, 400);
// }

// start();
