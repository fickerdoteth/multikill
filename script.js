const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Dot properties
const dot = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 5,
  speedX: 0, // Initial horizontal speed
  speedY: 0, // Initial vertical speed
  acceleration: 0.04, // Acceleration factor
  friction: 0.70, // Friction factor
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

  // Reset dot position and speeds
  dot.x = canvas.width / 2;
  dot.y = canvas.height / 2;
  dot.speedX = 0;
  dot.speedY = 0;
}

// Update function
function update() {
  if (!isGameOver) {
    // Apply friction to slow down the dot
    dot.speedX *= dot.friction;
    dot.speedY *= dot.friction;

    if (keys["ArrowUp"]) {
      // Accelerate upward
      dot.speedY -= dot.acceleration;
    }
    if (keys["ArrowDown"]) {
      // Accelerate downward
      dot.speedY += dot.acceleration;
    }
    if (keys["ArrowLeft"]) {
      // Accelerate to the left
      dot.speedX -= dot.acceleration;
    }
    if (keys["ArrowRight"]) {
      // Accelerate to the right
      dot.speedX += dot.acceleration;
    }

    // Limit the speeds in both directions
    const maxSpeed = 5;
    dot.speedX = Math.min(maxSpeed, Math.max(-maxSpeed, dot.speedX));
    dot.speedY = Math.min(maxSpeed, Math.max(-maxSpeed, dot.speedY));

    // Update the dot's position
    dot.x += dot.speedX;
    dot.y += dot.speedY;

    // Keep the dot within the canvas boundaries
    if (dot.x < 0) {
      dot.x = 0;
      dot.speedX = 0;
    } else if (dot.x > canvas.width) {
      dot.x = canvas.width;
      dot.speedX = 0;
    }

    if (dot.y < 0) {
      dot.y = 0;
      dot.speedY = 0;
    } else if (dot.y > canvas.height) {
      dot.y = canvas.height;
      dot.speedY = 0;
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
    ctx.fillText("Game Over! Reload page", canvas.width / 2 - 250, canvas.height / 2);
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
