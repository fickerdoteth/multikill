const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 20,
  speed: 5,
};

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
