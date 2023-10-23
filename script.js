function handleEnemies() {
  if (enemies.length < maxEnemies) {
    createEnemy();
  }

  for (let i = enemies.length - 1; i >= 0; i--) {
    const enemy = enemies[i];
    enemy.x += enemy.speedX;

    if (enemy.x < -20 || enemy.x > canvas.width + 20) {
      enemies.splice(i, 1);
      createEnemy();
    }

    const dx = enemy.x - player.x;
    const dy = enemy.y - player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < player.radius + enemy.radius) {
      if (enemy.radius < player.radius) {
        // Calculate points based on the "grow by" factor
        let points = 0;
        if (enemy.radius >= 1 && enemy.radius <= 4) {
          player.radius += 1; // Grow by 1
          points = 1;
        } else if (enemy.radius >= 5 && enemy.radius <= 55) {
          player.radius += 2; // Grow by 2
          points = 2;
        } else if (enemy.radius >= 56 && enemy.radius <= 80) {
          player.radius += 3; // Grow by 3
          points = 3;
        } else if (enemy.radius >= 81 && enemy.radius <= 90) {
          player.radius += 7; // Grow by 7
          points = 7;
        } else if (enemy.radius >= 91 && enemy.radius <= 100) {
          player.radius += 10; // Grow by 10
          points = 10;
        }

        player.score += points; // Update the player's score
        enemies.splice(i, 1); // Remove the smaller enemy
      } else {
        // Player touches a bigger enemy, the game continues without removing the bigger enemy
        continue;
      }
    }
  }
}
