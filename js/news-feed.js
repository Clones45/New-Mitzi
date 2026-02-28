/**
 * news-feed.js
 * Fetches live Real Estate RSS feeds and populates the Market Updates portal.
 */

document.addEventListener("DOMContentLoaded", () => {
    // We use rss2json as a free proxy to bypass CORS and parse XML to JSON easily.
    // The feed here is Inman News, a premier real estate news publication.
    const rssUrl = encodeURIComponent("https://feeds.feedburner.com/inmannews");
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}&api_key=`;

    const featuredContainer = document.getElementById("featured-news-container");
    const gridContainer = document.getElementById("news-grid-container");

    if (!featuredContainer || !gridContainer) return;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            if (data.status !== 'ok') {
                throw new Error("RSS parser returned error");
            }

            const items = data.items;

            // Clear loading states
            featuredContainer.innerHTML = '';
            gridContainer.innerHTML = '';

            if (items.length === 0) {
                gridContainer.innerHTML = '<div class="rss-error">No news articles found at this time.</div>';
                return;
            }

            // 1. Extract the first item as the "Featured Hero" story
            const featuredArticle = items.shift();
            renderFeaturedArticle(featuredArticle, featuredContainer);

            // 2. Render the rest into the grid (up to 9 items to keep it clean)
            const gridItems = items.slice(0, 9);
            gridItems.forEach(article => {
                renderGridArticle(article, gridContainer);
            });
        })
        .catch(error => {
            console.error("Error fetching news feed:", error);
            const errorMsg = '<div class="rss-error">Failed to load live news feed. Please try again later.</div>';
            if (featuredContainer) featuredContainer.innerHTML = '';
            if (gridContainer) gridContainer.innerHTML = errorMsg;
        });

    // Helper functions
    function extractImage(item) {
        // RSS feeds hide images in different places (thumbnail, enclosure, or inside content)
        if (item.thumbnail && item.thumbnail !== '') return item.thumbnail;
        if (item.enclosure && item.enclosure.link) return item.enclosure.link;

        // Extract from HTML content if necessary
        const imgRegex = /<img[^>]+src="([^">]+)"/g;
        const match = imgRegex.exec(item.content || item.description);
        if (match && match[1]) return match[1];

        // Fallback placeholder image matching the site aesthetic
        return '/assets/Ellicott-City-Downtown.jpg';
    }

    function renderFeaturedArticle(article, container) {
        const imageUrl = extractImage(article);
        const date = new Date(article.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

        // Strip out HTML tags from description for a cleaner excerpt
        let excerpt = article.description || "";
        excerpt = excerpt.replace(/<\/?[^>]+(>|$)/g, "");

        const html = `
            <article class="featured-story">
                <a href="${article.link}" target="_blank" rel="noopener noreferrer" style="text-decoration:none; color:inherit; display:flex; flex-direction:column; height: 100%;">
                    <div class="featured-image-container">
                        <img src="${imageUrl}" alt="Featured Story" class="featured-image" loading="lazy">
                    </div>
                    <div class="featured-content">
                        <div><span class="category-pill gold">Breaking News</span></div>
                        <h2 class="headline-xl">${article.title}</h2>
                        <p class="article-excerpt">${excerpt}</p>
                        <div class="article-meta">
                            <i class="far fa-clock"></i> ${date}
                            <span style="margin: 0 5px;">|</span>
                            <span>HousingWire Live</span>
                        </div>
                    </div>
                </a>
            </article>
        `;
        container.innerHTML = html;
    }

    function renderGridArticle(article, container) {
        const imageUrl = extractImage(article);
        const date = new Date(article.pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

        // Strip out HTML tags
        let excerpt = article.description || "";
        excerpt = excerpt.replace(/<\/?[^>]+(>|$)/g, "");

        const html = `
            <a href="${article.link}" target="_blank" rel="noopener noreferrer" class="article-card">
                <div class="card-image-wrapper">
                    <img src="${imageUrl}" alt="News thumbnail" class="card-image" loading="lazy">
                </div>
                <div class="card-content">
                    <div><span class="category-pill dark">Market Update</span></div>
                    <h3 class="headline-sm">${article.title}</h3>
                    <p class="article-excerpt">${excerpt}</p>
                    <div class="article-meta">
                        <i class="far fa-clock"></i> ${date}
                    </div>
                </div>
            </a>
        `;
        container.insertAdjacentHTML('beforeend', html);
    }
});
