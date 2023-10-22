const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
    x: canvas.width / 2 - 15,
    y: canvas.height / 2 - 15,
    size: 30,
    dx: 0,
    dy: 0,
    speed: 4
};

const blocksArray = [];

function drawPlayer() {
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.size, player.size);
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
    switch(e.keyCode) {
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

function spawnBlock() {
    const size = Math.random() * (player.size - 10) + 5;
    const x = Math.random() * (canvas.width - size);
    const y = Math.random() * (canvas.height - size);

    blocksArray.push({
        x,
        y,
        size
    });
}

function drawBlocks() {
    ctx.fillStyle = "blue";
    for(let block of blocksArray) {
        ctx.fillRect(block.x, block.y, block.size, block.size);
    }
}

function eatBlock() {
    for(let i = 0; i < blocksArray.length; i++) {
        let block = blocksArray[i];
        if (player.x < block.x + block.size &&
            player.x + player.size > block.x &&
            player.y < block.y + block.size &&
            player.y + player.size > block.y) {
            blocksArray.splice(i, 1);
            player.size += 5; // Increase player size a bit more for each block eaten
            spawnBlock();
        }
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBlocks();
    updatePlayer();
    eatBlock();
    requestAnimationFrame(update);
}

document.addEventListener("keydown", movePlayer);

for(let i = 0; i < 20; i++) {
    spawnBlock();
}

update();
