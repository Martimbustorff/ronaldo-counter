document.addEventListener('DOMContentLoaded', function () {
    const countrySelect = document.getElementById('country-select');
    const countrySearch = document.getElementById('country-search');
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

    countrySearch.addEventListener('input', function () {
        const searchQuery = this.value.toLowerCase();
        Array.from(countrySelect.options).forEach(option => {
            option.style.display = option.textContent.toLowerCase().includes(searchQuery) ? '' : 'none';
        });
    });

    saveCountryButton.addEventListener('click', function () {
        const selectedCountry = countrySelect.options[countrySelect.selectedIndex].text;
        updateCountryLeaderboard(selectedCountry);
    });

    reactionButtons.forEach(button => {
        button.addEventListener('click', function () {
            const reaction = this.dataset.reaction;
            reactions[reaction]++;
            document.getElementById(`${reaction}-count`).textContent = reactions[reaction];
        });
    });

    function updateCountryLeaderboard(selectedCountry) {
        // Simulating a vote count for demo purposes
        const votes = Math.floor(Math.random() * 100) + 1;
        const countryItem = document.createElement('div');
        countryItem.className = 'country-item';
        countryItem.innerHTML = `<img src="https://flagcdn.com/16x12/${selectedCountry.toLowerCase()}.png" alt="${selectedCountry} flag"> ${selectedCountry}: ${votes} votes`;
        countryLeaderboard.appendChild(countryItem);
    }
});
