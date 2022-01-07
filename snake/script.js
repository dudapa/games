// canvas and context
const canvas = document.querySelector('.myCanvas');
const ctx = canvas.getContext('2d');


// playboard
const width = canvas.width = 600;
const height = canvas.height = 600;
const radius = 25


// grid
for (let i = radius; i <= width; i += 2 * radius) {
    for (let j = radius; j <= height; j += 2 * radius) {
    ctx.beginPath();
    ctx.arc(i, j, radius, 0, 2 * Math.PI);
    ctx.stroke();
    }
}