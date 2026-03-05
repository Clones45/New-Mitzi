const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// Helper to get all HTML files
function getHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        // Exclude node_modules, .git, etc.
        if (file === 'node_modules' || file === '.git') continue;

        if (fs.statSync(filePath).isDirectory()) {
            getHtmlFiles(filePath, fileList);
        } else if (filePath.endsWith('.html')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const htmlFiles = getHtmlFiles(rootDir);

let updatedFiles = 0;

for (const file of htmlFiles) {
    let content = fs.readFileSync(file, 'utf8');

    if (content.includes('footer-eho-logo')) {
        // Determine the relative path to assets folder based on file depth
        const relPath = path.relative(path.dirname(file), rootDir);
        let assetsPath = relPath ? `${relPath}/assets/` : 'assets/';
        // Normalize slashes to forward slashes for HTML
        assetsPath = assetsPath.replace(/\\/g, '/');

        // Regex to match the footer-eho-logo div and its contents
        const regex = /(<div class=["']footer-eho-logo["']>)([\s\S]*?)(<\/div>)/g;

        const newHtml = `\n                            <img src="${assetsPath}eho-realtor.png" alt="REALTOR® and Equal Housing Opportunity" class="footer-white-logo" loading="lazy">\n                        `;

        const newContent = content.replace(regex, `$1${newHtml}$3`);

        if (content !== newContent) {
            fs.writeFileSync(file, newContent, 'utf8');
            console.log(`Updated: ${path.relative(rootDir, file)}`);
            updatedFiles++;
        }
    }
}

console.log(`\nSuccessfully updated ${updatedFiles} files.`);
