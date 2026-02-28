const fs = require('fs');
const path = require('path');

const dir = "d:\\Antigravity Proj\\Mitzi's Website";
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('assets/BL.png')) {
        // Find the div containing the BL.png and replace its contents
        const regex = /<div class="footer-logo"[^>]*>[\s\S]*?<img src="assets\/BL\.png"[^>]*>[\s\S]*?<\/div>/;
        const replaceWith = `<div class="footer-logo" style="margin-top: 25px; text-align: left;">
                            <a href="https://www.boblucidoteam.com" target="_blank">
                                <img src="assets/BL.png" alt="Bob Lucido Team" class="footer-white-logo" style="max-width: 200px; height: auto;" loading="lazy">
                            </a>
                            <br>
                            <img src="assets/KwLogo.png" alt="Keller Williams Realty Centre" class="footer-white-logo" style="max-width: 200px; height: auto; margin-top: 15px;" loading="lazy">
                        </div>`;

        let newContent = content.replace(regex, replaceWith);
        // Sometimes the old HTML has it separated, another variation:
        // Or if it simply matches the img tag of BL.png perfectly:
        // Wait, the HTML block is highly specific in most files.
        // Let's use a simpler replace on just the image tag, but we need to insert KwLogo too.

        // Also note: the original was:
        /*
        <div class="footer-logo" style="margin-top: 25px; text-align: left;">
            <a href="https://www.boblucidoteam.com" target="_blank">
                <img src="assets/BL.png" alt="Bob Lucido Team" style="max-width: 200px; height: auto;" loading="lazy">
            </a>
        </div>
        */

        if (newContent !== content) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Updated ${file}`);
        } else {
            // Fallback replacement if the exact div structure differs
            const fbRegex = /<a href="https:\/\/www\.boblucidoteam\.com"[^>]*>\s*<img src="(?:assets\/|\/)BL\.png"[^>]*>\s*<\/a>/;
            const fbRepl = `<a href="https://www.boblucidoteam.com" target="_blank">
                                <img src="assets/BL.png" alt="Bob Lucido Team" class="footer-white-logo" style="max-width: 200px; height: auto;" loading="lazy">
                            </a>
                            <br>
                            <img src="assets/KwLogo.png" alt="Keller Williams Realty Centre" class="footer-white-logo" style="max-width: 200px; height: auto; margin-top: 15px;" loading="lazy">`;
            newContent = content.replace(fbRegex, fbRepl);
            if (newContent !== content) {
                fs.writeFileSync(filePath, newContent, 'utf8');
                console.log(`Updated ${file} (fallback)`);
            }
        }
    }
});
