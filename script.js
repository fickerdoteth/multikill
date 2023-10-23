const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1080;
canvas.height = 720;

const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 5,
  speed: 2,
  velocityX: 1.5,
  velocityY: 1.5,
  friction: 0.08,
  score: 0,
};

const enemies = [];
const maxEnemies = 33;
let gameRunning = true; // Track game state
let highScore = 0; // Initialize the high score

function createEnemy() {
  const fromLeft = Math.random() < 0.5;
  const x = fromLeft ? -20 : canvas.width + 20;
  const y = Math.random() * canvas.height;
  const speedX = fromLeft ? 1 + Math.random() * 2 : -1 - Math.random() * 2;

  const radius = getRandomEnemySize();

  enemies.push({ x, y, radius, speedX });
}

function getRandomEnemySize() {
  const rand = Math.random() * 100;

  if (rand <= 20) {
    return Math.floor(Math.random() * 4) + 1; // 20% of sizes 1-4
  } else if (rand <= 55) {
    return Math.floor(Math.random() * 51) + 5; // 35% of sizes 5-55
  } else if (rand <= 80) {
    return Math.floor(Math.random() * 25) + 56; // 25% of sizes 56-80
  } else if (rand <= 95) {
    return Math.floor(Math.random() * 11) + 81; // 15% of sizes 81-90
  } else {
    return Math.floor(Math.random() * 10) + 91; // 5% of sizes 91-100
  }
}

function handleEnemies() {
  if (enemies.length < maxEnemies) {
    createEnemy();
  }

  for (let i = enemies.length - 1; i >= 0; i--) {
    const enemy = enemies[i];
    enemy.x += enemy.speedX;

    if (enemy.x < -20 || enemy.x > canvas.width + 20) {
      enemies.splice(i, 1);
      createEnemy();
    }

    const dx = enemy.x - player.x;
    const dy = enemy.y - player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < player.radius + enemy.radius) {
      if (enemy.radius < player.radius) {
        // Calculate points based on the "grow by" factor
        let points = 0;
        if (enemy.radius >= 1 && enemy.radius <= 4) {
          player.radius += 1; // Grow by 1
          points = 1;
        } else if (enemy.radius >= 5 && enemy.radius <= 55) {
          player.radius += 2; // Grow by 2
          points = 2;
        } else if (enemy.radius >= 56 && enemy.radius <= 80) {
          player.radius += 3; // Grow by 3
          points = 3;
        } else if (enemy.radius >= 81 && enemy.radius <= 90) {
          player.radius += 7; // Grow by 7
          points = 7;
        } else if (enemy.radius >= 91 && enemy.radius <= 100) {
          player.radius += 10; // Grow by 10
          points = 10;
        }

        player.score += points; // Update the player's score
        enemies.splice(i, 1); // Remove the smaller enemy
      } else {
        gameRunning = false; // Set the game state to "not running"
      }
    }
  }
}

function showGameOverOverlay() {
  // Game over overlay
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Game over title
  ctx.fillStyle = "#FF10F0";
  ctx.font = "48px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 50);

  // Display the player's score
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "24px Arial";
  ctx.fillText("Score: " + player.score, canvas.width / 2, canvas.height / 2);

  // Display the high score
  ctx.fillStyle = "#FFFF00";
  ctx.font = "24px Arial";
  ctx.fillText("High Score: " + highScore, canvas.width / 2, canvas.height / 2 + 30);

  // Play button
  ctx.fillStyle = "#00FF00";
  ctx.fillRect(canvas.width / 2 - 50, canvas.height / 2 + 80, 100, 40);
  ctx.fillStyle = "#000000";
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Play Again", canvas.width / 2, canvas.height / 2 + 100);
}

function resetGame() {
  if (player.score > highScore) {
    highScore = player.score; // Update high score if needed
  }
  player.x = canvas.width / 2;
  player.y = canvas.height / 2;
  player.radius = 5;
  player.score = 0;
  enemies.length = 0;
  gameRunning = true;
  gameLoop();
}

canvas.addEventListener("click", function (e) {
  handleMouseClick(e);
});

// Listen for keyboard events
document.addEventListener("keydown", function (e) {
  if (!gameRunning) {
    if (e.key === "Enter" || e.key === " ") {
      resetGame();
    }
  }
});

function handleMouseClick(e) {
  if (!gameRunning) {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    if (
      clickX >= canvas.width / 2 - 50 &&
      clickX <= canvas.width / 2 + 50 &&
      clickY >= canvas.height / 2 + 80 &&
      clickY <= canvas.height / 2 + 120
    ) {
      resetGame();
    }
  }
}

function update() {
  if (gameRunning) {
    movePlayer();
    handleEnemies();
  }
}

function render() {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawEnemies();
  drawPlayer();
  if (!gameRunning) {
    showGameOverOverlay();
  }
  if (gameRunning) {
    drawScore(); // Display the score only when the game is running
  }
}

function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

gameLoop();
