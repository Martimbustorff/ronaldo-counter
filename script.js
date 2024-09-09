let heartCount = 0;
let strongCount = 0;
let prayerCount = 0;
let countryStats = {};

function addReaction(type) {
    if (type === 'heart') {
        heartCount++;
        document.getElementById('heart-count').textContent = `❤️ ${heartCount}`;
    } else if (type === 'strong') {
        strongCount++;
        document.getElementById('strong-count').textContent = `💪 ${strongCount}`;
    } else if (type === 'prayer') {
        prayerCount++;
        document.getElementById('prayer-count').textContent = `🙏🏻 ${prayerCount}`;
    }
}

function shareCountdown() {
    alert('Share this countdown with your friends!');
}

function updateCountry() {
    const countrySelect = document.getElementById('country-select');
    const selectedCountry = countrySelect.options[countrySelect.selectedIndex].text;

    if (selectedCountry !== "Select Country") {
        if (!countryStats[selectedCountry]) {
            countryStats[selectedCountry] = 1;
        } else {
            countryStats[selectedCountry]++;
        }
        updateLeaderboard();
    }
}

function updateLeaderboard() {
    const leaderboard = document.getElementById('country-leaderboard');
    leaderboard.innerHTML = '';

    const sortedCountries = Object.entries(countryStats).sort((a, b) => b[1] - a[1]);

    sortedCountries.forEach(([country, count]) => {
        const li = document.createElement('li');
        li.textContent = `${country}: ${count} fans`;
        leaderboard.appendChild(li);
    });
}
