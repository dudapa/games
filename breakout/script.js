// Canvas
const canvas = document.querySelector('.canvas');
const width = (canvas.width = 800);
const height = (canvas.height = 600);
const ctx = canvas.getContext('2d');

// Rules
const showBtn = document.querySelector('.btn-rules');
const closeBtn = document.querySelector('.btn-close');
const rules = document.querySelector('.rules');

// Game Over
const gameOver = document.querySelector('.game-over');
let isGameRunning = true;

// Game win
const gameWin = document.querySelector('.game-win');
let breakBricksCount = 0;

// Play again
const playAgain = document.querySelector('.play-again');

// Time
let seconds = 0;
let tens = 0;
let secondsFormat = '00';
let tensFormat = '00';
let isSetInterval = false;
let interval;

// Ball object
const ball = {
  x: width / 2,
  y: height / 2,
  dx: 1,
  dy: -1,
  size: 10,
  speed: 3,
};

// Paddle object
const paddle = {
  width: 100,
  height: 10,
  x: width / 2 - 50,
  y: height - 20,
  dx: 0,
  speed: 10,
};

// Brick object
const brick = {
  width: 70,
  height: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

const brickRow = 5;
const brickColumn = 9;

// Create all bricks
const bricks = [];
for (let i = 0; i < brickRow; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumn; j++) {
    const x = brick.offsetX + (brick.width + brick.padding) * j;
    const y = brick.offsetY + (brick.height + brick.padding) * i;
    bricks[i][j] = { x, y, ...brick };
  }
}

// GAME LOOP
function gameLoop() {
  if (isGameRunning) {

    if(!isSetInterval){
      startTime()
      isSetInterval = true;
    }

    refresCanvas();
    drawStuff();
    collisions();
    moveStuff();
    requestAnimationFrame(gameLoop);
  }
}

// Draw all initial positions of stuff
drawStuff();

// ⇊ UNCOMMENT TO PLAY ⇊
//gameLoop();

// Canvas
function refresCanvas() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, width, height);
}

// Draw basic stuff
function drawStuff() {
  drawBall();
  drawPaddle();
  drawAllBricks();
  drawTime();
}

// Move stuff
function moveStuff() {
  moveBall();
  movePaddle();
}

// Check all collision
function collisions() {
  bottomCheck();
  checkWin();
  wallCollision();
  checkPaddleReflect();
  brickDestroyed();
}

// BALL FUNCTIONS

// Draw ball
function drawBall() {
  ctx.beginPath();
  ctx.fillStyle = '#f50a54';
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

// Move ball
function moveBall() {
  ball.x += ball.dx * ball.speed;
  ball.y += ball.dy * ball.speed;
}

// Walls collision
function wallCollision() {
  if (ball.y - ball.size < 0) {
    ball.dy *= -1;
  }
  if (ball.y + ball.size > height) {
    ball.dy *= -1;
  }
  if (ball.x - ball.size < 0) {
    ball.dx *= -1;
  }
  if (ball.x + ball.size > width) {
    ball.dx *= -1;
  }
}

// Paddle reflect
function checkPaddleReflect() {
  if (
    ball.x + ball.size > paddle.x &&
    ball.x - ball.size < paddle.x + paddle.width &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy *= -1;
  }
}

// Game over
function bottomCheck() {
  if (ball.y + ball.size > height) {
    isGameRunning = false;
    gameOver.classList.add('dead');
    playAgain.classList.add('dead');
    stopInterval();
  }
}

// Check if the player won
function checkWin() {
  if (breakBricksCount === brickColumn * brickRow) {
    isGameRunning = false;
    gameWin.classList.add('win');
    playAgain.classList.add('win');
    stopInterval();
  }
}

// PADDLE FUNCTIONS

// Draw paddle
function drawPaddle() {
  ctx.fillStyle = '#f50a54';
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

// Control paddle
function keyDown(e) {
  if (e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  }
  if (e.key === 'ArrowRight') {
    paddle.dx += paddle.speed;
  }
}

function keyUp(e) {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    paddle.dx = 0;
  }
}

// Move paddle
function movePaddle() {
  paddle.x += paddle.dx;

  if (paddle.x + paddle.width > width) {
    paddle.x = width - paddle.width;
  }
  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

// BRICK functions

// Draw all bricks
function drawAllBricks() {
  for (let i = 0; i < bricks.length; i++) {
    for (let j = 0; j < bricks[i].length; j++) {
      let brick = bricks[i][j];
      if (brick.visible) {
        drawBrick(brick);
      }
    }
  }
}

//  Check if some brick was destroyed
function brickDestroyed() {
  for (let i = 0; i < bricks.length; i++) {
    for (let j = 0; j < bricks[i].length; j++) {
      let brick = bricks[i][j];
      if (
        brick.visible &&
        brick.x < ball.x - ball.size &&
        brick.x + brick.width > ball.x + ball.size &&
        brick.y + brick.height > ball.y - ball.size &&
        brick.y < ball.y + ball.size
      ) {
        ball.dy *= -1;
        brick.visible = false;
        breakBricksCount++;
      }
    }
  }
}

// Draw brick
function drawBrick(brick) {
  ctx.fillStyle = '#f50a54';
  ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
}

// Show and close rules
function showRules() {
  rules.classList.add('show');
}

function closeRules() {
  rules.classList.remove('show');
}

function restart() {
  location.reload();
}

// TIME MEASUREMENT

function drawTime() {
  ctx.fillStyle = '#f50a54';
  ctx.font = '20px Open Sans';
  ctx.fillText(`${secondsFormat}:${tensFormat}`, width - 60, 20);
}

function runTime() {
  tens++;
  if (tens < 9) {
    tensFormat = '0' + tens;
  }
  if (tens > 9) {
    tensFormat = tens;
  }
  if (tens > 99) {
    seconds++;
    if (seconds <= 9) {
      secondsFormat = '0' + seconds;
    } else {
      secondsFormat = seconds;
    }
    tens = 0;
  }
}


function startTime(){
  interval = setInterval(runTime, 10);
}

function stopInterval(){
  clearInterval(interval);
  seconds = 0;
  tens = 0;
  secondsFormat = '00';
  tensFormat = '00';
}

// LISTENERS
showBtn.addEventListener('click', showRules);
closeBtn.addEventListener('click', closeRules);
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
playAgain.addEventListener('click', restart);
