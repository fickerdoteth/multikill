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
const blocks = [35];

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

// Function to give blocks random movements and handle bouncing
function moveBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];

        // Random movement
        block.x += (Math.random() - 0.5) * 5; // Adjust the 5 to control block movement speed
        block.y += (Math.random() - 0.5) * 5; // Adjust the 5 to control block movement speed

        // Bounce off walls
        if (block.x < 0 || block.x + block.size > canvas.width) {
            block.xSpeed = -block.xSpeed;
        }
        if (block.y < 0 || block.y + block.size > canvas.height) {
            block.ySpeed = -block.ySpeed;
        }
    }
}


// Game loop
function gameLoop() {
    if (isGameOver) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player block
    ctx.fillStyle = '#000';
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // Draw and check collisions with other blocks
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

    // Update player position based on key input
    // (You can add input handling for player movement here)

    // Give blocks random movements
    moveBlocks();

    // Generate new blocks
    if (Math.random() < 0.02) {
        blocks.push({
            x: Math.random() * (canvas.width - player.size),
            y: Math.random() * (canvas.height - player.size),
            size: Math.random() * 15 + 10,
        });
    }

    requestAnimationFrame(gameLoop);
}

// Handle key input for player movement (arrow keys)
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
