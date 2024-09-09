document.addEventListener('DOMContentLoaded', function() {
    populateCountryDropdown();

    document.getElementById('save-button').addEventListener('click', function() {
        const inputCountry = document.getElementById('country-input').value.toLowerCase();
        const dropdownCountry = document.getElementById('country-dropdown').value;

        if (inputCountry) {
            updateCountryLeaderboard(inputCountry);
        } else if (dropdownCountry) {
            updateCountryLeaderboard(dropdownCountry);
        } else {
            alert('Please select or enter a valid country.');
        }
    });
});

function populateCountryDropdown() {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            const dropdown = document.getElementById('country-dropdown');
            data.sort((a, b) => a.name.common.localeCompare(b.name.common));
            data.forEach(country => {
                const option = document.createElement('option');
                option.value = country.cca2.toLowerCase();
                option.textContent = country.name.common;
                dropdown.appendChild(option);
            });
        });
}

function updateCountryLeaderboard(selectedCountry) {
    const votes = Math.floor(Math.random() * 100) + 1; // Example vote count
    const countryItem = document.createElement('div');
    countryItem.className = 'country-item';
    countryItem.innerHTML = `<img src="https://flagcdn.com/16x12/${selectedCountry}.png" alt="${selectedCountry} flag" style="height: 20px; margin-right: 10px;"> ${selectedCountry.toUpperCase()}: ${votes} votes`;
    const countryLeaderboard = document.getElementById('country-leaderboard');
    countryLeaderboard.innerHTML = ''; // Clear previous content
    countryLeaderboard.appendChild(countryItem);
}
