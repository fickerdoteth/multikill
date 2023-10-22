const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    dx: 0,
    dy: 0,
    speed: 20
};

const enemies = [];
const numEnemies = 40;

// Create enemy blocks
for (let i = 0; i < numEnemies; i++) {
    const size = Math.random() * (50 - 10) + 10;
    enemies.push({
        x: Math.random() * (canvas.width - size),
        y: Math.random() * (canvas.height - size),
        size: size,
        dx: (Math.random() * 4 - 2),
        dy: (Math.random() * 4 - 2)
    });
}

function movePlayer(e) {
    switch (e.keyCode) {
        case 37: // Left
            player.dx = -player.speed;
            break;
        case 38: // Up
            player.dy = -player.speed;
            break;
        case 39: // Right
            player.dx = player.speed;
            break;
        case 40: // Down
            player.dy = player.speed;
            break;
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.size, player.size);
    
    player.x += player.dx;
    player.y += player.dy;

    // Wall collisions for player
    if (player.x < 0) player.x = 0;
    if (player.y < 0) player.y = 0;
    if (player.x + player.size > canvas.width) player.x = canvas.width - player.size;
    if (player.y + player.size > canvas.height) player.y = canvas.height - player.size;

    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        
        // Move and draw enemies
        ctx.fillStyle = "blue";
        ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);

        enemy.x += enemy.dx;
        enemy.y += enemy.dy;

        // Wall collisions for enemies
        if (enemy.x < 0 || enemy.x + enemy.size > canvas.width) enemy.dx = -enemy.dx;
        if (enemy.y < 0 || enemy.y + enemy.size > canvas.height) enemy.dy = -enemy.dy;

        // Check collision between player and enemies
        if (player.x < enemy.x + enemy.size &&
            player.x + player.size > enemy.x &&
            player.y < enemy.y + enemy.size &&
            player.y + player.size > enemy.y) {

            if (player.size > enemy.size) {
                player.size += 5; // Increase player size
                enemy.size = Math.random() * (50 - 10) + 10; // Reset enemy size
                enemy.x = Math.random() * (canvas.width - enemy.size);
                enemy.y = Math.random() * (canvas.height - enemy.size);
            } else {
                // Game Over
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "black";
                ctx.font = "40px Arial";
                ctx.textAlign = "center";
                ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
                return;
            }
        }
    }

    requestAnimationFrame(update);
}

document.addEventListener("keydown", movePlayer);
update();
