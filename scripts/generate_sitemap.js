const fs = require('fs');
const path = require('path');

const dir = 'd:/Antigravity Proj/Mitzi\'s Website';
const baseUrl = 'https://mitzisantayana.com/';
const sitemapPath = path.join(dir, 'sitemap.xml');
const today = '2026-03-05';

// Read all HTML files recursively
function getHtmlFiles(currentDir, fileList = []) {
    const files = fs.readdirSync(currentDir);
    for (const file of files) {
        const filePath = path.join(currentDir, file);
        if (file === 'node_modules' || file === '.git' || file === '.vscode') continue;

        if (fs.statSync(filePath).isDirectory()) {
            getHtmlFiles(filePath, fileList);
        } else if (filePath.endsWith('.html')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const htmlFiles = getHtmlFiles(dir);

let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// Helper to get priority and determine path mapping
function getPageDetails(relPath) {
    relPath = relPath.replace(/\\/g, '/'); // normalize slashes

    // Remove index.html for root equivalent
    if (relPath === 'index.html') {
        return { urlLoc: baseUrl, priority: '1.00', changefreq: 'weekly' };
    }

    // Remove .html for clean URLs
    const cleanPath = relPath.replace(/\.html$/, '');
    const urlLoc = baseUrl + cleanPath;

    // Assign priorities based on page type
    let priority = '0.80';
    let changefreq = 'monthly';

    if (cleanPath.startsWith('listing-')) {
        priority = '0.75';
        changefreq = 'weekly';
    } else if (['about', 'services', 'listings', 'market-updates', 'contact'].includes(cleanPath)) {
        priority = '0.90';
        changefreq = (cleanPath === 'market-updates' || cleanPath === 'listings') ? 'always' : 'monthly';
    } else if (cleanPath.includes('county')) {
        priority = '0.90';
        changefreq = 'weekly';
    } else if (cleanPath.startsWith('faq/')) {
        priority = '0.70';
        changefreq = 'monthly';
    }

    return { urlLoc, priority, changefreq };
}

// Generate the <url> blocks
for (const file of htmlFiles) {
    const relPath = path.relative(dir, file);
    const { urlLoc, priority, changefreq } = getPageDetails(relPath);

    sitemapContent += `
  <url>
    <loc>${urlLoc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

sitemapContent += '\n</urlset>\n';

fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
console.log(`Successfully generated sitemap.xml with ${htmlFiles.length} pages.`);
