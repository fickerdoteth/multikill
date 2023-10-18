const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player character
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 5,
    speed: 2,
};

// Create an array to hold other dots
const dots = [];

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

    // Draw other dots, check for collisions
    for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();

        if (isCollision(player, dot)) {
            if (player.radius > dot.radius) {
                // Player eats the dot
                dots.splice(i, 1);
                player.radius += 1; // Player gets bigger
            } else {
                // Player is eaten by the dot
                isGameOver = true;
            }
        }
    }

    // Update player position based on key input or mouse input
    // (You can add input handling for player movement here)

    // Generate new dots
    if (Math.random() < 0.02) {
        dots.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 5 + 2,
        });
    }

    requestAnimationFrame(gameLoop);
}

// Handle key/mouse input for player movement
document.addEventListener('mousemove', (e) => {
    player.x = e.clientX - canvas.getBoundingClientRect().left;
    player.y = e.clientY - canvas.getBoundingClientRect().top;
});

gameLoop();
