document.addEventListener('DOMContentLoaded', function () {
    const countrySelect = document.getElementById('country-select');
    const saveCountryButton = document.getElementById('save-country');
    const countryLeaderboard = document.getElementById('country-leaderboard');
    const reactionButtons = document.querySelectorAll('.reaction-button');
    const reactions = { heart: 0, muscle: 0, pray: 0 };

    // Populate country select with all available countries
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            data.sort((a, b) => a.name.common.localeCompare(b.name.common)).forEach(country => {
                const option = document.createElement('option');
                option.value = country.cca2;
                option.textContent = country.name.common;
                countrySelect.appendChild(option);
            });
        });

    // Handle vote counting
    reactionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const reactionType = button.getAttribute('data-reaction');
            reactions[reactionType]++;
            document.getElementById(`${reactionType}-count`).textContent = reactions[reactionType];
        });
    });

    // Save selected country and update leaderboard
    saveCountryButton.addEventListener('click', () => {
        const selectedCountry = countrySelect.options[countrySelect.selectedIndex].text;
        updateLeaderboard(selectedCountry);
    });

    // Update leaderboard with the top 5 countries
    function updateLeaderboard(country) {
        let countryVotes = JSON.parse(localStorage.getItem('countryVotes')) || {};
        countryVotes[country] = (countryVotes[country] || 0) + 1;
        localStorage.setItem('countryVotes', JSON.stringify(countryVotes));

        const sortedCountries = Object.entries(countryVotes).sort((a, b) => b[1] - a[1]).slice(0, 5);
        countryLeaderboard.innerHTML = '';
        sortedCountries.forEach(([country, votes]) => {
            const countryItem = document.createElement('div');
            countryItem.className = 'country-item';
            countryItem.innerHTML = `<img src="https://flagcdn.com/16x12/${country.toLowerCase()}.png" alt="${country} flag"> ${country}: ${votes} votes`;
            countryLeaderboard.appendChild(countryItem);
        });
    }
});
