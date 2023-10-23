const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.width = 1080;
canvas.height = 720;
const ctx = canvas.getContext('2d');

// Constants
const PLAYER_RADIUS = 5;
const PLAYER_SPEED = 0.2;
const ACCELERATION = 0.001;
const BACKGROUND_COLOR = 'rgb(0, 0, 0)';
const WHITE = 'rgb(255, 255, 255)';
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Initialize the player
let player_x = WIDTH / 2;
let player_y = HEIGHT / 2;
let player_velocity_x = 0;
let player_velocity_y = 0;

// Game loop
let running = true;

function gameLoop() {
  if (!running) return;

  // Move the player with acceleration
  if (keys['ArrowUp'] || keys['W'] || keys['w']) {
    player_velocity_y -= ACCELERATION;
  }
  if (keys['ArrowDown'] || keys['S'] || keys['s']) {
    player_velocity_y += ACCELERATION;
  }
  if (keys['ArrowLeft'] || keys['A'] || keys['a']) {
    player_velocity_x -= ACCELERATION;
  }
  if (keys['ArrowRight'] || keys['D'] || keys['d']) {
    player_velocity_x += ACCELERATION;
  }

  // Apply velocity to the player's position
  player_x += player_velocity_x;
  player_y += player_velocity_y;

  // Prevent the player from leaving the canvas
  if (player_x < 0) {
    player_x = 0;
    player_velocity_x = 0;
  }
  if (player_x > WIDTH) {
    player_x = WIDTH;
    player_velocity_x = 0;
  }
  if (player_y < 0) {
    player_y = 0;
    player_velocity_y = 0;
  }
  if (player_y > HEIGHT) {
    player_y = HEIGHT;
    player_velocity_y = 0;
  }

  // Slow down the player's velocity
  player_velocity_x *= 0.999;
  player_velocity_y *= 0.999;

  // Draw the player fish
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.fillStyle = WHITE;
  ctx.beginPath();
  ctx.arc(player_x, player_y, PLAYER_RADIUS, 0, Math.PI * 2);
  ctx.fill();

  requestAnimationFrame(gameLoop);
}

// Keyboard controls
const keys = {};
document.addEventListener('keydown', (event) => {
  keys[event.key] = true;
});

document.addEventListener('keyup', (event) => {
  keys[event.key] = false;
});

// Start the game loop
gameLoop();
