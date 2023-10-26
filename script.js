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
const maxEnemies = 18;

let isGameOver = false;
let isGameFrozen = false;
let showUI = true;
let isMenuActive = true; // Add this to the beginning of your code

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
          points = 100;
        } else if (enemy.radius >= 5 && enemy.radius <= 55) {
          player.radius += 2;
          points = 200;
        } else if (enemy.radius >= 56 && enemy.radius <= 80) {
          player.radius += 3;
          points = 300;
        } else if (enemy.radius >= 81 && enemy.radius <= 90) {
          player.radius += 4;
          points = 400;
        } else if (enemy.radius >= 91 && enemy.radius <= 100) {
          player.radius += 5;
          points = 500;
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

function update() {
  if (isMenuActive) return;  // Exit the update function if the menu is active


  movePlayer();
  handleEnemies();
 
  // Check if player expands over the border
 if (player.radius >= 490) {
  isGameOver = true;
  isGameFrozen = true;
  }
}
const menuItems = ["Play", "Instructions", "Credits"];
let selectedItemIndex = 0;


function render() {
  // Standard background fill.
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (isMenuActive) {
    ctx.fillStyle = "#FF10F0"; 
    ctx.font = "180px Arial"; 
    ctx.textAlign = "center";
    ctx.fillText("neonpink", canvas.width / 2, canvas.height / 2 - 50); // Change "Game Title" to your game's name
    

      // Drawing the menu items
      for (let i = 0; i < menuItems.length; i++) {
          ctx.font = "36px Arial";
          if (i === selectedItemIndex) {
              ctx.fillStyle = "#FFFFFF";  // Highlight color for selected item
          } else {
              ctx.fillStyle = "#FF10F0";  // Regular color for other items
          }
          ctx.fillText(menuItems[i], canvas.width / 2, canvas.height / 2 + 45 + 40 * i);
      }
  
      ctx.fillStyle = "#FFFFFF";  // Reset color for "by ficker.eth"
      ctx.font = "24px Arial";
      ctx.fillText("by ficker.eth", canvas.width / 2 + 300, canvas.height / 2 - 20);  // Added 50 for moving below the title
            ctx.font = "20px Arial";
      ctx.fillText("2023", canvas.width / 2, canvas.height / 2 + 90 + 72 * menuItems.length);
  


  } else if (player.radius >= 490) {
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

  if (isMenuActive) {
    if (!bgMusic.paused) bgMusic.pause();
  } else if (bgMusic.paused) {
    bgMusic.play();
  }

  
  // Add this line to ensure the background music is playing.
  if (bgMusic.paused) {
    bgMusic.play();
  }
}
document.addEventListener('DOMContentLoaded', function() {
  var audio = document.getElementById("myAudio");
  audio.playbackRate = 0.5; // Set the playback speed to half the normal rate
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

);

document.addEventListener("keydown", (e) => {
  if (isMenuActive) {
    if (e.key === "ArrowUp") {
      selectedItemIndex--;
      if (selectedItemIndex < 0) {
        selectedItemIndex = menuItems.length - 1; // wrap around to the last item
      }
    } else if (e.key === "ArrowDown") {
      selectedItemIndex++;
      if (selectedItemIndex >= menuItems.length) {
        selectedItemIndex = 0; // wrap around to the first item
      }
    } else if (e.key === "Enter" || e.key === "Space") {
      // Logic for selecting the highlighted option
      // For example:
      switch (menuItems[selectedItemIndex]) {
        case "Play":
          isMenuActive = false;
          break;
        case "Options":
          // code to open options
          break;
        case "Credits":
          // code to show credits
          break;
        default:
          console.error("Unknown menu option");
      }
    }
  }  if (isGameOver && (e.key === "Backspace")) {
    isMenuActive = true;  // Return to the menu when Enter is pressed during Game Over
    return;
  }
}
)
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
    bgMusic.playbackrate =0.6
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
