document.getElementById('save-button').addEventListener('click', function() {
    const inputCountry = document.getElementById('country-input').value.toLowerCase();
    const dropdownCountry = document.getElementById('country-dropdown').value.toLowerCase();

    if (inputCountry) {
        // Sync dropdown with input
        document.getElementById('country-dropdown').value = inputCountry;
        updateCountryLeaderboard(inputCountry);
    } else {
        alert('Please enter a valid country name.');
    }
});

function updateCountryLeaderboard(selectedCountry) {
    const countryCode = getCountryCode(selectedCountry); // Convert to correct ISO code if available
    const votes = Math.floor(Math.random() * 100) + 1; // Random vote count for demo
    const countryItem = document.createElement('div');
    countryItem.className = 'country-item';

    if (countryCode) {
        countryItem.innerHTML = `<img src="https://flagcdn.com/16x12/${countryCode}.png" alt="${selectedCountry} flag" style="height: 20px; margin-right: 10px;"> ${selectedCountry}: ${votes} votes`;
    } else {
        countryItem.innerHTML = `${selectedCountry}: ${votes} votes`;
    }

    document.getElementById('country-leaderboard').appendChild(countryItem);
}

function getCountryCode(countryName) {
    const countryCodes = {
        portugal: 'pt',
        bangladesh: 'bd',
        // Expand this list with more countries
    };
    return countryCodes[countryName.toLowerCase()] || null;
}
