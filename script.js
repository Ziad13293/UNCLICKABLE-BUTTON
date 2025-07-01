document.addEventListener('DOMContentLoaded', function() {
    const gameArea = document.getElementById('game-area');
    const message = document.getElementById('game-message');
    const timeDisplay = document.getElementById('time');
    const scoreDisplay = document.getElementById('score');
    
    let score = 0;
    let timeLeft = 60;
    let gameActive = true;
    const bugTypes = [
        { emoji: '🪰', class: 'fly', speed: 2, health: 1 },
        { emoji: '🪳', class: 'roach', speed: 1.5, health: 2 },
        { emoji: '🦟', class: 'mosquito', speed: 3, health: 1 },
        { emoji: '🐞', class: 'beetle', speed: 0.8, health: 3 }
    ];

    // Game timer
    const timer = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);

    // Create bugs
    setInterval(createBug, 1500);

    function createBug() {
        if (!gameActive) return;
        
        const type = bugTypes[Math.floor(Math.random() * bugTypes.length)];
        const bug = document.createElement('div');
        bug.className = `bug ${type.class}`;
        bug.innerHTML = `
            <div>${type.emoji}</div>
            <div class="health-bar" style="width: ${type.health * 16.6}px"></div>
        `;
        
        // Set initial position
        updatePosition(bug);
        gameArea.appendChild(bug);
        
        // Store bug data
        bug.dataset.health = type.health;
        bug.dataset.maxHealth = type.health;
        bug.dataset.speed = type.speed;
        
        // Movement
        moveBug(bug);
        
        // Click handler
        bug.addEventListener('click', () => squashBug(bug));
    }

    function moveBug(bug) {
        if (!gameActive) return;
        
        updatePosition(bug);
        setTimeout(() => moveBug(bug), 2000 / bug.dataset.speed);
    }

    function updatePosition(bug) {
        const x = Math.random() * (gameArea.offsetWidth - 50);
        const y = Math.random() * (gameArea.offsetHeight - 50);
        bug.style.left = x + 'px';
        bug.style.top = y + 'px';
    }

    function squashBug(bug) {
        if (!gameActive) return;
        
        bug.dataset.health--;
        const healthBar = bug.querySelector('.health-bar');
        healthBar.style.width = `${(bug.dataset.health / bug.dataset.maxHealth) * 50}px`;
        
        if (bug.dataset.health <= 0) {
            // Bug killed
            score += parseInt(bug.dataset.maxHealth);
            scoreDisplay.textContent = score;
            bug.innerHTML = '💀';
            setTimeout(() => bug.remove(), 300);
            message.textContent = `Squashed a ${bug.className.split(' ')[1]}! +${bug.dataset.maxHealth} points`;
        } else {
            message.textContent = `Hit! ${bug.dataset.health} hits left!`;
            bug.style.transform = 'scale(1.2)';
            setTimeout(() => bug.style.transform = 'scale(1)', 200);
        }
    }

    function endGame() {
        gameActive = false;
        clearInterval(timer);
        message.textContent = `Game Over! Final Score: ${score}`;
    }
});