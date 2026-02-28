const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..');

fs.readdirSync(dir).forEach(file => {
    if (!file.endsWith('.html')) return;
    let filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    let updated = content.replace(/<img([^>]+)>/ig, (match, attrs) => {
        if (!/alt=['"][^'"]*['"]/i.test(attrs)) {
            // Missing alt text
            // Try to extract a sensible alt from src
            let srcMatch = attrs.match(/src=['"]([^'"]+)['"]/i);
            let sensibleAlt = "Image";
            if (srcMatch && srcMatch[1]) {
                let filename = srcMatch[1].split('/').pop().split('.')[0];
                sensibleAlt = filename.replace(/[-_]/g, ' ');
            }
            attrs += ` alt="${sensibleAlt}"`;
            return `<img${attrs}>`;
        }
        // Even if it has alt="", it's acceptable for decorative images.
        return match;
    });

    if (updated !== content) {
        fs.writeFileSync(filePath, updated, 'utf8');
        console.log(`Added missing alt tags in ${file}`);
    }
});
