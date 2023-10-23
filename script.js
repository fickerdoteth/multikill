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

function createEnemy() {
  const fromLeft = Math.random() < 0.5;
  const x = fromLeft ? -20 : canvas.width + 20;
  const y = Math.random() * canvas.height;
  const speedX = fromLeft ? 1 + Math.random() * 2 : -1 - Math.random() * 2;

  const radius = getRandomEnemySize();

  enemies.push({ x, y, radius, speedX });
}

// Other functions remain unchanged

function showGameOverScreen() {
  // Game over screen
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

  // Play button
  ctx.fillStyle = "#00FF00";
  ctx.fillRect(canvas.width / 2 - 50, canvas.height / 2 + 20, 100, 40);
  ctx.fillStyle = "#000000";
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Play Again", canvas.width / 2, canvas.height / 2 + 50);
  
  // Highscore leaderboard
  ctx.fillStyle = "#FFFF00";
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Highscore: " + localStorage.getItem("highscore"), canvas.width / 2, canvas.height / 2 + 100);
  
  // Credits
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "16px Arial";
  ctx.fillText("Credits:", canvas.width / 2, canvas.height / 2 + 150);
  ctx.fillText("Developer: Your Name", canvas.width / 2, canvas.height / 2 + 180);
}

function gameLoop() {
  if (gameRunning) {
    update();
    render();
    requestAnimationFrame(gameLoop);
  } else {
    showGameOverScreen();
  }
}

canvas.addEventListener("click", function (e) {
  if (!gameRunning) {
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    if (
      clickX >= canvas.width / 2 - 50 &&
      clickX <= canvas.width / 2 + 50 &&
      clickY >= canvas.height / 2 + 20 &&
      clickY <= canvas.height / 2 + 60
    ) {
      // Reset the game when the "Play Again" button is clicked
      resetGame();
    }
  }
});

function resetGame() {
  player.x = canvas.width / 2;
  player.y = canvas.height / 2;
  player.radius = 5;
  player.score = 0;
  enemies.length = 0;
  gameRunning = true;
  gameLoop();
}

gameLoop();
