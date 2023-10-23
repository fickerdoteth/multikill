import pygame

pygame.init()

# Constants
WIDTH, HEIGHT = 1080, 720
PLAYER_RADIUS = 5
PLAYER_SPEED = 0.2
ACCELERATION = 0.001  # Acceleration factor
BACKGROUND_COLOR = (0, 0, 0)  # RGB color

# Colors
WHITE = (255, 255, 255)

# Initialize the screen
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Multikill")

# Create the player fish
player_x = WIDTH // 2
player_y = HEIGHT // 2

# Initialize velocity for smoother movement
player_velocity_x = 0.
player_velocity_y = 0.

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

    # Slow down the player's velocity
    player_velocity_x *= .999
    player_velocity_y *= .999

    # Draw the player fish
    screen.fill(BACKGROUND_COLOR)
    pygame.draw.circle(screen, WHITE, (player_x, player_y), PLAYER_RADIUS)
    pygame.display.update()

# Clean up
pygame.quit()

