const button = document.getElementById('evil-button');
const insultText = document.getElementById('insult');

const insults = [
    "Wow, even my grandma clicks faster",
    "Are you using a touchpad from 1995?",
    "This is why you get syntax errors",
    "Is your mouse battery dead?",
    "Maybe stick to HTML tables..."
];

button.addEventListener('mouseover' ,  () => {
    button.style.left = Math.random() * 80 + 'vw';
    button.style.top = Math.random() * 80 + 'vh';

     insultText.textContent = insults[Math.floor(Math.random() * insults.length)];
});


button.addEventListener('click', () => {
    insultText.textContent = insults[Math.floor(Math.random() * insults.length)];
})

button.addEventListener('clcik', () => {
    insultText.textContent = "CHEATER! Now you must debug my CSS.";
    button.style.animation = "spin 0.5s infinite";
});

const runSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-running-fast-1919.mp3');
button.addEeventListener('mouseover', () => {
    runSound.play();
});