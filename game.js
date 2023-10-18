const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player character
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 5,
    speed: 2,
};

// Create an array to hold other dots (enemies)
const enemies = [];

// Game variables
let isGameOver = false;

// Function to check collision between two dots
function isCollision(dot1, dot2) {
    const dx = dot1.x - dot2.x;
    const dy = dot1.y - dot2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < dot1.radius + dot2.radius;
}

// Game loop
function gameLoop() {
    if (isGameOver) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fill();

    // Draw enemies (other dots) and check for collisions
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2);
        ctx.fill();

        if (isCollision(player, enemy)) {
            isGameOver = true; // Game over when player touches an enemy
        }
    }

    // Update player position based on key input or mouse input
    // (You can add input handling for player movement here)

    // Generate new enemies (other dots)
    if (Math.random() < 0.02) {
        enemies.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 10 + 5,
        });
    }

    requestAnimationFrame(gameLoop);
}

// Handle mouse input for player movement
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    player.x = e.clientX - rect.left;
    player.y = e.clientY - rect.top;
});

gameLoop();
