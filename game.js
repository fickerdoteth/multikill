const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
    x: canvas.width / 2 - 15,  // Adjusting starting x to represent the top-left of block
    y: canvas.height / 2 - 15, // Adjusting starting y
    size: 30,
    dx: 0,
    dy: 0,
    speed: 4
};

const blocksArray = [];

function drawPlayer() {
    ctx.fillStyle = "red";
    ctx.fillRect(player.x, player.y, player.size, player.size);  // Drawing player as a rectangle
}

function updatePlayer() {
    player.x += player.dx;
    player.y += player.dy;
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
    const x = Math.random() * (canvas.width - size); // Ensuring block doesn't spawn outside canvas
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
        ctx.fillRect(block.x, block.y, block.size, block.size);  // Drawing blocks as rectangles
    }
}

function eatBlock() {
    for(let i = 0; i < blocksArray.length; i++) {
        let block = blocksArray[i];
        let dx = player.x - block.x;
        let dy = player.y - block.y;
        let widthSum = player.size + block.size;

        if (dx < widthSum && dx + player.size > 0 && dy < widthSum && dy + player.size > 0) {  // AABB collision detection
            blocksArray.splice(i, 1);
            player.size += 1;  // Increase player size when block is eaten
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
