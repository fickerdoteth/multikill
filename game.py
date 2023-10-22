import pygame
import random

pygame.init()

# Constants
WIDTH, HEIGHT = 1080, 720
PLAYER_RADIUS = 5
ENEMY_RADIUS = 5  # Adjust the enemy's radius
PLAYER_SPEED = 0.2
ENEMY_SPEED = 0.1  # Adjust the enemy's speed
ACCELERATION = 0.001
BACKGROUND_COLOR = (0, 0, 0)  # RGB color

# Colors
WHITE = (255, 255, 255)
RED = (255, 0, 0)

# Initialize the screen
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Multikill")

# Create the player fish
player_x = WIDTH // 2
player_y = HEIGHT // 2

# Initialize velocity for smoother movement
player_velocity_x = 0.0
player_velocity_y = 0.0

# Create the first enemy fish
enemy1_x = random.choice([-ENEMY_RADIUS, WIDTH + ENEMY_RADIUS])
enemy1_y = random.randint(0, HEIGHT)
enemy1_direction = 1 if enemy1_x == -ENEMY_RADIUS else -1

# Create the second moving enemy fish
enemy2_x = random.choice([-ENEMY_RADIUS, WIDTH + ENEMY_RADIUS])
enemy2_y = random.randint(0, HEIGHT)
enemy2_direction = 1 if enemy2_x == -ENEMY_RADIUS else -1

# Game loop
running = True
font = pygame.font.Font(None, 36)

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Move the player fish with acceleration
    keys = pygame.key.get_pressed()
    if keys[pygame.K_UP] or keys[pygame.K_w] and player_y > 0.1:
        player_velocity_y -= ACCELERATION
    if keys[pygame.K_DOWN] or keys[pygame.K_s] and player_y < HEIGHT:
        player_velocity_y += ACCELERATION
    if keys[pygame.K_LEFT] or keys[pygame.K_a] and player_x > 0.1:
        player_velocity_x -= ACCELERATION
    if keys[pygame.K_RIGHT] or keys[pygame.K_d] and player_x < WIDTH:
        player_velocity_x += ACCELERATION

    # Apply velocity to the player's position
    player_x += player_velocity_x
    player_y += player_velocity_y

    # Prevent the player from leaving the window
    if player_x < 0:
        player_x = 0
        player_velocity_x = 0
    if player_x > WIDTH:
        player_x = WIDTH
        player_velocity_x = 0
    if player_y < 0:
        player_y = 0
        player_velocity_y = 0
    if player_y > HEIGHT:
        player_y = HEIGHT
        player_velocity_y = 0

    # Move the first enemy fish
    enemy1_x += enemy1_direction * ENEMY_SPEED

    # Check if the first enemy has left the screen and respawn it
    if enemy1_x < -ENEMY_RADIUS or enemy1_x > WIDTH + ENEMY_RADIUS:
        enemy1_x = -ENEMY_RADIUS if enemy1_direction == 1 else WIDTH + ENEMY_RADIUS
        enemy1_y = random.randint(0, HEIGHT)
        enemy1_direction = 1 if enemy1_x == -ENEMY_RADIUS else -1

    # Move the second enemy fish
    enemy2_x += enemy2_direction * (ENEMY_SPEED * 1.5)  # Adjust the speed

    # Check if the second enemy has left the screen and respawn it
    if enemy2_x < -ENEMY_RADIUS or enemy2_x > WIDTH + ENEMY_RADIUS:
        enemy2_x = -ENEMY_RADIUS if enemy2_direction == 1 else WIDTH + ENEMY_RADIUS
        enemy2_y = random.randint(0, HEIGHT)
        enemy2_direction = 1 if enemy2_x == -ENEMY_RADIUS else -1

    # Check for collisions between player and enemies
    if ((player_x - enemy1_x) ** 2 + (player_y - enemy1_y) ** 2) ** 0.5 < PLAYER_RADIUS + ENEMY_RADIUS:
        running = False
    if ((player_x - enemy2_x) ** 2 + (player_y - enemy2_y) ** 2) ** 0.5 < PLAYER_RADIUS + ENEMY_RADIUS:
        running = False

    # Slow down the player's velocity
    player_velocity_x *= 0.999
    player_velocity_y *= 0.999

    # Draw the player fish
    screen.fill(BACKGROUND_COLOR)
    pygame.draw.circle(screen, WHITE, (player_x, player_y), PLAYER_RADIUS)
    pygame.display.update()

# Clean up
pygame.quit()
