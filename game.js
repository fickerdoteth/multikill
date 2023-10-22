const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 30,
    dx: 0,
    dy: 0,
    speed: 4
};

const fishArray = [];

function drawPlayer() {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
    ctx.fill();
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

function spawnFish() {
    const size = Math.random() * (player.size - 10) + 10;
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;

    fishArray.push({
        x,
        y,
        size
    });
}

function drawFish() {
    ctx.fillStyle = "blue";
    for(let fish of fishArray) {
        ctx.beginPath();
        ctx.arc(fish.x, fish.y, fish.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function eatFish() {
    for(let i = 0; i < fishArray.length; i++) {
        let fish = fishArray[i];
        let distance = Math.sqrt((player.x - fish.x) ** 2 + (player.y - fish.y) ** 2);

        if(distance < player.size + fish.size) {
            fishArray.splice(i, 1);
            player.size += 1;
            spawnFish();
        }
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawFish();
    updatePlayer();
    eatFish();
    requestAnimationFrame(update);
}

document.addEventListener("keydown", movePlayer);

for(let i = 0; i < 20; i++) {
    spawnFish();
}

update();
