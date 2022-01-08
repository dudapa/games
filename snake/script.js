// Listener
document.addEventListener('keydown', playerMove);

// Score
let score = document.querySelector('.score');

// Canvas and context
const canvas = document.querySelector('.myCanvas');
const ctx = canvas.getContext('2d');

// Playboard
const width = (canvas.width = 600);
const height = (canvas.height = 600);
const radius = 25;

// Player
const initialPositionX = width / 2 - radius;
const initialPositionY = height / 2 + radius;
let playerPositionX = initialPositionX;
let playerPositionY = initialPositionY;
let playerColor = 'black';
let playerScore = 0;
let lastPositionPlayer = { x: playerPositionX, y: playerPositionY };
let tail = [];

// Food
let foodPositionX = randomPosition();
let foodPositionY = randomPosition();
let foodColor = randomColor();

// Motion variables
let velocityX = 1;
let velocityY = 0;
let snakeSpeed = 2 * radius;
const fps = 10;

// Initial positions
drawGrid(radius, width, height);
drawPlayerPosition(playerPositionX, playerPositionY);
makeFood(foodPositionX, foodPositionY, foodColor);

// Game loop function (main function)
function gameLoop() {
  drawGrid(radius, width, height);
  changeLastPosition();
  snakeMotion();
  drawPlayerPosition(playerPositionX, playerPositionY);
  eatFood();
  makeFood(foodPositionX, foodPositionY, foodColor);
  addLastPositionToTail(lastPositionPlayer)
  drawTail();
  checkOutPosition();
  setTimeout(gameLoop, 1000 / fps);
}

// gameLoop()

// PlayerMove function
function playerMove(event) {
  if (event.key === 'ArrowUp' || event.key === 'w') {
    if (velocityY !== 1) {
      velocityX = 0;
      velocityY = -1;
    }
  }
  if (event.key === 'ArrowDown' || event.key === 's') {
    if (velocityY !== -1) {
      velocityX = 0;
      velocityY = 1;
    }
  }
  if (event.key === 'ArrowLeft' || event.key === 'a') {
    if (velocityX !== 1) {
      velocityX = -1;
      velocityY = 0;
    }
  }
  if (event.key === 'ArrowRight' || event.key === 'd') {
    if (velocityX !== -1) {
      velocityX = 1;
      velocityY = 0;
    }
  }
}

// Change last position of player
function changeLastPosition() {
  lastPositionPlayer.x = playerPositionX;
  lastPositionPlayer.y = playerPositionY;
}

// Snake motion
function snakeMotion() {
  playerPositionX += snakeSpeed * velocityX;
  playerPositionY += snakeSpeed * velocityY;
}

// Draw grid
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

// Draw background
function drawBackground(width, height) {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, width, height);
}

// Player position
function drawPlayerPosition(x, y) {
  ctx.fillStyle = playerColor;
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
function randomPosition() {
  let span = width / (2 * radius);
  return Math.floor(Math.random() * span) * (2 * radius) + 25;
}

// Make food and place it on the playboard
function makeFood(x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
}

// Check if the food is eatened, if so then make a new food
function eatFood() {
  if (playerPositionX === foodPositionX && playerPositionY === foodPositionY) {
    addToTail(foodPositionX, foodPositionY, foodColor); // Add a eaten food to the tail
    foodPositionX = randomPosition(); // Give a new x position
    foodPositionY = randomPosition(); // Give a new y position
    foodColor = randomColor(); // Give a new color
    playerScore += 1;
    score.innerHTML = `Score: ${playerScore}`;
  }
}

function addLastPositionToTail(lastPosition) {
  if (tail.length === 1) {
    tail[0].x = lastPosition.x;
    tail[0].y = lastPosition.y;
  }
  if (tail.length > 1) {
    tempX = tail[0].x;
    tempY = tail[0].y;
    tail[0].x = lastPosition.x;
    tail[0].y = lastPosition.y;

    for (let i = 1; i < tail.length; i++) {
      tempAfterX = tail[i].x;
      tempAfterY = tail[i].y;
      tail[i].x = tempX;
      tail[i].y = tempY;
      tempX = tempAfterX;
      tempY = tempAfterY;
    }
  }
}

// Give a random number
function randomNumber() {
  return Math.floor(Math.random() * 256);
}

// Give a random color
function randomColor() {
  return `rgb(${randomNumber()}, ${randomNumber()}, ${randomNumber()})`;
}

// Tail
function addToTail(positionX, positionY, color) {
  const pieceOfTail = {
    x: positionX,
    y: positionY,
    color: color,
  };
  tail.push(pieceOfTail);
}

// Draw tail
function drawTail() {
  tail.forEach(function (ele) {
    ctx.fillStyle = 'grey';
    ctx.beginPath();
    ctx.arc(ele.x, ele.y, radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  });
}
