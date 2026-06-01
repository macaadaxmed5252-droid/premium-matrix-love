const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "01010101LOVE";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#f43f5e"; // rose-500 (Tailwind color)
    ctx.font = `bold ${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Logic-ka animation-ka
const countdownEl = document.getElementById('countdown');
const msgContainer = document.getElementById('message-container');
const dynamicText = document.getElementById('dynamic-text');
const heartContainer = document.getElementById('heart-container');

let count = 3;
const words = ["You", "Are", "My", "Everything"];
let wordIndex = 0;

const timer = setInterval(() => {
    if (count > 0) {
        countdownEl.innerText = count;
        count--;
    } else {
        clearInterval(timer);
        countdownEl.classList.add('hidden');
        msgContainer.classList.remove('hidden');
        showWords();
    }
}, 1000);

function showWords() {
    if (wordIndex < words.length) {
        dynamicText.innerText = words[wordIndex];
        // Tailwind animation classes ayaa lagu dari karaa halkan
        dynamicText.classList.add('animate-pulse');
        
        wordIndex++;
        setTimeout(() => {
            dynamicText.classList.remove('animate-pulse');
            showWords();
        }, 1000);
    } else {
        dynamicText.classList.add('hidden');
        heartContainer.classList.remove('hidden');
        heartContainer.classList.add('flex'); // Hubi inuu center noqdo
    }
}

setInterval(drawMatrix, 35);

// Resize canvas if window changes
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});