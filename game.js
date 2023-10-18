const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Character properties
const character = {
    x: 50,
    y: 0,
    width: 30,
    height: 30,
    speed: 3,
    jumping: false,
    jumpHeight: 100,
    jumpCount: 0,
};

// Obstacle properties
const obstacles = [];
const obstacleWidth = 20;
const obstacleHeight = 20;
const obstacleSpeed = 2;

// Game variables
let score = 0;
let isGameOver = false;

// Character jumping function
function jump() {
    if (!character.jumping) {
        character.jumping = true;
        character.jumpCount = 0;
    }
}

// Game over function
function gameOver() {
    isGameOver = true;
    ctx.fillStyle = '#000';
    ctx.font = '30px Arial';
    ctx.fillText('Game Over', canvas.width / 2 - 70, canvas.height / 2);
}

// Game loop
function gameLoop() {
    if (isGameOver) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw character
    ctx.fillStyle = '#ff5733';
    ctx.fillRect(character.x, canvas.height - character.height - character.y, character.width, character.height);

    // Draw obstacles
    for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        ctx.fillStyle = '#333';
        ctx.fillRect(obstacle.x, canvas.height - obstacle.height, obstacleWidth, obstacleHeight);

        // Check collision
        if (character.x < obstacle.x + obstacleWidth &&
            character.x + character.width > obstacle.x &&
            character.y < obstacle.height) {
            gameOver();
        }

        obstacle.x -= obstacleSpeed;

        if (obstacle.x + obstacleWidth < 0) {
            obstacles.splice(i, 1);
            i--;
            score++;
        }
    }

    // Update character position
    if (character.jumping) {
        character.y += character.speed * 2;
        character.jumpCount += character.speed * 2;
        if (character.jumpCount >= character.jumpHeight) {
            character.jumping = false;
            character.jumpCount = 0;
        }
    } else if (character.y > 0) {
        character.y -= character.speed;
    }

    // Draw score
    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 20, 20);

    // Generate new obstacles
    if (Math.random() < 0.02) {
        obstacles.push({ x: canvas.width, height: Math.random() * 100 + 20 });
    }

    requestAnimationFrame(gameLoop);
}

// Handle key press for jumping
document.addEventListener('keydown', function (e) {
    if (e.key === ' ' || e.key === 'ArrowUp') {
        jump();
    }
});

gameLoop();
