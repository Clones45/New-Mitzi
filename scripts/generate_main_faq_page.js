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

const websiteDir = path.join(__dirname, '..');

// 1. Generate faq.html
const indexHtmlContent = fs.readFileSync(path.join(websiteDir, 'index.html'), 'utf8');

// Extract nav and footer and construct page
let headerEnd = indexHtmlContent.indexOf('</nav>') + 6;
let footerStart = indexHtmlContent.indexOf('<!-- FLOATING CALL BUTTON -->');
if (footerStart === -1) footerStart = indexHtmlContent.indexOf('<div class="call-float"');

let topChunk = indexHtmlContent.substring(0, headerEnd);
let bottomChunk = indexHtmlContent.substring(footerStart);

// Clean up top chunk for title
topChunk = topChunk.replace(/<title>.*?<\/title>/, '<title>Frequently Asked Questions | Mitzi Santayana</title>');

// Create FAQ list HTML
let faqListHtml = `
    <!-- HERO -->
    <header class="hero" style="min-height: 40vh; background-image: url('assets/hero-home.png'); background-size: cover; background-position: center;">
        <div class="hero-overlay"></div>
        <div class="container hero-content text-center">
            <h1 class="hero-title fade-in-up" style="font-size: 3rem;">Frequently Asked Questions</h1>
            <p class="hero-subtitle fade-in-up delay-1">Answers to your real estate, relocation, and buying/selling questions.</p>
        </div>
    </header>

    <!-- FAQ SECTION -->
    <section class="section bg-cream">
        <div class="container">
            <div style="max-width: 800px; margin: 0 auto; background: var(--color-bg); padding: 40px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
                <ul style="list-style: none; padding: 0;">
`;

faqs.forEach(faq => {
    faqListHtml += `
                    <li style="margin-bottom: 20px; border-bottom: 1px solid rgba(0,0,0,0.1); padding-bottom: 15px;">
                        <a href="/faq/${faq.slug}.html" style="font-size: 1.2rem; font-weight: 500; color: var(--color-primary); text-decoration: none; display: flex; align-items: center; justify-content: space-between;">
                            ${faq.question}
                            <i class="fas fa-arrow-right" style="font-size: 0.9em; opacity: 0.7;"></i>
                        </a>
                    </li>`;
});

faqListHtml += `
                </ul>
                <div style="margin-top: 40px; text-align: center;">
                    <a href="/contact" class="btn btn-primary">Have More Questions? Contact Mitzi</a>
                </div>
            </div>
        </div>
    </section>
`;

fs.writeFileSync(path.join(websiteDir, 'faq.html'), topChunk + faqListHtml + bottomChunk, 'utf8');
console.log('Created faq.html');

// 2. Rebuild the Footer in all HTML files
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

const allHtmlFiles = walkFiles(websiteDir);
let updatedFiles = 0;

allHtmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Make paths relative for /faq/ files
    let isFaqPage = file.includes('\\faq\\') || file.includes('/faq/');
    let rootPath = isFaqPage ? '../' : '/';
    let localPath = isFaqPage ? '../' : '';

    const newFaqLinks = `
                    <!-- FAQ RESOURCES -->
                    <div class="footer-links faq-footer-links">
                        <h4>FAQ Resources</h4>
                        <a href="${localPath}faq.html">View All FAQs</a>
                        <a href="${rootPath}faq/is-ellicott-city-good-place-to-live.html">Living in Ellicott City</a>
                        <a href="${rootPath}faq/home-buying-process-maryland.html">Maryland Home Buying</a>
                        <a href="${rootPath}faq/what-is-military-relocation-professional.html">Military Relocation (MRP)</a>
                        <a href="${rootPath}faq/va-loans-in-maryland.html">VA Loans in MD</a>
                    </div>`;

    // Regex to find the whole FAQ block
    // Starts with <!-- FAQ RESOURCES --> up to just before <!-- CONTACT -->
    const faqBlockRegex = /<!-- FAQ RESOURCES -->[\s\S]*?(?=<!-- CONTACT -->)/;

    if (faqBlockRegex.test(content)) {
        let newContent = content.replace(faqBlockRegex, newFaqLinks + '\n\n                    ');
        if (newContent !== content) {
            fs.writeFileSync(file, newContent, 'utf8');
            updatedFiles++;
        }
    } else if (content.includes('<!-- CONTACT -->')) {
        // Just in case some file missed it
        let newContent = content.replace('<!-- CONTACT -->', newFaqLinks + '\n\n                    <!-- CONTACT -->');
        if (newContent !== content) {
            fs.writeFileSync(file, newContent, 'utf8');
            updatedFiles++;
        }
    }
});

console.log(`Replaced massive FAQ links in footer with concise version in ${updatedFiles} files.`);
