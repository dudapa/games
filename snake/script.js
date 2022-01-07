// listener
document.addEventListener('keydown', playerMove);


// canvas and context
const canvas = document.querySelector('.myCanvas');
const ctx = canvas.getContext('2d');


// playboard
const width = (canvas.width = 600);
const height = (canvas.height = 600);
const radius = 25;


// player
const initialPositionX = width / 2 - radius;
const initialPositionY = height / 2 + radius;
let playerPositionX = initialPositionX;
let playerPositionY = initialPositionY;


// move 
velocityX = 1
velocityY = 0


// grid
drawGrid(radius, width, height);
playerPosition(playerPositionX, playerPositionY);


// playerMove function
function playerMove(event) {
  if (event.key === 'ArrowUp' || event.key === 'w') {
    drawGrid(radius, width, height);
    playerPositionY -= 50;
    checkOutPosition();
    playerPosition(playerPositionX, playerPositionY);
  }
  if (event.key === 'ArrowDown' || event.key === 's') {
    drawGrid(radius, width, height);
    playerPositionY += 50;
    checkOutPosition();
    playerPosition(playerPositionX, playerPositionY);
  }
  if (event.key === 'ArrowLeft' || event.key === 'a') {
    drawGrid(radius, width, height);
    playerPositionX -= 50;
    checkOutPosition();
    playerPosition(playerPositionX, playerPositionY);
  }
  if (event.key === 'ArrowRight' || event.key === 'd') {
    drawGrid(radius, width, height);
    playerPositionX += 50;
    checkOutPosition();
    playerPosition(playerPositionX, playerPositionY);
  }
}


// snake motion
function snakeMotion(){
    
}


// draw grid
function drawGrid(radius, width, height) {
  drawBackground(width, height);
  for (let i = radius; i <= width; i += 2 * radius) {
    for (let j = radius; j <= height; j += 2 * radius) {
      ctx.beginPath();
      ctx.arc(i, j, radius, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
    }
  }
}


// draw background
function drawBackground(width, height) {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, width, height);
}


// player position
function playerPosition(x, y) {
  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
}


function checkOutPosition() {
  if (playerPositionY > height + radius) {
    playerPositionY = radius;
  }
  if (playerPositionY < -radius) {
    playerPositionY = height - radius;
  }
  if (playerPositionX > width + radius) {
    playerPositionX = radius;
  }
  if (playerPositionX < -radius) {
    playerPositionX = width - radius;
  }
}
