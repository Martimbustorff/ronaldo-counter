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
            data.forEach(country => {
                const option = document.createElement('option');
                option.value = country.cca2.toLowerCase();
                option.textContent = country.name.common;
                countrySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching country data:', error));

    // Handle vote counting for reactions
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
            const countryCode = countryCodes[country];
            const countryItem = document.createElement('div');
            countryItem.className = 'country-item';
            countryItem.innerHTML = `
                <img src="https://flagcdn.com/20x15/${countryCode}.png" alt="${country} flag" style="height: 20px; margin-right: 10px;">
                ${country}: ${votes} votes
            `;
            countryLeaderboard.appendChild(countryItem);
        });
    }

    // Mapping country names to their respective ISO codes
    const countryCodes = {
        "Afghanistan": "af",
        "Albania": "al",
        "Algeria": "dz",
        "Andorra": "ad",
        "Angola": "ao",
        "Argentina": "ar",
        "Armenia": "am",
        "Australia": "au",
        "Austria": "at",
        "Azerbaijan": "az",
        "Bahamas": "bs",
        "Bahrain": "bh",
        "Bangladesh": "bd",
        "Barbados": "bb",
        "Belarus": "by",
        "Belgium": "be",
        "Belize": "bz",
        "Benin": "bj",
        "Bhutan": "bt",
        "Bolivia": "bo",
        "Bosnia and Herzegovina": "ba",
        "Botswana": "bw",
        "Brazil": "br",
        "Brunei": "bn",
        "Bulgaria": "bg",
        "Burkina Faso": "bf",
        "Burundi": "bi",
        "Cambodia": "kh",
        "Cameroon": "cm",
        "Canada": "ca",
        "Cape Verde": "cv",
        "Central African Republic": "cf",
        "Chad": "td",
        "Chile": "cl",
        "China": "cn",
        "Colombia": "co",
        "Comoros": "km",
        "Congo (Brazzaville)": "cg",
        "Congo (Kinshasa)": "cd",
        "Costa Rica": "cr",
        "Croatia": "hr",
        "Cuba": "cu",
        "Cyprus": "cy",
        "Czech Republic": "cz",
        "Denmark": "dk",
        "Djibouti": "dj",
        "Dominica": "dm",
        "Dominican Republic": "do",
        "Ecuador": "ec",
        "Egypt": "eg",
        "El Salvador": "sv",
        "Equatorial Guinea": "gq",
        "Eritrea": "er",
        "Estonia": "ee",
        "Eswatini": "sz",
        "Ethiopia": "et",
        "Fiji": "fj",
        "Finland": "fi",
        "France": "fr",
        "Gabon": "ga",
        "Gambia": "gm",
        "Georgia": "ge",
        "Germany": "de",
        "Ghana": "gh",
        "Greece": "gr",
        "Grenada": "gd",
        "Guatemala": "gt",
        "Guinea": "gn",
        "Guinea-Bissau": "gw",
        "Guyana": "gy",
        "Haiti": "ht",
        "Honduras": "hn",
        "Hungary": "hu",
        "Iceland": "is",
        "India": "in",
        "Indonesia": "id",
        "Iran": "ir",
        "Iraq": "iq",
        "Ireland": "ie",
        "Israel": "il",
        "Italy": "it",
        "Jamaica": "jm",
        "Japan": "jp",
        "Jordan": "jo",
        "Kazakhstan": "kz",
        "Kenya": "ke",
        "Kiribati": "ki",
        "Kuwait": "kw",
        "Kyrgyzstan": "kg",
        "Laos": "la",
        "Latvia": "lv",
        "Lebanon": "lb",
        "Lesotho": "ls",
        "Liberia": "lr",
        "Libya": "ly",
        "Liechtenstein": "li",
        "Lithuania": "lt",
        "Luxembourg": "lu",
        "Madagascar": "mg",
        "Malawi": "mw",
        "Malaysia": "my",
        "Maldives": "mv",
        "Mali": "ml",
        "Malta": "mt",
        "Mauritania": "mr",
        "Mauritius": "mu",
        "Mexico": "mx",
        "Moldova": "md",
        "Monaco": "mc",
        "Mongolia": "mn",
        "Montenegro": "me",
        "Morocco": "ma",
        "Mozambique": "mz",
        "Myanmar": "mm",
        "Namibia": "na",
        "Nauru": "nr",
        "Nepal": "np",
        "Netherlands": "nl",
        "New Zealand": "nz",
        "Nicaragua": "ni",
        "Niger": "ne",
        "Nigeria": "ng",
        "North Macedonia": "mk",
        "Norway": "no",
        "Oman": "om",
        "Pakistan": "pk",
        "Palau": "pw",
        "Panama": "pa",
        "Papua New Guinea": "pg",
        "Paraguay": "py",
        "Peru": "pe",
        "Philippines": "ph",
        "Poland": "pl",
        "Portugal": "pt",
        "Qatar": "qa",
        "Romania": "ro",
        "Russia": "ru",
        "Rwanda": "rw",
        "Saint Kitts and Nevis": "kn",
        "Saint Lucia": "lc",
        "Saint Vincent and the Grenadines": "vc",
        "Samoa": "ws",
        "San Marino": "sm",
        "Sao Tome and Principe": "st",
        "Saudi Arabia": "sa",
        "Senegal": "sn",
        "Serbia": "rs",
        "Seychelles": "sc",
        "Sierra Leone": "sl",
        "Singapore": "sg",
        "Slovakia": "sk",
        "Slovenia": "si",
        "Solomon Islands": "sb",
        "Somalia": "so",
        "South Africa": "za",
        "South Korea": "kr",
        "South Sudan": "ss",
        "Spain": "es",
        "Sri Lanka": "lk",
        "Sudan": "sd",
        "Suriname": "sr",
        "Sweden": "se",
        "Switzerland": "ch",
        "Syria": "sy",
        "Taiwan": "tw",
        "Tajikistan": "tj",
        "Tanzania": "tz",
        "Thailand": "th",
        "Togo": "tg",
        "Tonga": "to",
        "Trinidad and Tobago": "tt",
        "Tunisia": "tn",
        "Turkey": "tr",
        "Turkmenistan": "tm",
        "Tuvalu": "tv",
        "Uganda": "ug",
        "Ukraine": "ua",
        "United Arab Emirates": "ae",
        "United Kingdom": "gb",
        "United States": "us",
        "Uruguay": "uy",
        "Uzbekistan": "uz",
        "Vanuatu": "vu",
        "Vatican City": "va",
        "Venezuela": "ve",
        "Vietnam": "vn",
        "Yemen": "ye",
        "Zambia": "zm",
        "Zimbabwe": "zw"
    };
});
