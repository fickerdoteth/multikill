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
  acceleration: 5, // Acceleration factor
  friction: 0.50, // Friction factor
};

// Enemy properties
const enemies = [];

function createRandomEnemy() {
  // Create a new enemy from the left or right side with random speed
  const fromLeft = Math.random() < 0.5;
  const x = fromLeft ? -20 : canvas.width + 20;
  const y = Math.random() * canvas.height;
  const speedX = fromLeft ? (1 + Math.random() * 2) : (-1 - Math.random() * 2);
  
  enemies.push({ x, y, size: 20, speedX });
}

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
  dot.speedX = 0.5;
  dot.speedY = 0.5;

  // Reset enemies
  enemies.length = 0;
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

    // Update enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
      const enemy = enemies[i];
      enemy.x += enemy.speedX;

      // If an enemy leaves the screen, respawn it
      if (enemy.x < -20 || enemy.x > canvas.width + 20) {
        enemies.splice(i, 1);
        createRandomEnemy();
      }

      // Check for collision with the enemy
      if (
        dot.x - dot.size / 2 < enemy.x + 10 &&
        dot.x + dot.size / 2 > enemy.x - 10 &&
        dot.y - dot.size / 2 < enemy.y + 10 &&
        dot.y + dot.size / 2 > enemy.y - 10
      ) {
        isGameOver = true;
      }
    }
  }
}

// Render function
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw player's dot
  ctx.fillStyle = "white";
  ctx.fillRect(dot.x - dot.size / 2, dot.y - dot.size / 2, dot.size, dot.size);

  // Draw enemies
  ctx.fillStyle = "red";
  for (const enemy of enemies) {
    ctx.fillRect(enemy.x - 10, enemy.y - 10, 20, 20);
  }

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
