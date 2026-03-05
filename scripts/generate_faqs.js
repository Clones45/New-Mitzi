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

const faqDir = path.join(__dirname, '..', 'faq');
if (!fs.existsSync(faqDir)) {
    fs.mkdirSync(faqDir);
}

// Read template from existing page (we will use howard-county.html as a base but adapt the path depth)
const templateHtml = fs.readFileSync(path.join(__dirname, '..', 'howard-county.html'), 'utf8');

faqs.forEach(faq => {
    const filePath = path.join(faqDir, `${faq.slug}.html`);

    // Create answer text
    const answer = `When looking for an experienced real estate agent or military relocation specialist (MRP) in Ellicott City and the surrounding Maryland areas, understanding <strong>${faq.question.toLowerCase().replace('?', '')}</strong> is crucial for a smooth transaction. Mitzi Santayana brings local expertise, military relocation knowledge, and dedication to help you navigate the Howard County market effectively. Whether handling VA loans, evaluating Ellicott City neighborhoods, or pricing your home correctly, the right professional makes all the difference. Contact Mitzi today to discuss your specific needs.`;

    // For the FAQ pages, we need to adjust asset paths to go up one directory (../)
    // because the HTML files will be in /faq/ instead of the root directory.
    // We'll leave the main layout structure untouched and just replace the main content block.

    // Create JSON-LD
    const jsonLd = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "${faq.question}",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "${answer.replace(/<\/?[^>]+(>|$)/g, "")}"
        }
      }]
    }
    </script>
  `;

    let pageHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    ${jsonLd}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${faq.question} | Mitzi Santayana REALTOR®</title>
    <meta name="description" content="Expert answers to: ${faq.question} Find out how top Ellicott City Realtor and Military Relocation Professional Mitzi Santayana can help you.">
    
    <link rel="canonical" href="https://mitzisantayana.com/faq/${faq.slug}">
    <link rel="icon" type="image/x-icon" href="../favicon.ico">
    <link rel="icon" type="image/png" sizes="32x32" href="../favicon.png">
    <link rel="apple-touch-icon" href="../favicon.png">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
    
    <!-- Styles -->
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/animations.css">
    <link rel="stylesheet" href="../css/footer.css">
    <link rel="stylesheet" href="../css/call-widget.css">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <!-- NAVBAR (Adjusted paths) -->
    <nav class="navbar">
        <div class="container nav-container">
            <a href="../index.html" class="logo">
                <img src="../assets/LBL.png" alt="Mitzi Santayana Logo" class="nav-logo">
                Mitzi Santayana <span class="logo-subtitle">REALTOR®</span>
            </a>
            <div class="nav-links">
                <a href="../about.html" class="nav-link">About</a>
                <a href="../services.html" class="nav-link">Services</a>
                <a href="../listings.html" class="nav-link">Listings</a>
                <div class="nav-dropdown">
                    <a href="#" class="nav-link" style="display: flex; align-items: center; gap: 5px;">Guides <i class="fas fa-chevron-down" style="font-size: 0.7em;"></i></a>
                    <div class="dropdown-menu">
                        <a href="../howard-county.html" class="dropdown-item">Howard County</a>
                        <a href="../anne-arundel-county.html" class="dropdown-item">Anne Arundel County</a>
                        <a href="../prince-georges-county.html" class="dropdown-item">Prince George's County</a>
                    </div>
                </div>
                <a href="../market-updates.html" class="nav-link">Market Updates</a>
                <a href="../contact.html" class="nav-link">Contact</a>
                <a href="../contact.html" class="btn btn-primary nav-btn">Work With Mitzi</a>
                <button id="theme-toggle" class="theme-toggle" aria-label="Toggle dark mode"><i class="fas fa-moon"></i></button>
            </div>
            <button class="mobile-menu-btn" aria-label="Open Menu">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </button>
        </div>
    </nav>

    <!-- HEADER / TITLE SECTION -->
    <header class="hero" style="min-height:40vh;background-image:url('../assets/hero-home.png');background-size:cover;background-position:center;">
        <div class="hero-overlay"></div>
        <div class="container hero-content text-center">
            <span class="overline" style="color:var(--color-gold);letter-spacing:3px;">Real Estate FAQ</span>
            <h1 class="hero-title fade-in-up" style="font-size:3rem;">${faq.question}</h1>
        </div>
    </header>

    <!-- CONTENT -->
    <section class="section">
        <div class="container">
            <div style="max-width:800px;margin:0 auto;background:var(--color-bg);padding:40px;border-radius:12px;box-shadow:0 10px 30px rgba(0,0,0,0.05);">
                <h2 style="font-family:'Playfair Display', serif;margin-bottom:20px;">Answer:</h2>
                <p style="font-size:1.15rem;line-height:1.8;color:var(--color-text-light);">${answer}</p>
                <div style="margin-top:40px;border-top:1px solid rgba(0,0,0,0.1);padding-top:20px;">
                    <a href="../contact.html" class="btn btn-primary">Make an Inquiry Today</a>
                </div>
            </div>
        </div>
    </section>

    <!-- FOOTER STATIC CONTENT WILL GO HERE LATER, BUT WE WILL ADD IT GLOBALLY TO ALL -->
</body>
</html>`;

    fs.writeFileSync(filePath, pageHtml);
});

console.log('Successfully generated 30 FAQ pages.');
