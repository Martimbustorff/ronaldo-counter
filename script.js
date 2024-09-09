document.addEventListener('DOMContentLoaded', function () {
    const countrySelect = document.getElementById('country-select');
    const countrySearch = document.getElementById('country-search');
    const saveCountryButton = document.getElementById('save-country');
    const countryLeaderboard = document.getElementById('country-leaderboard');
    const reactionButtons = document.querySelectorAll('.reaction-button');

    const reactions = {
        heart: 0,
        muscle: 0,
        pray: 0
    };

    // Fetch and populate countries with flags, sort alphabetically
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            const countries = data.map(country => ({
                name: country.name.common,
                flag: country.flags.svg
            })).sort((a, b) => a.name.localeCompare(b.name));

            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country.name;
                option.textContent = country.name;
                option.style.backgroundImage = `url(${country.flag})`;
                countrySelect.appendChild(option);
            });
        });

    // Filter dropdown options based on search input
    countrySearch.addEventListener('input', function () {
        const searchQuery = this.value.toLowerCase();
        Array.from(countrySelect.options).forEach(option => {
            option.style.display = option.textContent.toLowerCase().includes(searchQuery) ? '' : 'none';
        });
    });

    // Save selected country and update leaderboard
    saveCountryButton.addEventListener('click', function () {
        const selectedCountry = countrySelect.options[countrySelect.selectedIndex].text;
        updateCountryLeaderboard(selectedCountry);
    });

    // Handle reaction button clicks
    reactionButtons.forEach(button => {
        button.addEventListener('click', function () {
            const reaction = this.dataset.reaction;
            reactions[reaction]++;
            document.getElementById(`${reaction}-count`).textContent = reactions[reaction];
        });
    });

    // Update leaderboard dynamically with the selected country
    function updateCountryLeaderboard(selectedCountry) {
        const votes = Math.floor(Math.random() * 100) + 1; // Example vote count
        const countryItem = document.createElement('div');
        countryItem.className = 'country-item';
        countryItem.innerHTML = `<img src="https://flagcdn.com/16x12/${selectedCountry.toLowerCase()}.png" alt="${selectedCountry} flag"> ${selectedCountry}: ${votes} votes`;
        countryLeaderboard.appendChild(countryItem);
    }
});
