// Reaction counters
let heartCount = 0;
let muscleCount = 0;
let prayCount = 0;

// Event listeners for reaction buttons
document.getElementById('heart').addEventListener('click', () => {
    heartCount++;
    document.getElementById('heart-count').textContent = heartCount;
});

document.getElementById('muscle').addEventListener('click', () => {
    muscleCount++;
    document.getElementById('muscle-count').textContent = muscleCount;
});

document.getElementById('pray').addEventListener('click', () => {
    prayCount++;
    document.getElementById('pray-count').textContent = prayCount;
});

// Handling country selection and updating the top countries
const topCountries = {};
const countrySelect = document.getElementById('country-select');

countrySelect.addEventListener('change', (event) => {
    const selectedCountry = event.target.value;
    topCountries[selectedCountry] = (topCountries[selectedCountry] || 0) + 1;
    updateTopCountries();
});

function updateTopCountries() {
    const sortedCountries = Object.entries(topCountries).sort((a, b) => b[1] - a[1]);
    const topCountriesList = sortedCountries.slice(0, 5).map(([country, count]) => `${country.toUpperCase()}: ${count} votes`).join('<br>');
    document.getElementById('top-countries').innerHTML = topCountriesList;
}
