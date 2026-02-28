const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..');

const oldFonts = `<!-- Google Fonts -->
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:wght@400;600;700&display=swap"
        rel="stylesheet">`;

const oldFonts2 = `<!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">`;

const newFonts = `<!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">`;

fs.readdirSync(dir).forEach(file => {
    if (!file.endsWith('.html')) return;
    let filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Make it robust against whitespace
    let updated = content.replace(/<!-- Google Fonts -->\s*<link[^>]+href="https:\/\/fonts\.googleapis\.com\/css2\?family=Inter[^>]+>\s*/, newFonts + '\n\n    ');

    if (updated !== content) {
        fs.writeFileSync(filePath, updated, 'utf8');
        console.log(`Added font preconnects to ${file}`);
    } else {
        console.log(`No match for font in ${file} or already updated`);
    }
});
