const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Audio element.
const bgMusic = document.getElementById("bgMusic");

canvas.width = 1080;
canvas.height = 720;

const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 3,
  speed: 2,
  velocityX: 0,
  velocityY: 0,
  friction: 0.02,
  score: 0,
};

const enemies = [];
const maxEnemies = 23;

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
    if (player.radius >= 490) {
      // Remove the enemy when the player's radius is greater than or equal to 480.
      enemies.splice(i, 1);
    }

    const dx = enemy.x - player.x;
    const dy = enemy.y - player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < player.radius + enemy.radius) {
      if (enemy.radius < player.radius) {
        let points = 0;
        if (enemy.radius >= 1 && enemy.radius <= 4) {
          player.radius += 1;
          points = 10;
        } else if (enemy.radius >= 5 && enemy.radius <= 55) {
          player.radius += 2;
          points = 20;
        } else if (enemy.radius >= 56 && enemy.radius <= 80) {
          player.radius += 3;
          points = 30;
        } else if (enemy.radius >= 81 && enemy.radius <= 90) {
          player.radius += 4;
          points = 40;
        } else if (enemy.radius >= 91 && enemy.radius <= 100) {
          player.radius += 5;
          points = 50;
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
function flexCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', flexCanvas);
flexCanvas(); // Call it initially to set the dimensions.

const touch = {
  startX: 0,
  startY: 0,
  endX: 0,
  endY: 0
};


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
  ctx.strokeStyle = "#000000";  // Outline color
  ctx.lineWidth = 4;
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

  let maxRadiusForBorderCollision = 390;

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

canvas.addEventListener('touchstart', (e) => {
  touch.startX = e.touches[0].clientX;
  touch.startY = e.touches[0].clientY;
});

canvas.addEventListener('touchmove', (e) => {
  touch.endX = e.touches[0].clientX;
  touch.endY = e.touches[0].clientY;

  let deltaX = touch.endX - touch.startX;
  let deltaY = touch.endY - touch.startY;

  player.velocityX = deltaX * player.friction;
  player.velocityY = deltaY * player.friction;

  if (navigator.vibrate) { // checks if the API is supported
    navigator.vibrate(200); // vibrate for 200ms
}

});

function update() {
  movePlayer();
  handleEnemies();
 
  // Check if player expands over the border
 if (player.radius >= 490) {
  isGameOver = true;
  isGameFrozen = true;
  }
}


function render() {
  // Standard background fill.
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (player.radius >= 490) {
    // Fill the entire background with #FF10F0.
    ctx.fillStyle = "#FF10F0";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#FFFFFF"; 
    ctx.font = "80px Arial"; 
    ctx.textAlign = "center";
    ctx.fillText("", canvas.width / 2, canvas.height / 2 - 18);
    ctx.font = "24px Arial";
    ctx.fillText("", canvas.width / 2, canvas.height / 2 + 54);

    

    return;
} 
else {
    // If the game is not over or the player hasn't expanded over the border, draw the enemies and the player.
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
}

// In the game loop, add the following line to ensure the music continues to play:
function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
  
  // Add this line to ensure the background music is playing.
  if (bgMusic.paused) {
    bgMusic.play();
  }
}

// Inside your event listener for restarting the game, you can add a line to restart the music:
document.addEventListener("keydown", (e) => {
  if (isGameOver && (e.key === " " || e.key === "Spacebar" || e.key === "r" || e.key === "Enter")) {
    restartGame();
    
  if ((isGameOver || isVictory) && (e.key === " " || e.key === "Spacebar" || e.key === "r" || e.key === "Enter")) {
      playAgain();
    }  
    // Add this line to restart the background music.
    bgMusic.currentTime = 0;
    bgMusic.volume = 0.5;  // Set volume to 50%
    
    let playPromise = bgMusic.play();

if (playPromise !== undefined) {
    playPromise.then(_ => {
        // Audio playback started
    })
    .catch(error => {
        console.error("Playback failed:", error.message);
    });
}

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
