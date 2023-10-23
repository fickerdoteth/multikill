const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 1080;
canvas.height = 720;

// Dot properties
const dot = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 5,
};

// Enemy block properties
const enemy = {
  x: 0,
  y: Math.random() * canvas.height, // Random initial Y position
  size: 20,
  speed: 2 + Math.random() * 2, // Random speed
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
  // Move the enemy block from left to right
  enemy.x += enemy.speed;

  // If the enemy block goes off the screen, reset its position
  if (enemy.x > canvas.width + enemy.size) {
    enemy.x = -enemy.size;
    enemy.y = Math.random() * canvas.height;
    enemy.speed = 2 + Math.random() * 2;
  }

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

  // Draw enemy block
  ctx.fillStyle = "white";
  ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);

  // Draw player's dot
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
