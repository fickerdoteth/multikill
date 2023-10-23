const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 1080;
canvas.height = 720; // Set the canvas size to 1080x720

const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 5,
  speed: 2,
  velocityX: 2.5,
  velocityY: 2.5,
  friction: 0.04, // Friction factor to slow down the player
};

const enemies = [];
const maxEnemies = 50;

function createEnemy() {
  const fromLeft = Math.random() < 0.5;
  const x = fromLeft ? -20 : canvas.width + 20;
  const y = Math.random() * canvas.height;
  const speedX = fromLeft ? 1 + Math.random() * 2 : -1 - Math.random() * 2;

  const radius = getRandomEnemySize(); // Get a random enemy size

  enemies.push({ x, y, radius, speedX });
}

function getRandomEnemySize() {
  // Generate random enemy sizes: small, medium, big, huge
  const sizes = [1, 2, 3, 5, 10, 12, 15, 18, 20, 22, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95 100, 120, 150, 180, 200, 220, 240, 260, 280, 300, 330, 360, 380, 400, 450, 480, 500, 1000];
  return sizes[Math.floor(Math.random() * sizes.length)];
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
      // Handle collision, for example, end the game
      // You can add your custom game logic here
    }
  }
}

function drawPlayer() {
  ctx.fillStyle = "#FFFFFF"; // White player
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawEnemies() {
  for (const enemy of enemies) {
    ctx.fillStyle = getEnemyColor(enemy.radius); // Set enemy color based on size
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function getEnemyColor(radius) {
  if (radius <= 10) {
    return "#FFFFF"; // Small enemy
  } else if (radius <= 15) {
    return "#FFFFF"; // Medium enemy
  } else if (radius <= 20) {
    return "#FFFFF"; // Big enemy
  } else {
    return "#FFFFF"; // Huge enemy
  }
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

  // Keep the player within the canvas boundaries
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
  // Set the background color to black
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawEnemies();
  drawPlayer();
}

function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

gameLoop();
