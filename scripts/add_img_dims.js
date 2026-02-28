const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');

const dir = path.join(__dirname, '..');

fs.readdirSync(dir).forEach(file => {
    if (!file.endsWith('.html')) return;
    let filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Regex to match <img ...>
    let updated = content.replace(/<img\s+([^>]+)>/ig, (match, attrs) => {
        // Parse attributes
        // A simple parse
        const getAttr = (name) => {
            const regex = new RegExp(`${name}=['"]([^'"]+)['"]`, 'i');
            const m = attrs.match(regex);
            return m ? m[1] : null;
        }

        const src = getAttr('src');
        if (!src) return match; // no src, ignore

        // Exclude external images or data URIs
        if (src.startsWith('http') || src.startsWith('data:')) {
            return match;
        }

        let imgPath = path.join(dir, src.startsWith('/') ? src.slice(1) : src);

        // Handle URL encoding if any
        imgPath = decodeURIComponent(imgPath);

        let width = getAttr('width');
        let height = getAttr('height');

        if (!width || !height) {
            try {
                if (fs.existsSync(imgPath)) {
                    const dimensions = sizeOf(imgPath);
                    if (!width && dimensions.width) attrs += ` width="${dimensions.width}"`;
                    if (!height && dimensions.height) attrs += ` height="${dimensions.height}"`;
                }
            } catch (e) {
                // Ignore if we can't read the image
                console.log(`Could not get size for ${imgPath}`);
            }
        }

        // Lazy load logic
        let loading = getAttr('loading');
        let classes = getAttr('class') || '';

        // Don't lazy load nav-logo, hero images, collage-img.
        const isAboveFold = classes.includes('nav-logo') ||
            classes.includes('hero-logo') ||
            classes.includes('hero-bg') ||
            classes.includes('collage-img');

        if (!isAboveFold && !loading) {
            attrs += ` loading="lazy"`;
        }

        return `<img ${attrs.trim()}>`;
    });

    if (updated !== content) {
        fs.writeFileSync(filePath, updated, 'utf8');
        console.log(`Updated images in ${file}`);
    }
});
