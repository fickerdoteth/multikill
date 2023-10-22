const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player block
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 20,
    speed: 10,
};

// Blocks on the screen
const blocks = [];

// Larger enemy blocks
const enemies = [];

// Game variables
let isGameOver = false;

// Function to check collision between two blocks
function isCollision(block1, block2) {
    return (
        block1.x < block2.x + block2.size &&
        block1.x + block1.size > block2.x &&
        block1.y < block2.y + block2.size &&
        block1.y + block1.size > block2.y
    );
}

// Game loop
function gameLoop() {
    if (isGameOver) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player block
    ctx.fillStyle = '#fff';
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // Draw and check collisions with blocks
    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        ctx.fillStyle = '#000';
        ctx.fillRect(block.x, block.y, block.size, block.size);

        if (isCollision(player, block)) {
            if (player.size > block.size) {
                // Player grows by a little
                player.size += 2;
                blocks.splice(i, 1);
                i--;
            } else {
                isGameOver = true;
            }
        }
    }

    // Draw and check collisions with larger enemy blocks
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);

        if (isCollision(player, enemy)) {
            isGameOver = true;
        }
    }

    // Generate larger enemy blocks (red)
    if (Math.random() < 0.01) {
        const size = Math.random() * 50 + 20;
        const side = Math.floor(Math.random() * 4); // 0 for top, 1 for right, 2 for bottom, 3 for left
        let x, y;

        if (side === 0) {
            x = Math.random() * (canvas.width - size);
            y = -size;
        } else if (side === 1) {
            x = canvas.width;
            y = Math.random() * (canvas.height - size);
        } else if (side === 2) {
            x = Math.random() * (canvas.width - size);
            y = canvas.height;
        } else {
            x = -size;
            y = Math.random() * (canvas.height - size);
        }

        enemies.push({ x, y, size });
    }

    requestAnimationFrame(gameLoop);
}

// Event listeners for player movement
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            player.y -= player.speed;
            break;
        case 'ArrowDown':
            player.y += player.speed;
            break;
        case 'ArrowLeft':
            player.x -= player.speed;
            break;
        case 'ArrowRight':
            player.x += player.speed;
            break;
    }
});

gameLoop();
