const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas dimensions
canvas.width = 800;
canvas.height = 600;

// Dot properties
const dot = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 5,
};

// Handle user input
const keys = {};

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

// Player's velocity with acceleration
const ACCELERATION = 0.1;
const MAX_VELOCITY = 5; // Maximum velocity for the player
let player_velocity_x = 0;
let player_velocity_y = 0;

// Update function
function update() {
  if (keys["ArrowUp"] || keys["KeyW"] && dot.y > 0.1) {
    player_velocity_y -= ACCELERATION;
  }
  if (keys["ArrowDown"] || keys["KeyS"] && dot.y < canvas.height) {
    player_velocity_y += ACCELERATION;
  }
  if (keys["ArrowLeft"] || keys["KeyA"] && dot.x > 0.1) {
    player_velocity_x -= ACCELERATION;
  }
  if (keys["ArrowRight"] || keys["KeyD"] && dot.x < canvas.width) {
    player_velocity_x += ACCELERATION;
  }

  // Limit the player's velocity
  player_velocity_x = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, player_velocity_x));
  player_velocity_y = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, player_velocity_y));

  // Apply velocity to the player's position
  dot.x += player_velocity_x;
  dot.y += player_velocity_y;
}

// ... (rest of the code remains the same)
