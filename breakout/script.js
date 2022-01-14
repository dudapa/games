// Canvas
const canvas = document.querySelector('.canvas');
const width = (canvas.width = 800);
const height = (canvas.height = 600);
const ctx = canvas.getContext('2d');

// Rules
const showBtn = document.querySelector('.btn-rules');
const closeBtn = document.querySelector('.btn-close');
const rules = document.querySelector('.rules');

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
    x: 20,
    y: 20,
    width: 70,
    height: 10,
    padding: 5,
    offset: 20,
    visible: true
}

// CANVAS FUNCTIONS
function refresCanvas() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, width, height);
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
drawBall();

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
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.width &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy *= -1; 
  }
}

// PADDLE FUNCTIONS

// Draw paddle
function drawPaddle() {
  ctx.fillStyle = '#f50a54';
  ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

drawPaddle();

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

// Draw brick 
function drawBrick(){
    ctx.fillStyle = '#f50a54';
    ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
}

drawBrick()

// GAME LOOP

function gameLoop() {
  refresCanvas();
  drawBall();
  moveBall();
  wallCollision();
  drawPaddle();
  movePaddle();
  checkPaddleReflect();

  requestAnimationFrame(gameLoop);
}

// gameLoop();

// Show and close rules
function showRules() {
  rules.classList.add('show');
}

function closeRules() {
  rules.classList.remove('show');
}

// LISTENERS
showBtn.addEventListener('click', showRules);
closeBtn.addEventListener('click', closeRules);
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
