const API_KEY = 'YOUR_API_KEY'; // Replace with your Football-Data API key
const playerId = 44; // Use Ronaldo's player ID from the API provider
let initialGoalCount = 909; // Ronaldo's current official goals (adjust if necessary)
let celebrationPlayed = false; // Prevent multiple celebrations

// Fetch Ronaldo's current goal count using Football-Data.org API
async function fetchGoals() {
    try {
        const response = await fetch(`https://api.football-data.org/v2/players/${playerId}`, {
            headers: { 'X-Auth-Token': API_KEY }
        });
        const data = await response.json();

        // Assuming data.goals.total contains the latest goal count from the API
        const currentGoals = data.goals.total;
        const goalsLeft = initialGoalCount - currentGoals;
        updateCounter(goalsLeft);
    } catch (error) {
        console.error('Error fetching goal data:', error);
        alert('Error fetching goal data, please try again later.');
    }
}

// Update the counter and trigger celebration when goals reach 1000
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

    // Fireworks simulation code or use a library like confetti.js
    // Simple confetti effect
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Trigger confetti using an external library or custom draw logic
    // Example with a confetti effect using canvas (simplified)
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

// Reaction tracking logic (same as before)
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
fetchGoals();
