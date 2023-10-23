const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Dot properties
const dot = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 5,
};

// Handle user input
const keys = {};

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// Update function
function update() {
  if (keys["ArrowUp"] && dot.y - dot.speed > 0) {
    dot.y -= dot.speed;
  }
  if (keys["ArrowDown"] && dot.y + dot.speed < canvas.height) {
    dot.y += dot.speed;
  }
  if (keys["ArrowLeft"] && dot.x - dot.speed > 0) {
    dot.x -= dot.speed;
  }
  if (keys["ArrowRight"] && dot.x + dot.speed < canvas.width) {
    dot.x += dot.speed;
  }
}

// Render function
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(dot.x - dot.size / 2, dot.y - dot.size / 2, dot.size, dot.size);
}

// Game loop
function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
