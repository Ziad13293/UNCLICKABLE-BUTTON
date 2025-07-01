const fly = document.getElementById('fly');
const message = document.getElementById('message');
const timer = document.getElementById('timer');
const result = document.getElementById('result');

let energy = 100;
let gameOver = false;
let flyClickCount = 0;


function moveFly() {
    if (gameOver) return;
    
    const speed = 1 + (energy / 20); 
    const moveX = Math.random() * (window.innerWidth - 100);
    const moveY = Math.random() * (window.innerHeight - 100);
    
    fly.style.left = moveX + 'px';
    fly.style.top = moveY + 'px';
    
    setTimeout(moveFly, 2000 / speed);
}


const energyInterval = setInterval(() => {
    if (energy > 0 && !gameOver) {
        energy -= 2;
        timer.textContent = `Energy: ${energy}%`;
        fly.style.opacity = 0.6 + (energy / 250);
        
        if (energy <= 30) {
            message.textContent = "The fly is getting sleepy...";
            fly.style.animation = "buzz 0.4s infinite";
        }
        
        if (energy <= 0) {
            gameOver = true;
            message.textContent = "QUICK! Click the exhausted fly!";
            fly.style.animation = "none";
            fly.textContent = "💤";
            fly.style.fontSize = "60px";
        }
    }
}, 800);


fly.addEventListener('click', () => {
    if (gameOver) {
        flyClickCount++;
        if (flyClickCount === 1) {
            result.textContent = "🎉 FINALLY, You killed that thing!";
            fly.textContent = "💥";
            fly.style.fontSize = "80px";
            fly.style.transform = "rotate(180deg)";
            message.textContent = "Reload page to play again!";
            clearInterval(energyInterval);
        }
    } else {
        message.textContent = "Too slow! Wait until it's tired!";
        setTimeout(() => {
            if (!gameOver) message.textContent = "Keep waiting...";
        }, 1500);
    }
});

// Start game
moveFly();