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
    ball.x + ball.size > paddle.x &&
    ball.x - ball.size < paddle.x + paddle.width &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy *= -1;
  }
}

// Game overe 
function gameOver(){
  if(ball.y + ball.size > height){
    location.reload();
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

drawAllBricks();

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
      }
    }
  }
}

// Draw brick
function drawBrick(brick) {
  ctx.fillStyle = '#f50a54';
  ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
}

// GAME LOOP

function gameLoop() {
  refresCanvas();
  drawBall();
  moveBall();
  wallCollision();
  drawPaddle();
  movePaddle();
  checkPaddleReflect();
  brickDestroyed();
  drawAllBricks();
  gameOver()

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
