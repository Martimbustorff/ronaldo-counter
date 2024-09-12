document.addEventListener('DOMContentLoaded', function () {
    const countrySelect = document.getElementById('country-select');
    const saveCountryButton = document.getElementById('save-country');
    const countryLeaderboard = document.getElementById('country-leaderboard');
    const countrySelectionWrapper = document.querySelector('.country-selection-wrapper');
    const topCountriesWrapper = document.getElementById('top-countries');

    // Object to store dynamically mapped country codes
    const countryCodes = {};

    // Fetch and populate the country select dropdown
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            populateCountrySelect(data);
            mapCountryCodes(data);
        })
        .catch(error => console.error('Error fetching country data:', error));

    // Populate the dropdown with country options sorted alphabetically
    function populateCountrySelect(countries) {
        const sortedCountries = countries.sort((a, b) => a.name.common.localeCompare(b.name.common));
        sortedCountries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.cca2.toLowerCase();
            option.textContent = country.name.common;
            countrySelect.appendChild(option);
        });
    }

    // Dynamically map country names to their ISO codes
    function mapCountryCodes(countries) {
        countries.forEach(country => {
            countryCodes[country.name.common] = country.cca2.toLowerCase();
        });
    }

    // Save selected country and update leaderboard
    saveCountryButton.addEventListener('click', () => {
        const selectedCountry = countrySelect.options[countrySelect.selectedIndex]?.text || '';
        if (selectedCountry) {
            updateLeaderboard(selectedCountry);
            toggleVisibility(countrySelectionWrapper, topCountriesWrapper);
        } else {
            alert('Please select a country.');
        }
    });

    // Function to update the leaderboard with the top 5 countries
    function updateLeaderboard(country) {
        const countryVotes = JSON.parse(localStorage.getItem('countryVotes')) || {};
        countryVotes[country] = (countryVotes[country] || 0) + 1;
        localStorage.setItem('countryVotes', JSON.stringify(countryVotes));
        renderLeaderboard(countryVotes);
    }

    // Function to render the leaderboard
    function renderLeaderboard(countryVotes) {
        const sortedCountries = Object.entries(countryVotes).sort((a, b) => b[1] - a[1]).slice(0, 5);
        countryLeaderboard.innerHTML = '';
        sortedCountries.forEach(([country, votes]) => {
            const countryCode = countryCodes[country] || 'xx'; // Default to 'xx' if no code found
            const countryItem = document.createElement('div');
            countryItem.className = 'country-item';
            countryItem.innerHTML = `
                <img src="https://flagcdn.com/20x15/${countryCode}.png" alt="${country} flag" style="height: 20px; margin-right: 10px;">
                ${country}: ${votes} votes
            `;
            countryLeaderboard.appendChild(countryItem);
        });
    }

    // Function to toggle visibility between selection and leaderboard
    function toggleVisibility(hideElement, showElement) {
        hideElement.style.display = 'none';
        showElement.style.display = 'flex';
        showElement.setAttribute('aria-hidden', 'false'); // Improve accessibility
    }
});
