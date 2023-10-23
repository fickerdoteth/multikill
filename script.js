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

// Enemy block properties
const enemies = [];

for (let i = 0; i < 15; i++) {
  const size = 10 + Math.random() * 20; // Random block size
  enemies.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: size,
    speed: 2 + Math.random() * 2, // Random speed
  });
}

// Game state
let isGameOver = false;

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
  if (!isGameOver) {
    // Move and check for collision with the enemies
    for (let i = 0; i < enemies.length; i++) {
      const enemy = enemies[i];

      enemy.x += enemy.speed;

      // If the dot collides with a smaller block, consume it and grow
      if (
        dot.x - dot.size / 2 < enemy.x + enemy.size / 2 &&
        dot.x + dot.size / 2 > enemy.x - enemy.size / 2 &&
        dot.y - dot.size / 2 < enemy.y + enemy.size / 2 &&
        dot.y + dot.size / 2 > enemy.y - enemy.size / 2
      ) {
        if (dot.size > enemy.size) {
          enemies.splice(i, 1); // Remove the consumed enemy
          dot.size += 2; // Increase dot's size
        } else {
          isGameOver = true; // Game over if colliding with a larger block
        }
      }

      // If the enemy block goes off the screen, reset its position
      if (enemy.x > canvas.width + enemy.size) {
        enemy.x = -enemy.size;
        enemy.y = Math.random() * canvas.height;
        enemy.speed = 2 + Math.random() * 2;
      }
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
}

// Render function
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!isGameOver) {
    // Draw each enemy block
    ctx.fillStyle = "red";
    for (const enemy of enemies) {
      ctx.fillRect(enemy.x - enemy.size / 2, enemy.y - enemy.size / 2, enemy.size, enemy.size);
    }

    // Draw player's dot
    ctx.fillStyle = "white";
    ctx.fillRect(dot.x - dot.size / 2, dot.y - dot.size / 2, dot.size, dot.size);
  } else {
    // Game over screen
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over!", canvas.width / 2 - 100, canvas.height / 2);
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
