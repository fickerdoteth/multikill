const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player block
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 20,
    speed: 4, // Adjusted player speed
};

// Blocks on the screen
const blocks = [];

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
    ctx.fillStyle = '#000';
    ctx.fillRect(player.x, player.y, player.size, player.size);

    // Draw and check collisions with other blocks
    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];
        ctx.fillStyle = '#000';
        ctx.fillRect(block.x, block.y, block.size, block.size);

        if (isCollision(player, block)) {
            if (player.size > block.size) {
                // Player grows by a little (reduced growth rate)
                player.size += 1;
                blocks.splice(i, 1);
                i--;
            } else {
                isGameOver = true;
            }
        }

        // Make enemy blocks move slowly (update block positions)
        block.x += (Math.random() - 0.5); // Small random horizontal movement
        block.y += (Math.random() - 0.5); // Small random vertical movement
    }

    // Update player position based on key input (adjusted player speed)
    // WASD controls
    if (keys.w) player.y -= player.speed;
    if (keys.s) player.y += player.speed;
    if (keys.a) player.x -= player.speed;
    if (keys.d) player.x += player.speed;

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

// Handle key input for player movement (WASD controls)
const keys = {
    w: false,
    a: false,
    s: false,
    d: false,
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'w') keys.w = true;
    if (e.key === 'a') keys.a = true;
    if (e.key === 's') keys.s = true;
    if (e.key === 'd') keys.d = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'w') keys.w = false;
    if (e.key === 'a') keys.a = false;
    if (e.key === 's') keys.s = false;
    if (e.key === 'd') keys.d = false;
});

gameLoop();

// Retry button event
const retryButton = document.createElement('button');
retryButton.textContent = 'Retry';
retryButton.style.position = 'absolute';
retryButton.style.left = '50%';
retryButton.style.top = '50%';
retryButton.style.transform = 'translate(-50%, -50%)';
retryButton.style.display = 'none';

document.body.appendChild(retryButton);

// Function to handle retry
function retryGame() {
    isGameOver = false;
    player.size = 20; // Reset player size
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;
    blocks.length = 0; // Clear blocks
    retryButton.style.display = 'none';
}

retryButton.addEventListener('click', retryGame);

// Retry button can be pressed with "space" or "enter" key
document.addEventListener('keydown', (e) => {
    if ((e.key === ' ' || e.key === 'Enter') && isGameOver) {
        retryGame();
    }
});
