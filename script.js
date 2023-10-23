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

// Game state
let isGameOver = false;

// Handle user input
const keys = {};

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;

  if (isGameOver && (e.key === "Enter" || e.key === " ") && !keys[e.key]) {
    // Restart the game
    restartGame();
  }
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// Function to restart the game
function restartGame() {
  isGameOver = false;

  // Reset dot position
  dot.x = canvas.width / 2;
  dot.y = canvas.height / 2;
}

// Update function
function update() {
  if (!isGameOver) {
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
}

// Render function
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player's dot
  ctx.fillStyle = "white";
  ctx.fillRect(dot.x - dot.size / 2, dot.y - dot.size / 2, dot.size, dot.size);

  if (isGameOver) {
    // Game over screen
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over! Press Enter or Space to Restart", canvas.width / 2 - 250, canvas.height / 2);
  }
}

// Game loop
function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
