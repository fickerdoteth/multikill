<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Multikill Game</title>
  </head>
  <body>
    <canvas id="gameCanvas" width="1080" height="720"></canvas>
    <script>
      const canvas = document.getElementById("gameCanvas");
      const ctx = canvas.getContext("2d");

      const WIDTH = 1080;
      const HEIGHT = 720;
      const PLAYER_RADIUS = 5;
      const ENEMY_RADIUS = 5;
      const PLAYER_SPEED = 0.2;
      const ENEMY_SPEED = 0.1;
      const ACCELERATION = 0.001;
      const BACKGROUND_COLOR = "#000";
      const WHITE = "#FFF";
      const RED = "#F00";

      const player = {
        x: WIDTH / 2,
        y: HEIGHT / 2,
        velocityX: 0,
        velocityY: 0,
      };

      const enemy1 = {
        x: getRandomStartPosition(),
        y: getRandomYPosition(),
        direction: getRandomDirection(),
      };

      const enemy2 = {
        x: getRandomStartPosition(),
        y: getRandomYPosition(),
        direction: getRandomDirection(),
      };

      const circle = {
        x: 0,
        y: getRandomYPosition(),
        speed: 0.2,
      };

      function getRandomStartPosition() {
        return Math.random() < 0.5 ? -ENEMY_RADIUS : WIDTH + ENEMY_RADIUS;
      }

      function getRandomDirection() {
        return Math.random() < 0.5 ? 1 : -1;
      }

      function getRandomYPosition() {
        return Math.floor(Math.random() * HEIGHT);
      }

      function clearCanvas() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
      }

      function drawPlayer() {
        ctx.fillStyle = WHITE;
        ctx.beginPath();
        ctx.arc(player.x, player.y, PLAYER_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      function drawEnemy(enemy) {
        ctx.fillStyle = RED;
        ctx.beginPath();
        ctx.arc(enemy.x, enemy.y, ENEMY_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      function drawGame() {
        clearCanvas();
        drawPlayer();
        drawEnemy(enemy1);
        drawEnemy(enemy2);
        drawEnemy(circle);

        requestAnimationFrame(drawGame);
      }

      function handleCollision() {
        if (
          Math.sqrt((player.x - enemy1.x) ** 2 + (player.y - enemy1.y) ** 2) <
            PLAYER_RADIUS + ENEMY_RADIUS ||
          Math.sqrt((player.x - enemy2.x) ** 2 + (player.y - enemy2.y) ** 2) <
            PLAYER_RADIUS + ENEMY_RADIUS ||
          Math.sqrt((player.x - circle.x) ** 2 + (player.y - circle.y) ** 2) <
            PLAYER_RADIUS + ENEMY_RADIUS
        ) {
          cancelAnimationFrame(drawGame);
        }
      }

      function update() {
        const keys = {};
        document.addEventListener("keydown", (event) => {
          keys[event.key] = true;
        });
        document.addEventListener("keyup", (event) => {
          keys[event.key] = false;
        });

        if ((keys["ArrowUp"] || keys["w"]) && player.y > 0.1) {
          player.velocityY -= ACCELERATION;
        }
        if ((keys["ArrowDown"] || keys["s"]) && player.y < HEIGHT) {
          player.velocityY += ACCELERATION;
        }
        if ((keys["ArrowLeft"] || keys["a"]) && player.x > 0.1) {
          player.velocityX -= ACCELERATION;
        }
        if ((keys["ArrowRight"] || keys["d"]) && player.x < WIDTH) {
          player.velocityX += ACCELERATION;
        }

        player.x += player.velocityX;
        player.y += player.velocityY;

        if (player.x < 0) {
          player.x = 0;
          player.velocityX = 0;
        }
        if (player.x > WIDTH) {
          player.x = WIDTH;
          player.velocityX = 0;
        }
        if (player.y < 0) {
          player.y = 0;
          player.velocityY = 0;
        }
        if (player.y > HEIGHT) {
          player.y = HEIGHT;
          player.velocityY = 0;
        }

        enemy1.x += enemy1.direction * ENEMY_SPEED;
        if (
          enemy1.x < -ENEMY_RADIUS ||
          enemy1.x > WIDTH + ENEMY_RADIUS
        ) {
          enemy1.x = enemy1.direction === 1 ? -ENEMY_RADIUS : WIDTH + ENEMY_RADIUS;
          enemy1.y = getRandomYPosition();
          enemy1.direction = getRandomDirection();
        }

        enemy2.x += enemy2.direction * (ENEMY_SPEED * 1.5);
        if (
          enemy2.x < -ENEMY_RADIUS ||
          enemy2.x > WIDTH + ENEMY_RADIUS
        ) {
          enemy2.x = enemy2.direction === 1 ? -ENEMY_RADIUS : WIDTH + ENEMY_RADIUS;
          enemy2.y = getRandomYPosition();
          enemy2.direction = getRandomDirection();
        }

        circle.x += circle.speed;
        if (circle.x > WIDTH) {
          circle.x = -ENEMY_RADIUS;
          circle.y = getRandomYPosition();
        }

        handleCollision();
        requestAnimationFrame(update);
      }

      update();
    </script>
  </body>
</html>
