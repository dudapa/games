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

// motion variables
let velocityX = 1;
let velocityY = 0;
let snakeSpeed = 2 * radius;
const fps = 10;

// initial position
drawGrid(radius, width, height);
playerPosition(playerPositionX, playerPositionY);

// game loop function (main function)
function gameLoop() {
  drawGrid(radius, width, height);
  playerPosition(playerPositionX, playerPositionY);
  snakeMotion();
  checkOutPosition();
  setTimeout(gameLoop, 1000 / fps);
}

// gameLoop()

// playerMove function
function playerMove(event) {
  if (event.key === 'ArrowUp' || event.key === 'w') {
    velocityX = 0;
    velocityY = -1;
  }
  if (event.key === 'ArrowDown' || event.key === 's') {
    velocityX = 0;
    velocityY = 1;
  }
  if (event.key === 'ArrowLeft' || event.key === 'a') {
    velocityX = -1;
    velocityY = 0;
  }
  if (event.key === 'ArrowRight' || event.key === 'd') {
    velocityX = 1;
    velocityY = 0;
  }
}

// snake motion
function snakeMotion() {
  playerPositionX += snakeSpeed * velocityX;
  playerPositionY += snakeSpeed * velocityY;
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

// Check if the snake is out the playboard
function checkOutPosition() {
  if (playerPositionY > height) {
    playerPositionY = radius;
  }
  if (playerPositionY < 0) {
    playerPositionY = height - radius;
  }
  if (playerPositionX > width) {
    playerPositionX = radius;
  }
  if (playerPositionX < 0) {
    playerPositionX = width - radius;
  }
}

// Food

// Give random position of food
function randomPosition(){
  let span = width / (2 * radius);
return Math.floor(Math.random() * span) * (2 * radius) + 25; 
}

// Give a random number
function randomNumber() {
  return Math.floor(Math.random() * 256);
}

// Give a random color
function rundomColor(){
  return `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
}

