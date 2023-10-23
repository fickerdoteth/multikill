const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1080;
canvas.height = 720;

const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 3,
  speed: 2,
  velocityX: 1.5,
  velocityY: 1.5,
  friction: 0.08,
  score: 0, // Initialize the score
};

const enemies = [];
const maxEnemies = 24;

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
        
        // Player touches a bigger enemy, it's game over
        alert("Game Over! Score: " + player.score + 
              
              " Press OK to try again ");
        document.location.reload();
      }
    }
  }
}

function drawPlayer() {
  ctx.fillStyle = "#FF10F0";
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawEnemies() {
  ctx.fillStyle = "#FFFFFF";
  for (const enemy of enemies) {
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawScore() {
  ctx.fillStyle = "#FF10F0 0.5)"; // Transparent neon pink
  ctx.font = "24px Arial";
  ctx.textAlign = "right";
  ctx.fillText("Score: " + player.score, canvas.width - 20, canvas.height - 20);
}

function movePlayer() {
  player.velocityX *= player.friction;
  player.velocityY *= player.friction;

  if (keys["ArrowUp"]) {
    player.velocityY -= player.speed;
  }
  if (keys["ArrowDown"]) {
    player.velocityY += player.speed;
  }
  if (keys["ArrowLeft"]) {
    player.velocityX -= player.speed;
  }
  if (keys["ArrowRight"]) {
    player.velocityX += player.speed;
  }

  player.x += player.velocityX;
  player.y += player.velocityY;

  if (player.x - player.radius < 0) {
    player.x = player.radius;
    player.velocityX = 0;
  } else if (player.x + player.radius > canvas.width) {
    player.x = canvas.width - player.radius;
    player.velocityX = 0;
  }

  if (player.y - player.radius < 0) {
    player.y = player.radius;
    player.velocityY = 0;
  } else if (player.y + player.radius > canvas.height) {
    player.y = canvas.height - player.radius;
    player.velocityY = 0;
  }
}

const keys = {};

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

function update() {
  movePlayer();
  handleEnemies();
}

function render() {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawEnemies();
  drawPlayer();
  drawScore(); // Display the score
}

function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

gameLoop();
