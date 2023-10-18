const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player character
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 20,
    height: 20,
    speed: 4,
};

// Key input
const keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Handle player movement
    if (keys['ArrowUp'] && player.y > 0) {
        player.y -= player.speed;
    }
    if (keys['ArrowDown'] && player.y + player.height < canvas.height) {
        player.y += player.speed;
    }
    if (keys['ArrowLeft'] && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys['ArrowRight'] && player.x + player.width < canvas.width) {
        player.x += player.speed;
    }

    // Draw player
    ctx.fillStyle = '#ff5733';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(gameLoop);
}

gameLoop();
