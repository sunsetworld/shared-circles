const socket = io();

let circles = [];

socket.on('circles', (data) => {
    circles = data;
});

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  noStroke();

  // Draw every shared circle
  for (const c of circles) {
    fill(c.color);
    circle(c.x, c.y, c.r * 2);
  }

  // Cursor: an outline that follows the mouse
  noFill();
  stroke(0);
  circle(mouseX, mouseY, 60);
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  socket.emit('click', { x: mouseX, y: mouseY });
}