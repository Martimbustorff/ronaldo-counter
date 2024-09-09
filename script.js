let initialGoalCount = 909; // Ronaldo's current official goals (adjust if necessary)
let celebrationPlayed = false; // Prevent multiple celebrations

// Function to simulate current goals and update the counter
function updateCounter(goalsLeft) {
    const goalCounter = document.getElementById('goal-counter');
    if (goalsLeft <= 0) {
        goalCounter.innerText = `1000 Goals! 🎉`;
        if (!celebrationPlayed) {
            triggerCelebration();
            celebrationPlayed = true;
        }
    } else {
        goalCounter.innerText = `${goalsLeft.toString().padStart(4, '0')} Goals to 1000`;
    }
}

// Share button functionality
function shareCountdown() {
    const shareData = {
        title: 'Ronaldo 1000 Goals Countdown',
        text: 'Join me in watching Ronaldo reach 1000 goals! Only a few more left!',
        url: window.location.href
    };
    navigator.share(shareData).catch(console.error);
}

// Celebration effects: confetti and fireworks
function triggerCelebration() {
    const canvas = document.getElementById('celebrationCanvas');
    const context = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }

    alert("🎉 Ronaldo has reached 1000 goals! Celebrate!");
}

// Reaction tracking logic
let reactions = {
    heart: 0,
    strong: 0,
    prayer: 0
};

function addReaction(type) {
    reactions[type]++;
    updateReactions();
}

function updateReactions() {
    document.getElementById('heart-count').innerText = `❤️ ${reactions.heart}`;
    document.getElementById('strong-count').innerText = `💪 ${reactions.strong}`;
    document.getElementById('prayer-count').innerText = `🙏🏻 ${reactions.prayer}`;
}

// Initialize
updateCounter(91); // Start with 91 goals remaining
