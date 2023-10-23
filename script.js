const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 1080;
canvas.height = 720;

const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 20,
  speed: 5,
};

// Dot properties
const dot = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 5,
  speedX: 0, // Initial horizontal speed
  speedY: 0, // Initial vertical speed
  acceleration: 2.5, // Acceleration factor
  friction: 0.95, // Friction factor
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
const foods = [];
const maxFoods = 30;

function createFood() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const radius = Math.random() * 10 + 5;

  foods.push({ x, y, radius });
}

function handleFoods() {
  if (foods.length < maxFoods) {
    createFood();
  }

  for (let i = foods.length - 1; i >= 0; i--) {
    const food = foods[i];
    const dx = food.x - player.x;
    const dy = food.y - player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < player.radius + food.radius) {
      foods.splice(i, 1);
      player.radius += 2;
    }
  }
}

function drawPlayer() {
  ctx.fillStyle = "#FF5733";
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
  ctx.fill();
}

function drawFood() {
  ctx.fillStyle = "#33FF66";
  for (const food of foods) {
    ctx.beginPath();
    ctx.arc(food.x, food.y, food.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function update() {
  handleFoods();
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFood();
  drawPlayer();
}

function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

gameLoop();
