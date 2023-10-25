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
  friction: 0.02,
  score: 0,
};

const enemies = [];
const maxEnemies = 17;

let isGameOver = false;
let isGameFrozen = false;
let showUI = true;

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
    return Math.floor(Math.random() * 4) + 1;
  } else if (rand <= 55) {
    return Math.floor(Math.random() * 51) + 5;
  } else if (rand <= 80) {
    return Math.floor(Math.random() * 25) + 56;
  } else if (rand <= 95) {
    return Math.floor(Math.random() * 11) + 81;
  } else {
    return Math.floor(Math.random() * 10) + 91;
  }
}

function handleEnemies() {
  if (isGameFrozen) return;

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
        let points = 0;
        if (enemy.radius >= 1 && enemy.radius <= 4) {
          player.radius += 1;
          points = 1;
        } else if (enemy.radius >= 5 && enemy.radius <= 55) {
          player.radius += 2;
          points = 2;
        } else if (enemy.radius >= 56 && enemy.radius <= 80) {
          player.radius += 3;
          points = 3;
        } else if (enemy.radius >= 81 && enemy.radius <= 90) {
          player.radius += 4;
          points = 4;
        } else if (enemy.radius >= 91 && enemy.radius <= 100) {
          player.radius += 5;
          points = 5;
        }

        player.score += points;
        enemies.splice(i, 1);
      } else {
        isGameOver = true;
        isGameFrozen = true;
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
  ctx.fillStyle = "rgba(255, 16, 240, 0.5)";
  ctx.font = "24px Arial";
  ctx.textAlign = "right";
  if (showUI) {
    ctx.fillText("Score: " + player.score, canvas.width - 20, canvas.height - 20);
  }
}

function movePlayer() {
  if (isGameFrozen) return;

  player.velocityX *= player.friction;
  player.velocityY *= player.friction;

  if (keys["ArrowUp"] || keys["w"]) {
    player.velocityY -= player.speed;
  }
  if (keys["ArrowDown"] || keys["s"]) {
    player.velocityY += player.speed;
  }
  if (keys["ArrowLeft"] || keys["a"]) {
    player.velocityX -= player.speed;
  }
  if (keys["ArrowRight"] || keys["d"]) {
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
  drawScore();

  if (isGameOver && showUI) {
    ctx.fillStyle = "#FF10F0";
    ctx.font = "80px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", canvas.width / 2, canvas.height / 2 - 18);
    ctx.font = "24px Arial";
    ctx.fillText("Press Space to Restart", canvas.width / 2, canvas.height / 2 + 54);
  }
}

function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
  if (isGameOver && (e.key === " " || e.key === "Spacebar" || e.key === "r" || e.key === "Enter")) {
    restartGame();
  }

  if (e.key === "Tab") {
    showUI = !showUI;
  }
  
  if (e.key === "f") {
    toggleFullscreen();
  }
});

function restartGame() {
  player.x = canvas.width / 2;
  player.y = canvas.height / 2;
  player.radius = 3;
  player.score = 0;
  enemies.length = 0;
  isGameOver = false;
  isGameFrozen = false;
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    canvas.requestFullscreen().catch((err) => {
      console.error("Error attempting to enable fullscreen:", err.message);
    });
  }
}

gameLoop();
