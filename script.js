$(document).ready(function () {
    let reactions = { heart: 0, muscle: 0, prayer: 0 };
    let votes = { 'Portugal': 0, 'Brazil': 0, 'Spain': 0, 'United States': 0, 'United Kingdom': 0 };

    $('.icon').click(function () {
        const type = $(this).data('type');
        reactions[type]++;
        $(`#${type}-count`).text(reactions[type]);
    });

    $('#save-country').click(function () {
        const selectedCountry = $('#country-select').val();
        votes[selectedCountry] = (votes[selectedCountry] || 0) + 1;
        updateTopCountries();
        renderChart();
    });

    function updateTopCountries() {
        const topCountries = Object.entries(votes)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        $('.top-countries').empty().append('<h3>Top Supporting Countries</h3>');
        topCountries.forEach(([country, count]) => {
            $('.top-countries').append(`<div class="country"><img src="flags/${country.toLowerCase()}.png" alt="${country} Flag"> ${country}: ${count} votes</div>`);
        });
    }

    function renderChart() {
        const ctx = document.getElementById('countryChart').getContext('2d');
        const topVotes = Object.entries(votes).sort((a, b) => b[1] - a[1]).slice(0, 5);
        const countries = topVotes.map(vote => vote[0]);
        const counts = topVotes.map(vote => vote[1]);

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: countries,
                datasets: [{
                    label: '# of Votes',
                    data: counts,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }
});
