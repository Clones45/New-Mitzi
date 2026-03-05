const fs = require('fs');
const path = require('path');

function walkFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git') {
                walkFiles(fullPath, fileList);
            }
        } else if (fullPath.endsWith('.html')) {
            fileList.push(fullPath);
        }
    }
    return fileList;
}

const websiteDir = path.join(__dirname, '..');
const allHtmlFiles = walkFiles(websiteDir);

const newFooterLogosBlock = `
                        <div class="footer-broker-logos">
                            <a href="https://www.boblucidoteam.com" target="_blank">
                                <img src="assets/BL.png" alt="Bob Lucido Team" class="footer-white-logo" loading="lazy">
                            </a>
                            <img src="assets/KwLogo.png" alt="Keller Williams Realty Centre" class="footer-white-logo" loading="lazy">
                        </div>
                        <div class="footer-eho-logo">
                            <img src="assets/REALTOR and EHO.png" alt="REALTOR® and Equal Housing Opportunity" loading="lazy">
                        </div>`;

let updatedFiles = 0;

allHtmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    let isFaqPage = file.includes('\\faq\\') || file.includes('/faq/');
    let rootPath = isFaqPage ? '../' : '';

    // Fix the logo block regex to find the current implementation
    const regex = /<div class="footer-logo"[^>]*>[\s\S]*?<img src="[^"]*eho-realtor\.png"[\s\S]*?<\/div>\s*<\/div>/;

    // Actually the current implementation is:
    /*
    <div class="footer-logo" style="margin-top: 25px; text-align: left;">
        <a href="https://www.boblucidoteam.com" target="_blank">
            <img src="assets/BL.png" alt="Bob Lucido Team" class="footer-white-logo"
                style="max-width: 200px; height: auto;" loading="lazy">
        </a>
        <br>
        <img src="assets/KwLogo.png" alt="Keller Williams Realty Centre" class="footer-white-logo"
            style="max-width: 200px; height: auto; margin-top: 15px;" loading="lazy">
    </div>
    <div style="margin-top: 15px;">
        <img src="assets/eho-realtor.png" alt="REALTOR® and Equal Housing Opportunity"
            style="max-width: 160px; height: auto; opacity: 0.85;" loading="lazy">
    </div>
    */
    // Wait, earlier I saw it was REALTOR and EHO.png, then eho-realtor.png?
    // Let's use a broader regex that captures from <div class="footer-logo" down to the end of the eho div.

    let regex2 = /<div class="footer-logo"[\s\S]*?<\/div>[\s]*<div style="margin-top: 15px;">[\s\S]*?<\/div>/;

    const replaceWith = `
                        <div class="footer-broker-logos">
                            <a href="https://www.boblucidoteam.com" target="_blank">
                                <img src="${rootPath}assets/BL.png" alt="Bob Lucido Team" class="footer-white-logo" loading="lazy">
                            </a>
                            <img src="${rootPath}assets/KwLogo.png" alt="Keller Williams Realty Centre" class="footer-white-logo" loading="lazy">
                        </div>
                        <div class="footer-eho-logo">
                            <img src="${rootPath}assets/REALTOR and EHO.png" alt="REALTOR® and Equal Housing Opportunity" loading="lazy">
                        </div>`;

    if (regex2.test(content)) {
        let newContent = content.replace(regex2, replaceWith.trim());
        if (newContent !== content) {
            fs.writeFileSync(file, newContent, 'utf8');
            updatedFiles++;
        }
    } else {
        // Fallback for some files that might use eho-realtor.png 
        let regex3 = /<div class="footer-logo"[\s\S]*?<\/div>[\s]*<div style="margin-top: 15px;">[\s\S]*?<\/div>/i;
        if (regex3.test(content)) {
            let newContent = content.replace(regex3, replaceWith.trim());
            fs.writeFileSync(file, newContent, 'utf8');
            updatedFiles++;
        }
    }
});

console.log(`Updated logos layout in ${updatedFiles} files.`);
