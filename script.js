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
  speed: 0, // Initial speed
  acceleration: 0.1, // Acceleration factor
  friction: 0.98, // Friction factor
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

  // Reset dot position and speed
  dot.x = canvas.width / 2;
  dot.y = canvas.height / 2;
  dot.speed = 0;
}

// Update function
function update() {
  if (!isGameOver) {
    // Apply friction to slow down the dot
    dot.speed *= dot.friction;

    if (keys["ArrowUp"]) {
      // Accelerate upward
      dot.speed -= dot.acceleration;
    }
    if (keys["ArrowDown"]) {
      // Accelerate downward
      dot.speed += dot.acceleration;
    }
    if (keys["ArrowLeft"]) {
      // Accelerate to the left
      dot.speed -= dot.acceleration;
    }
    if (keys["ArrowRight"]) {
      // Accelerate to the right
      dot.speed += dot.acceleration;
    }

    // Limit the speed to a maximum value
    const maxSpeed = 5;
    dot.speed = Math.min(maxSpeed, Math.max(-maxSpeed, dot.speed));

    // Update the dot's position
    dot.x += dot.speed;

    // Keep the dot within the canvas boundaries
    if (dot.x < 0) {
      dot.x = 0;
      dot.speed = 0;
    } else if (dot.x > canvas.width) {
      dot.x = canvas.width;
      dot.speed = 0;
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
