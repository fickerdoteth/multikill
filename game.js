const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const playerFish = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 15,
    color: 'blue',
    speed: 5,
};

const smallerFishes = [];
const numSmallerFishes = 50;

for (let i = 0; i < numSmallerFishes; i++) {
    smallerFishes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 5,
        color: 'green',
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = playerFish.color;
    ctx.beginPath();
    ctx.arc(playerFish.x, playerFish.y, playerFish.radius, 0, Math.PI * 2);
    ctx.fill();

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                playerFish.y -= playerFish.speed;
                break;
            case 'ArrowDown':
                playerFish.y += playerFish.speed;
                break;
            case 'ArrowLeft':
                playerFish.x -= playerFish.speed;
                break;
            case 'ArrowRight':
                playerFish.x += playerFish.speed;
                break;
        }
    });

    smallerFishes.forEach((fish) => {
        ctx.fillStyle = fish.color;
        ctx.beginPath();
        ctx.arc(fish.x, fish.y, fish.radius, 0, Math.PI * 2);
        ctx.fill();

        const dx = playerFish.x - fish.x;
        const dy = playerFish.y - fish.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < playerFish.radius + fish.radius) {
            smallerFishes.splice(smallerFishes.indexOf(fish), 1);
            playerFish.radius += 1;
        }
    });

    requestAnimationFrame(gameLoop);
}

gameLoop();
