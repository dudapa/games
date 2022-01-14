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
  speed: 2,
};


// CANVAS FUNCTIONS
function refresCanvas(){
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);
}

// BALL FUNCTIONS   

// Draw ball 
function drawBall(){
    ctx.beginPath();
    ctx.fillStyle = '#f50a54';
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}
drawBall()

// Move ball
function moveBall(){
    ball.x += ball.dx * ball.speed;
    ball.y += ball.dy * ball.speed; 
}

// Walls collision
function wallCollision(){
    if(ball.y - ball.size < 0){
        ball.dy *= -1 
    }
    if(ball.y + ball.size > height){
        ball.dy *= -1 
    }
    if(ball.x - ball.size < 0){
        ball.dx *= -1 
    }
    if(ball.x + ball.size > width){
        ball.dx *= -1 
    }
}

// GAME LOOP

function gameLoop(){
    refresCanvas()
    drawBall();
    moveBall();
    wallCollision()

    requestAnimationFrame(gameLoop);
}

//gameLoop()

// Show and close rules
function showRules(){
    rules.classList.add('show');
}

function closeRules(){
    rules.classList.remove('show')
}



// Listeners
showBtn.addEventListener('click', showRules)
closeBtn.addEventListener('click', closeRules)