document.addEventListener('DOMContentLoaded', function () {
    const countrySelect = document.getElementById('country-select');
    const saveCountryButton = document.getElementById('save-country');
    const countryLeaderboard = document.getElementById('country-leaderboard');
    const countrySelectionWrapper = document.querySelector('.country-selection-wrapper');
    const topCountriesWrapper = document.getElementById('top-countries');
    const shareButton = document.getElementById('share-button');

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
        const selectedCountry = countrySelect.value; // Get the value of the selected option
        const countryName = countrySelect.options[countrySelect.selectedIndex]?.text || ''; // Get the text of the selected option
        
        if (selectedCountry && countryName) {
            updateLeaderboard(countryName);
            showTopCountries(); // Ensure the top countries section is shown
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

    // Function to show the top countries section
    function showTopCountries() {
        topCountriesWrapper.style.display = 'flex'; // Display the top countries section
        topCountriesWrapper.style.visibility = 'visible'; // Ensure the section is visible
        topCountriesWrapper.setAttribute('aria-hidden', 'false'); // Improve accessibility
        topCountriesWrapper.classList.add('show-top-countries'); // Optionally add a class to manage display via CSS

        // Hide the country selection wrapper
        countrySelectionWrapper.style.display = 'none'; 
    }

    // Event listener for the share button
    shareButton.addEventListener('click', () => {
        // Set up the content to share
        const shareData = {
            title: 'Cristiano Ronaldo Countdown to 1000 Goals',
            text: 'Join the countdown to Cristiano Ronaldo\'s 1000 goals and support from your country!',
            url: window.location.href // Sharing the current page URL
        };

        // Check if the Web Share API is supported
        if (navigator.share) {
            navigator.share(shareData)
                .then(() => console.log('Successfully shared'))
                .catch((error) => console.error('Error sharing:', error));
        } else {
            // Fallback message if Web Share API is not supported
            alert('Sharing is not supported on your browser. Please copy the URL and share it manually.');
        }
    });
});
