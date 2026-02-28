/**
 * market-hub.js
 * Handles Chart.js initialization and RSS News Feed fetching for the Maryland Real Estate Hub.
 */

document.addEventListener("DOMContentLoaded", () => {
    initMarketChart();
    fetchNewsFeed();
});

function initMarketChart() {
    const ctx = document.getElementById('marketChart');
    if (!ctx) return;

    // Simulated / Representative Data for Maryland Market
    // In a production environment, this would be fetched via an API or the local JSON file.
    const months = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
    const medianPrices = [415000, 420000, 418000, 410000, 412000, 408000, 415000];
    const inventory = [12500, 13100, 13800, 14200, 12800, 11500, 12000];

    // Update Pulse Cards
    document.getElementById('val-median-price').innerText = '$415K';
    document.getElementById('val-active-inventory').innerText = '12.0K';

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Median Listing Price ($)',
                    data: medianPrices,
                    borderColor: '#D1B06B', // Luxury Gold
                    backgroundColor: 'rgba(209, 176, 107, 0.1)',
                    borderWidth: 3,
                    pointBackgroundColor: '#FFFFFF',
                    pointBorderColor: '#D1B06B',
                    pointBorderWidth: 2,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                    tension: 0.4, // Smooth curved lines
                    yAxisID: 'y',
                    fill: true
                },
                {
                    label: 'Active Inventory',
                    data: inventory,
                    borderColor: '#4A5568', // Slate Gray
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    pointBackgroundColor: '#4A5568',
                    pointRadius: 4,
                    tension: 0.4,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            family: 'Inter, sans-serif',
                            size: 13,
                            weight: '500'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(26, 26, 26, 0.9)',
                    titleFont: { family: 'Inter', size: 14 },
                    bodyFont: { family: 'Inter', size: 13 },
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: {
                        font: { family: 'Inter', size: 12 },
                        color: '#666'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    grid: {
                        color: 'rgba(0,0,0,0.05)'
                    },
                    ticks: {
                        callback: function (value) {
                            return '$' + (value / 1000) + 'k';
                        },
                        font: { family: 'Inter', size: 12 },
                        color: '#666'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: { display: false },
                    ticks: {
                        font: { family: 'Inter', size: 12 },
                        color: '#666'
                    }
                }
            }
        }
    });
}

function fetchNewsFeed() {
    const rssUrl = encodeURIComponent("https://feeds.feedburner.com/inmannews");
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}&api_key=`;
    const gridContainer = document.getElementById("news-grid-container");

    if (!gridContainer) return;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) throw new Error("Network error");
            return response.json();
        })
        .then(data => {
            if (data.status !== 'ok') throw new Error("API error");

            gridContainer.innerHTML = ''; // Specific clear

            // Render top 3 articles
            const articles = data.items.slice(0, 3);

            if (articles.length === 0) {
                gridContainer.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">No recent news found.</p>';
                return;
            }

            articles.forEach(article => {
                const imageUrl = extractImage(article);
                const date = new Date(article.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

                let excerpt = article.description || "";
                excerpt = excerpt.replace(/<\/?[^>]+(>|$)/g, ""); // Strip HTML

                const html = `
                    <a href="${article.link}" target="_blank" rel="noopener noreferrer" class="editorial-card fade-in">
                        <div class="editorial-image-wrapper">
                            <img src="${imageUrl}" alt="News Image" class="editorial-image" loading="lazy">
                        </div>
                        <div class="editorial-meta">HousingWire • ${date}</div>
                        <h3 class="editorial-title">${article.title}</h3>
                        <p class="editorial-excerpt">${excerpt}</p>
                    </a>
                `;
                gridContainer.insertAdjacentHTML('beforeend', html);
            });
        })
        .catch(error => {
            console.error("RSS Fetch Error:", error);
            gridContainer.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color: #888;">Unable to load live news at this time.</p>';
        });
}

function extractImage(item) {
    if (item.thumbnail && item.thumbnail !== '') return item.thumbnail;
    if (item.enclosure && item.enclosure.link) return item.enclosure.link;
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    const match = imgRegex.exec(item.content || item.description);
    if (match && match[1]) return match[1];
    return '/assets/contact-bg.jpg';
}
