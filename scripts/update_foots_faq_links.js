const fs = require('fs');
const path = require('path');

const faqs = [
    { slug: 'find-realtor-ellicott-city-md', question: 'How do I find a realtor in Ellicott City, MD?' },
    { slug: 'average-home-price-ellicott-city-md', question: 'What is the average home price in Ellicott City, MD?' },
    { slug: 'how-long-to-buy-home-ellicott-city', question: 'How long does it take to buy a home in Ellicott City, MD?' },
    { slug: 'best-neighborhoods-ellicott-city', question: 'What neighborhoods are best in Ellicott City, MD?' },
    { slug: 'need-buyers-agent-ellicott-city', question: 'Do I need a buyer\'s agent when searching for homes in Ellicott City?' },
    { slug: 'home-buying-process-maryland', question: 'What is the home buying process in Maryland?' },
    { slug: 'down-payment-howard-county-md', question: 'How much should I save for a down payment in Howard County, MD?' },
    { slug: 'closing-costs-buying-home-maryland', question: 'What are closing costs when buying a home in Maryland?' },
    { slug: 'schools-near-ellicott-city-md', question: 'What schools are near Ellicott City, MD?' },
    { slug: 'is-ellicott-city-good-place-to-live', question: 'Is Ellicott City, MD a good place to live?' },
    { slug: 'sell-home-ellicott-city-md', question: 'How do I sell my home in Ellicott City, MD?' },
    { slug: 'realtor-commission-maryland', question: 'How much does a realtor charge to sell a home in Maryland?' },
    { slug: 'how-long-sell-home-howard-county', question: 'How long does it take to sell a home in Howard County, MD?' },
    { slug: 'housing-market-ellicott-city-md', question: 'What is the current housing market like in Ellicott City, MD?' },
    { slug: 'choose-best-listing-agent-ellicott-city', question: 'How do I choose the best listing agent in Ellicott City, MD?' },
    { slug: 'what-is-military-relocation-professional', question: 'What is a Military Relocation Professional (MRP)?' },
    { slug: 'military-relocation-specialist-fort-meade', question: 'How do I find a military relocation specialist near Fort Meade, MD?' },
    { slug: 'va-loan-ellicott-city-md', question: 'Can I use a VA loan to buy a home in Ellicott City, MD?' },
    { slug: 'pcs-move-buying-home-maryland', question: 'How does a PCS move work when buying a home in Maryland?' },
    { slug: 'bah-howard-county-md', question: 'What is BAH (Basic Allowance for Housing) in Howard County, MD?' },
    { slug: 'is-ellicott-city-close-to-fort-meade', question: 'Is Ellicott City, MD close to Fort Meade and NSA?' },
    { slug: 'best-schools-military-families-fort-meade', question: 'What are the best neighborhoods for military families near Fort Meade?' },
    { slug: 'buy-home-maryland-before-pcs', question: 'Can I buy a home in Maryland before arriving for a PCS move?' },
    { slug: 'va-loans-in-maryland', question: 'How do VA loans work in Maryland?' },
    { slug: 'military-bases-near-howard-county-md', question: 'What military bases are near Howard County, MD?' },
    { slug: 'buyers-agent-vs-listing-agent', question: 'What is the difference between a buyer\'s agent and a listing agent?' },
    { slug: 'do-i-need-realtor-in-maryland', question: 'Do I need a realtor to buy or sell a home in Maryland?' },
    { slug: 'questions-to-ask-realtor', question: 'What questions should I ask a realtor before hiring them?' },
    { slug: 'home-inspection-process-maryland', question: 'How does the home inspection process work in Maryland?' },
    { slug: 'cma-comparative-market-analysis', question: 'What is a CMA (Comparative Market Analysis) and why do I need one?' }
];

const getFaqLinksHtml = () => {
    let html = `
                    <!-- FAQ RESOURCES -->
                    <div class="footer-links faq-footer-links">
                        <h4>FAQ Resources</h4>`;

    faqs.forEach(faq => {
        let title = faq.question.replace('?', '');
        // limit title length for footer? Let's truncate if too long
        if (title.length > 35) title = title.substring(0, 35) + '...';
        // Link from root pages should be /faq/{slug} to work via standard web paths, or relative faq/{slug}.html
        // Let's use root absolute paths to avoid issues: /faq/{slug}.html
        html += `\n                        <a href="/faq/${faq.slug}.html" title="${faq.question}">${title}</a>`;
    });
    html += `\n                    </div>\n`;
    return html;
};

// Gets all HTML files
function walkFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'faq') { // skip faq dir
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

let updatedFiles = 0;

allHtmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // We'll search for the <!-- CONTACT --> comment and insert the FAQ block RIGHT BEFORE IT.
    if (content.includes('<!-- CONTACT -->')) {
        // Only insert if not already there
        if (!content.includes('<!-- FAQ RESOURCES -->')) {
            const insertHtml = getFaqLinksHtml();
            content = content.replace('<!-- CONTACT -->', insertHtml + '\n                    <!-- CONTACT -->');
            fs.writeFileSync(file, content, 'utf8');
            updatedFiles++;
        }
    }
});
console.log(`Successfully appended FAQ footer column to ${updatedFiles} root HTML files.`);

// Now let's handle the FAQ pages footer. 
const indexHtmlContent = fs.readFileSync(path.join(websiteDir, 'index.html'), 'utf8');
const footerStartIndex = indexHtmlContent.indexOf('<div id="footer-static">');
const bodyEndIndex = indexHtmlContent.indexOf('</body>');

if (footerStartIndex !== -1 && bodyEndIndex !== -1) {
    let footerChunk = indexHtmlContent.substring(footerStartIndex, bodyEndIndex);

    // Replace paths inside the footer for proper linking from /faq/ back out to root
    // For things that are local links but now start with / we are safe
    footerChunk = footerChunk.replace(/href="\//g, 'href="../');

    // We already use /faq/... in the links but if the site runs on file:// it might break.
    // It's safer to use local relative paths: href="../faq/..."
    footerChunk = footerChunk.replace(/href="\/faq\//g, 'href="../faq/');

    // Also assets
    footerChunk = footerChunk.replace(/src="assets\//g, 'src="../assets/');
    footerChunk = footerChunk.replace(/src="icons\//g, 'src="../icons/');

    // For other links like href="about.html" -> href="../about.html"
    footerChunk = footerChunk.replace(/href="([a-zA-Z0-9-]+\.html(?:#[a-zA-Z-]+)?)"/g, 'href="../$1"');

    footerChunk += '\n    <script src="../js/script.js"></script>\n';

    // Inject to all files in faq folder
    const faqFiles = fs.readdirSync(path.join(websiteDir, 'faq'));
    faqFiles.forEach(f => {
        if (f.endsWith('.html')) {
            const fPath = path.join(websiteDir, 'faq', f);
            let c = fs.readFileSync(fPath, 'utf8');
            if (!c.includes('<div id="footer-static">')) {
                c = c.replace('</body>', footerChunk + '\n</body>');
                fs.writeFileSync(fPath, c, 'utf8');
            }
        }
    });
    console.log('Appended fully formed footer to 30 FAQ pages.');
}
