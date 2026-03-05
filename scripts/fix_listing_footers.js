const fs = require('fs');
const path = require('path');

const dir = 'd:/Antigravity Proj/Mitzi\'s Website';
const files = fs.readdirSync(dir).filter(f => f.startsWith('listing-') && f.endsWith('.html'));

// Extract correct structures from index.html
const indexContent = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');

const widgetRegex = /(<!-- FLOATING CALL WIDGET -->[\s\S]*?)(?=<!-- ✅ FOOTER -->)/;
const widgetMatch = indexContent.match(widgetRegex);
let callWidget = widgetMatch ? widgetMatch[1] : '';

const footerRegex = /(<!-- ✅ FOOTER -->[\s\S]*?)(?=<!-- ✅ SCRIPTS -->)/;
const footerMatch = indexContent.match(footerRegex);
let fullFooter = footerMatch ? footerMatch[1] : '';

// Replacement block: close contact-card, close property-container, then add widgets and footer
const injections = `
        </div>
    </div>

${callWidget}
${fullFooter}
`;

let numFixed = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if the file has the malformed <div class="footer-broker-logos"> directly inside the page without proper wrappers
    // Let's replace anything from <div class="footer-broker-logos"> up to <!-- Scripts -->

    let original = content;

    // Replace broken button if it exists
    content = content.replace(/<button[^>]*onclick=["']openTourModal\(\)["'][^>]*>([\s\S]*?)<\/button>/g, '<a href="/contact" class="contact-btn" style="display:block; text-align:center; box-sizing:border-box;">$1</a>');

    content = content.replace(/<button onclick="openTourModal\(\)" class="mobile-action-btn action-btn-primary"[^>]*>([\s\S]*?)<\/button>/g, '<a href="/contact" class="mobile-action-btn action-btn-primary" style="display:flex; justify-content:center; align-items:center; text-decoration:none;">$1</a>');

    // Remove the orphaned footer chunk entirely and replace with full footer
    // Searching after the phone number block:
    const regex = /(<a href="tel:4439004056"[\s\S]*?<\/div>)\s*<div class="footer-broker-logos">[\s\S]*?(?=<!--[\s]*Scripts[\s]*-->|<script src="js\/script\.js">)/i;

    content = content.replace(regex, (match, p1) => {
        return p1 + injections;
    });

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Fixed footer and buttons in:", file);
        numFixed++;
    }
}

console.log(`\nSuccessfully fixed ${numFixed} listing files.`);
