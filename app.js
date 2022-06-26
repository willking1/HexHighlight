const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let pointerX;
let pointerY;
document.onmousemove = function(event) {
	pointerX = event.pageX-canvas.offsetLeft;
	pointerY = event.pageY-canvas.offsetTop;
}

let cMin = 0;
let cMax = 255;
let r = cMax;
let g = cMin;
let b = cMin;
let decRed = false;
let decGreen = false;
let decBlue = false;
let incRed = false;
let incGreen = false;
let incBlue = false;
const a = 2 * Math.PI / 6;
const R = 50;

function setup() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

setup();
let id = setInterval(animate);

function animate() {

    // 1 - draw background
    // 2 - draw mouse colors
    // 3 - draw hexes

    //background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //mouse color
    let color = r + ',' + g + ',' + b;
    ctx.fillStyle = "rgba(" + color + ", 1)";
    ctx.beginPath();
    ctx.arc(pointerX, pointerY, 100, 0, 2*Math.PI);
    ctx.fill();
    changeColor();

    //hex - code from https://eperezcosano.github.io/hex-grid/
    ctx.strokeStyle = "white";
    ctx.lineWidth = 3;
    drawGrid(canvas.width, canvas.height);
}



function drawGrid(width, height) {
  for (let y = 50; y + 50 * Math.sin(a) < height; y += 50 * Math.sin(a)) {
    for (let x = 50, j = 0; x + 50 * (1 + Math.cos(a)) < width; x += 50 * (1 + Math.cos(a)), y += (-1) ** j++ * 50 * Math.sin(a)) {
      drawHexagon(x, y);
    }
  }
}

function drawHexagon(x, y) {
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      ctx.lineTo(x + 50 * Math.cos(a * i), y + 50 * Math.sin(a * i));
    }
    ctx.closePath();
    ctx.stroke();
  }

function changeColor() {
    if(r == cMax && b == cMin) {
        incGreen = true;
        decBlue = false;
      }
      if(r == cMax && g == cMax) {
        decRed = true;
        incGreen = false;
      }
      if(g == cMax && r == cMin) {
        decRed = false;
        incBlue = true;
      }
      if(g == cMax && b == cMax) {
        incBlue = false;
        decGreen = true;
      }
      if(g == cMin && b == cMax) {
        decGreen = false;
        incRed = true;
      }
      if(r == cMax && b == cMax) {
        incRed = false;
        decBlue = true;
      }
    
      if(incRed && r < cMax) {
        r++;
      }
      if(incGreen && g < cMax) {
        g++;
      }
      if(incBlue && b < cMax) {
        b++;
      }
    
      if(decRed && r > cMin) {
        r--;
      }
      if(decGreen && g > cMin) {
        g--;
      }
      if(decBlue && b > cMin) {
        b--;
      }
}