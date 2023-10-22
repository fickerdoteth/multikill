const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
    x: 50,
    y: 50,
    size: 30,
    dx: 0,
    dy: 0,
    speed: 4
};

const block = {
    x: Math.random() * (canvas.width - 30),
    y: Math.random() * (canvas.height - 30),
    size: 30
};

let score = 0;

function drawPlayer() {
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawBlock() {
    ctx.fillStyle = "blue";
    ctx.fillRect(block.x, block.y, block.size, block.size);
}

function updatePlayer() {
    player.x += player.dx;
    player.y += player.dy;

    // Keep player inside the canvas
    if (player.x < 0) player.x = 0;
    if (player.y < 0) player.y = 0;
    if (player.x + player.size > canvas.width) player.x = canvas.width - player.size;
    if (player.y + player.size > canvas.height) player.y = canvas.height - player.size;
}

function movePlayer(e) {
    switch (e.keyCode) {
        case 37: // Left
            player.dx = -player.speed;
            player.dy = 0;
            break;
        case 38: // Up
            player.dy = -player.speed;
            player.dx = 0;
            break;
        case 39: // Right
            player.dx = player.speed;
            player.dy = 0;
            break;
        case 40: // Down
            player.dy = player.speed;
            player.dx = 0;
            break;
    }
}

function checkCollision() {
    if (player.x < block.x + block.size &&
        player.x + player.size > block.x &&
        player.y < block.y + block.size &&
        player.y + player.size > block.y) {
        score++;
        block.x = Math.random() * (canvas.width - 30);
        block.y = Math.random() * (canvas.height - 30);
    }
}

function displayScore() {
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 20);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBlock();
    updatePlayer();
    checkCollision();
    displayScore();
    requestAnimationFrame(update);
}

document.addEventListener("keydown", movePlayer);

update();
