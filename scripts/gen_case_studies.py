#!/usr/bin/env python3
# Script to generate both sold-property case study pages

import os

base = os.path.dirname(os.path.abspath(__file__))
sold_dir = os.path.join(base, 'sold')
os.makedirs(sold_dir, exist_ok=True)

# ------------------------------------------------------------
# SHARED FRAGMENTS
# ------------------------------------------------------------
def nav():
    return """<nav class="navbar">
<div class="container nav-container">
<a href="/" class="logo"><img src="/assets/LBL.png" alt="Mitzi Santayana Logo" class="nav-logo">Mitzi Santayana <span class="logo-subtitle">REALTOR&reg;</span></a>
<div class="nav-links">
<a href="/about" class="nav-link">About</a>
<a href="/services" class="nav-link">Services</a>
<a href="/listings" class="nav-link">Listings</a>
<a href="/#testimonials" class="nav-link">Testimonials</a>
<div class="nav-dropdown">
<a href="#" class="nav-link" style="display:flex;align-items:center;gap:5px">Communities <i class="fas fa-chevron-down" style="font-size:.7em"></i></a>
<div class="dropdown-menu">
<a href="/howard-county" class="dropdown-item">Howard County</a>
<a href="/anne-arundel-county" class="dropdown-item">Anne Arundel County</a>
<a href="/prince-georges-county" class="dropdown-item">Prince George&apos;s County</a>
<a href="/bowie-md-realtor" class="dropdown-item">Bowie, MD</a>
</div>
</div>
<a href="/market-updates" class="nav-link">Market Updates</a>
<a href="/contact" class="nav-link">Contact</a>
<a href="/contact" class="btn btn-primary nav-btn">Work With Mitzi</a>
<button id="theme-toggle" class="theme-toggle" aria-label="Toggle dark mode"><i class="fas fa-moon"></i></button>
</div>
<button class="mobile-menu-btn" aria-label="Open Menu"><span class="bar"></span><span class="bar"></span><span class="bar"></span></button>
</div>
</nav>"""

def call_widget():
    return """<div class="call-float" id="callFloat"><i class="fas fa-phone"></i></div>
<div class="call-modal" id="callModal">
<div class="call-modal-content">
<button class="close-modal" id="closeModal" aria-label="Close">&#10005;</button>
<h2>Do you have questions?</h2>
<p>Call or text today, we are here to help!</p>
<a href="tel:4439004056" class="call-btn"><i class="fa fa-phone"></i> 443-900-4056</a>
<small>I agree to be contacted by Mitzi Santayana via text, call &amp; email. To opt-out, reply &quot;STOP&quot;.</small>
</div>
</div>"""

def footer(extra_links="", rel_prefix=".."):
    return f"""<div id="footer-static">
<footer class="footer">
<div class="footer-cta"><h2>Ready to Find Your Home?</h2><p>Let&apos;s start your journey together. Reach out today and experience the difference of working with a REALTOR&reg; who truly cares.</p><a href="/contact" class="footer-btn">Get in Touch</a></div>
<div class="footer-main">
<div class="footer-grid">
<div class="footer-brand"><h3>Mitzi Santayana</h3><span class="realtor">REALTOR&reg;</span><p>Guiding You Home with Heart and Expertise</p></div>
<div class="footer-links"><h4>Quick Links</h4><a href="/">Home</a><a href="/about">About</a><a href="/sell-with-mitzi">Selling</a><a href="/listings">Listings</a><a href="/contact">Contact</a><a href="/howard-county">Howard County</a><a href="/anne-arundel-county">Anne Arundel</a><a href="/bowie-md-realtor">Bowie, MD</a></div>
<div class="footer-links"><h4>Seller Resources</h4><a href="/faq/sell-home-ellicott-city-md.html">How do I sell my home?</a><a href="/faq/realtor-commission-maryland.html">Realtor commission in MD</a><a href="/faq/how-long-sell-home-howard-county.html">How long to sell in Howard County?</a><a href="/faq/cma-comparative-market-analysis.html">What is a CMA?</a>{extra_links}</div>
<div class="footer-contact"><h4>Get in Touch</h4><p><i class="fas fa-building"></i> (410) 465-6900</p><p>&#128222; (443) 900-4056</p><p>mitzisantayana@boblucidoteam.com</p>
<div class="footer-socials">
<a href="https://www.facebook.com/mitzi.santayana" target="_blank"><img src="{rel_prefix}/icons/facebook.png" alt="Facebook" class="social-icon" loading="lazy"></a>
<a href="https://www.instagram.com/missrealt0r/" target="_blank"><img src="{rel_prefix}/icons/instagram.png" alt="Instagram" class="social-icon" loading="lazy"></a>
<a href="https://www.tiktok.com/@missrealt0r" target="_blank"><img src="{rel_prefix}/icons/tiktok.png" alt="TikTok" class="social-icon" loading="lazy"></a>
</div>
<div class="footer-broker-logos"><a href="https://www.boblucidoteam.com" target="_blank"><img src="{rel_prefix}/assets/BL.png" alt="Bob Lucido Team" class="footer-white-logo" loading="lazy"></a><img src="{rel_prefix}/assets/KwLogo.png" alt="Keller Williams" class="footer-white-logo" loading="lazy"></div>
<div class="footer-eho-logo"><img src="{rel_prefix}/assets/eho-realtor.png" alt="Equal Housing Opportunity" class="footer-white-logo" loading="lazy"></div>
</div>
</div>
<div class="footer-line"></div>
<p class="copyright">&copy; 2025 Mitzi Santayana. All rights reserved.</p>
</div>
</footer>
</div>"""

def shared_styles(rel_prefix=".."):
    return f"""<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&amp;family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="{rel_prefix}/css/style.css">
<link rel="stylesheet" href="{rel_prefix}/css/animations.css">
<link rel="stylesheet" href="{rel_prefix}/css/footer.css">
<link rel="stylesheet" href="{rel_prefix}/css/call-widget.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">"""

CASE_STYLE = """<style>
.sold-badge{display:inline-block;background:var(--color-gold);color:#fff;font-weight:700;font-size:.85rem;letter-spacing:2px;padding:.35rem 1rem;border-radius:4px;text-transform:uppercase;margin-bottom:1rem}
.prop-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:1rem;margin:2rem 0;padding:1.5rem;background:var(--color-white);border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,.08)}
.prop-stat{text-align:center}
.prop-stat-val{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:700;color:var(--color-gold);display:block}
.prop-stat-lbl{font-size:.78rem;color:var(--color-text-light);margin-top:.2rem;display:block}
.feature-grid{display:grid;grid-template-columns:1fr 1fr;gap:.6rem;margin:1.5rem 0;list-style:none;padding:0}
.feature-grid li{display:flex;align-items:center;gap:.5rem;font-size:.95rem}
.feature-grid i{color:var(--color-gold)}
.strategy-step{background:var(--color-white);border-left:4px solid var(--color-gold);border-radius:8px;padding:1.25rem 1.5rem;margin-bottom:1rem;box-shadow:0 2px 12px rgba(0,0,0,.06)}
.strategy-step h4{font-weight:600;margin-bottom:.4rem}
.price-box{background:linear-gradient(135deg,#f7f3ed,#fff);border:2px solid var(--color-gold);border-radius:12px;padding:2rem;text-align:center;margin:2rem 0}
.big-price{font-family:'Playfair Display',serif;font-size:3rem;font-weight:700;color:var(--color-gold)}
@media(max-width:600px){.feature-grid{grid-template-columns:1fr}}
</style>"""

# ============================================================
# PAGE 1: 6409 Summer Sunrise Dr
# ============================================================
page1 = f"""<!DOCTYPE html>
<html lang="en">
<head>
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": "6409 Summer Sunrise Dr, Columbia, MD 21044 - Sold $1,175,000",
  "url": "https://mitzisantayana.com/sold/6409-summer-sunrise-columbia-md",
  "description": "5BR/4BA, 3963 sq ft Colonial in Village of River Hill sold for $1,175,000 above $1,100,000 list price by Mitzi Santayana REALTOR.",
  "address": {{"@type":"PostalAddress","streetAddress":"6409 Summer Sunrise Dr","addressLocality":"Columbia","addressRegion":"MD","postalCode":"21044","addressCountry":"US"}},
  "offers": {{"@type":"Offer","price":"1175000","priceCurrency":"USD","availability":"https://schema.org/SoldOut"}},
  "floorSize": {{"@type":"QuantitativeValue","value":"3963","unitCode":"FTK"}},
  "agent": {{"@type":"RealEstateAgent","name":"Mitzi Santayana","telephone":"+1-443-900-4056","url":"https://mitzisantayana.com"}}
}}
</script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Selling Luxury in Columbia MD: How We Sold 6409 Summer Sunrise Dr Above Asking Price</title>
<meta name="description" content="Case study: 6409 Summer Sunrise Dr, Columbia MD 21044 sold $1,175,000 above asking. See how Mitzi Santayana delivered top-dollar results in River Hill, Howard County MD.">
<meta name="geo.region" content="US-MD">
<meta name="geo.placename" content="Columbia, Maryland">
<link rel="canonical" href="https://mitzisantayana.com/sold/6409-summer-sunrise-columbia-md">
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon.png">
{shared_styles()}
{CASE_STYLE}
</head>
<body>
{nav()}

<header class="hero" style="min-height:55vh;background-image:url('../assets/hero-home.png');background-size:cover;background-position:center">
<div class="hero-overlay"></div>
<div class="container hero-content text-center">
<span class="sold-badge">Sold &bull; February 2026</span>
<h1 class="hero-title fade-in-up">6409 Summer Sunrise Dr<br><span style="font-size:.6em;font-weight:400">Columbia, MD 21044 &mdash; Village of River Hill</span></h1>
<p class="hero-subtitle fade-in-up delay-1">Sold $1,175,000 &bull; Listed at $1,100,000 &bull; $75K Above Asking</p>
</div>
</header>

<section class="section">
<div class="container"><div style="max-width:900px;margin:0 auto">
<span class="overline">Case Study &bull; Howard County Luxury</span>
<h2 class="section-title">Selling Luxury in Columbia, MD: The River Hill Story</h2>
<div class="divider-center"></div>
<div class="prop-stats">
<div class="prop-stat"><span class="prop-stat-val">$1,175,000</span><span class="prop-stat-lbl">Final Sale Price</span></div>
<div class="prop-stat"><span class="prop-stat-val">$75K Over</span><span class="prop-stat-lbl">Above List Price</span></div>
<div class="prop-stat"><span class="prop-stat-val">5 BR / 4 BA</span><span class="prop-stat-lbl">Bedrooms / Bathrooms</span></div>
<div class="prop-stat"><span class="prop-stat-val">3,963 sq ft</span><span class="prop-stat-lbl">Total Finished Area</span></div>
<div class="prop-stat"><span class="prop-stat-val">Colonial</span><span class="prop-stat-lbl">Home Style</span></div>
<div class="prop-stat"><span class="prop-stat-val">Feb 2026</span><span class="prop-stat-lbl">Closed Date</span></div>
</div>
<p style="font-size:1.1rem;color:var(--color-text-light);margin-bottom:1.5rem">Located in the <strong>Village of River Hill</strong>&mdash;Columbia, Maryland&apos;s newest and most prestigious planned community&mdash;this 5-bedroom Colonial represented the pinnacle of Howard County luxury living. The challenge was achieving maximum value in a market where strategy is everything.</p>
<p style="font-size:1.1rem;font-weight:500">Through precision pricing, luxury-level marketing, and relentless negotiation, final sale price reached <strong>$1,175,000</strong>&mdash;$75,000 above the $1,100,000 list price. Here is exactly how we did it.</p>
</div></div>
</section>

<section class="section bg-cream">
<div class="container"><div style="max-width:900px;margin:0 auto">
<span class="overline">The Property</span>
<h2 class="section-title">What Made 6409 Summer Sunrise Drive Special</h2>
<div class="divider-center"></div>
<ul class="feature-grid">
<li><i class="fas fa-check-circle"></i> Elegant paver front walkway &amp; curb appeal</li>
<li><i class="fas fa-check-circle"></i> Open-air deck for outdoor entertaining</li>
<li><i class="fas fa-check-circle"></i> Lower-level patio with private backyard</li>
<li><i class="fas fa-check-circle"></i> 3,963 sq ft across multiple living levels</li>
<li><i class="fas fa-check-circle"></i> River Hill community pool &amp; scenic paths</li>
<li><i class="fas fa-check-circle"></i> Access to River Hill Golf Club</li>
<li><i class="fas fa-check-circle"></i> Top-rated Howard County school district</li>
<li><i class="fas fa-check-circle"></i> Minutes to Route 32 &amp; Columbia Town Center</li>
</ul>
<p style="color:var(--color-text-light)">River Hill is the last of Columbia&apos;s ten villages&mdash;making it one of the most modern, with newer construction, larger lots, and premium amenities that older Columbia villages cannot match. For buyers who know Howard County, River Hill always commands a premium.</p>
</div></div>
</section>

<section class="section">
<div class="container"><div style="max-width:900px;margin:0 auto">
<span class="overline">The Strategy</span>
<h2 class="section-title">How We Sold 6409 Summer Sunrise Dr Above Asking</h2>
<div class="divider-center"></div>
<div class="strategy-step"><h4><i class="fas fa-chart-line" style="color:var(--color-gold);margin-right:.5rem"></i>Step 1 &mdash; Surgical Pricing Analysis</h4><p style="color:var(--color-text-light);font-size:.95rem">A full Comparative Market Analysis (CMA) set the list price at $1,100,000&mdash;positioned to attract multiple qualified buyers and create competition without leaving equity on the table.</p></div>
<div class="strategy-step"><h4><i class="fas fa-camera" style="color:var(--color-gold);margin-right:.5rem"></i>Step 2 &mdash; Luxury-Level Visual Marketing</h4><p style="color:var(--color-text-light);font-size:.95rem">Professional photography captured the paver walkway, outdoor deck, and architectural elegance&mdash;ensuring the listing stood out across Zillow, Realtor.com, and all syndicated platforms from launch day.</p></div>
<div class="strategy-step"><h4><i class="fas fa-bullhorn" style="color:var(--color-gold);margin-right:.5rem"></i>Step 3 &mdash; Targeted Community Marketing</h4><p style="color:var(--color-text-light);font-size:.95rem">Marketing emphasized River Hill&apos;s village amenities, Howard County school rankings, and Route 32 proximity&mdash;messaging crafted for dual-income professional households who represent the core buyer in this price range.</p></div>
<div class="strategy-step"><h4><i class="fas fa-handshake" style="color:var(--color-gold);margin-right:.5rem"></i>Step 4 &mdash; Active Negotiation to $1,175,000</h4><p style="color:var(--color-text-light);font-size:.95rem">With multiple offers in hand, strategic negotiation secured <strong>$1,175,000</strong>&mdash;$75,000 above list. Every lender call, title company issue, and final walkthrough was personally managed to protect the seller&apos;s equity and keep the transaction on track.</p></div>
<div class="price-box">
<p style="color:var(--color-text-light);margin-bottom:.5rem;font-size:.9rem;letter-spacing:1px;text-transform:uppercase">Final Sale Price</p>
<div class="big-price">$1,175,000</div>
<p style="color:var(--color-text-light);margin-top:.5rem">$75,000 above the $1,100,000 list price &bull; Closed February 2026</p>
</div>
</div></div>
</section>

<section class="section bg-cream">
<div class="container text-center" style="max-width:800px;margin:0 auto">
<span class="overline">Living Near River Hill?</span>
<h2 class="section-title">What Could Your Home Be Worth?</h2>
<div class="divider-center"></div>
<p style="font-size:1.1rem;color:var(--color-text-light);margin-bottom:1.5rem">If you live in River Hill, Wild Lake, Owen Brown, or anywhere in Columbia&mdash;the sale of 6409 Summer Sunrise Dr is a direct data point for your home&apos;s current market value. Howard County luxury homes are moving, and the right strategy means the difference between a good outcome and a great one.</p>
<p style="font-weight:500;margin-bottom:2rem">I provide a <strong>free, no-obligation Comparative Market Analysis</strong> so you know exactly where you stand before making any decisions.</p>
<a href="/contact" class="btn btn-primary" style="margin-right:1rem">Get My Home&apos;s Value</a>
<a href="/howard-county" class="btn btn-outline">Howard County Guide</a>
</div>
</section>

<section class="section bg-warm">
<div class="container text-center">
<h2 class="section-title">Thinking of Selling in Columbia or River Hill?</h2>
<p style="margin-bottom:2rem;font-size:1.1rem">Let&apos;s talk about your home&apos;s value in today&apos;s Howard County market. No pressure&mdash;just expert analysis.</p>
<a href="/contact" class="btn btn-primary" style="margin-right:1rem">Free Home Valuation</a>
<a href="tel:4439004056" class="btn btn-outline">Call: 443-900-4056</a>
</div>
</section>

{call_widget()}
{footer()}
<script src="../js/script.js"></script>
</body>
</html>"""

with open(os.path.join(sold_dir, '6409-summer-sunrise-columbia-md.html'), 'w', encoding='utf-8') as f:
    f.write(page1)
print("Page 1 written:", len(page1), "chars")

# ============================================================
# PAGE 2: 627 Tripp Creek Ct
# ============================================================
page2 = f"""<!DOCTYPE html>
<html lang="en">
<head>
<script type="application/ld+json">
{{
  "@context": "https://schema.org",
  "@type": "RealEstateListing",
  "name": "627 Tripp Creek Ct, Annapolis, MD 21401 - Sold $375,000",
  "url": "https://mitzisantayana.com/sold/627-tripp-creek-annapolis-md",
  "description": "4BR/2.5BA Oxford Landing townhome in Annapolis, MD sold for $375,000 in January 2026 by Mitzi Santayana REALTOR.",
  "address": {{"@type":"PostalAddress","streetAddress":"627 Tripp Creek Ct","addressLocality":"Annapolis","addressRegion":"MD","postalCode":"21401","addressCountry":"US"}},
  "offers": {{"@type":"Offer","price":"375000","priceCurrency":"USD","availability":"https://schema.org/SoldOut"}},
  "agent": {{"@type":"RealEstateAgent","name":"Mitzi Santayana","telephone":"+1-443-900-4056","url":"https://mitzisantayana.com"}}
}}
</script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sold: 627 Tripp Creek Ct Annapolis MD 21401 | Oxford Landing Townhome Sale – Mitzi Santayana</title>
<meta name="description" content="Case study: 627 Tripp Creek Ct Annapolis MD 21401, a 4BR/2.5BA Oxford Landing townhome sold for $375,000 in January 2026. See how Mitzi Santayana navigated the competitive Anne Arundel County market.">
<meta name="geo.region" content="US-MD">
<meta name="geo.placename" content="Annapolis, Maryland">
<link rel="canonical" href="https://mitzisantayana.com/sold/627-tripp-creek-annapolis-md">
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon.png">
{shared_styles()}
{CASE_STYLE}
</head>
<body>
{nav()}

<header class="hero" style="min-height:55vh;background-image:url('../assets/hero-home.png');background-size:cover;background-position:center">
<div class="hero-overlay"></div>
<div class="container hero-content text-center">
<span class="sold-badge">Sold &bull; January 2026</span>
<h1 class="hero-title fade-in-up">627 Tripp Creek Ct<br><span style="font-size:.6em;font-weight:400">Annapolis, MD 21401 &mdash; Oxford Landing</span></h1>
<p class="hero-subtitle fade-in-up delay-1">Sold $375,000 &bull; 4BR / 2.5BA Townhome &bull; Anne Arundel County</p>
</div>
</header>

<section class="section">
<div class="container"><div style="max-width:900px;margin:0 auto">
<span class="overline">Case Study &bull; Anne Arundel County</span>
<h2 class="section-title">Smart Townhome Sale in Annapolis: The Oxford Landing Story</h2>
<div class="divider-center"></div>
<div class="prop-stats">
<div class="prop-stat"><span class="prop-stat-val">$375,000</span><span class="prop-stat-lbl">Final Sale Price</span></div>
<div class="prop-stat"><span class="prop-stat-val">4 BR / 2.5 BA</span><span class="prop-stat-lbl">Bedrooms / Bathrooms</span></div>
<div class="prop-stat"><span class="prop-stat-val">Townhome</span><span class="prop-stat-lbl">Property Type</span></div>
<div class="prop-stat"><span class="prop-stat-val">Oxford Landing</span><span class="prop-stat-lbl">Community</span></div>
<div class="prop-stat"><span class="prop-stat-val">21401</span><span class="prop-stat-lbl">ZIP Code</span></div>
<div class="prop-stat"><span class="prop-stat-val">Jan 2026</span><span class="prop-stat-lbl">Closed Date</span></div>
</div>
<p style="font-size:1.1rem;color:var(--color-text-light);margin-bottom:1.5rem">The Annapolis townhome market is unique: buyers range from high-net-worth individuals to military families maximizing BAH, to investors seeking short-term rental income near the Naval Academy. Selling in this environment requires nuanced market knowledge and deliberate execution.</p>
<p style="font-size:1.1rem;font-weight:500">627 Tripp Creek Ct closed at <strong>$375,000</strong> in January 2026&mdash;demonstrating expertise in marketing and closing townhome transactions across Anne Arundel County&apos;s competitive landscape.</p>
</div></div>
</section>

<section class="section bg-cream">
<div class="container"><div style="max-width:900px;margin:0 auto">
<span class="overline">The Property</span>
<h2 class="section-title">What Made 627 Tripp Creek Court Stand Out</h2>
<div class="divider-center"></div>
<ul class="feature-grid">
<li><i class="fas fa-check-circle"></i> 4 bedrooms &amp; 2.5 bathrooms</li>
<li><i class="fas fa-check-circle"></i> Elevated deck overlooking wooded views</li>
<li><i class="fas fa-check-circle"></i> Lower-level storage room &amp; bonus space</li>
<li><i class="fas fa-check-circle"></i> Oxford Landing community, Annapolis MD 21401</li>
<li><i class="fas fa-check-circle"></i> Close to downtown Annapolis attractions</li>
<li><i class="fas fa-check-circle"></i> Within Naval Academy area commute zone</li>
<li><i class="fas fa-check-circle"></i> Access to major commuter routes (Rt 50, I-97)</li>
<li><i class="fas fa-check-circle"></i> Anne Arundel County school district</li>
</ul>
<p style="color:var(--color-text-light)">Oxford Landing is a well-maintained townhome community positioned near the heart of Annapolis&mdash;attractive to buyers who want proximity to the waterfront, the Naval Academy, and downtown dining without the premium price tag of a single-family home in the 21401 ZIP code.</p>
</div></div>
</section>

<section class="section">
<div class="container"><div style="max-width:900px;margin:0 auto">
<span class="overline">The Annapolis Market</span>
<h2 class="section-title">Navigating the Annapolis Townhome Buyer Pool</h2>
<div class="divider-center"></div>
<p style="color:var(--color-text-light);margin-bottom:1.5rem">The Annapolis market presents a unique competitive landscape. The 21401 and 21402 ZIP codes attract a diverse buyer mix&mdash;each with different motivations and purchasing strategies:</p>
<div class="strategy-step"><h4><i class="fas fa-briefcase" style="color:var(--color-gold);margin-right:.5rem"></i>High-Net-Worth &amp; Cash Buyers</h4><p style="color:var(--color-text-light);font-size:.95rem">Investors seeking vacation rental income and second-home buyers frequently enter the Annapolis market with cash offers, creating intense bidding environments. Effective pricing and staging are essential to attract these buyers and generate multiple-offer scenarios.</p></div>
<div class="strategy-step"><h4><i class="fas fa-shield-alt" style="color:var(--color-gold);margin-right:.5rem"></i>Military Families (USNA &amp; Area Bases)</h4><p style="color:var(--color-text-light);font-size:.95rem">As an MRP-Certified agent, I understand how military buyers think: they&apos;re maximizing BAH, working on tight PCS timelines, and often purchasing sight-unseen. Marketing 627 Tripp Creek Ct to this motivated segment was a deliberate strategy to generate qualified interest quickly.</p></div>
<div class="strategy-step"><h4><i class="fas fa-home" style="color:var(--color-gold);margin-right:.5rem"></i>Starter-Home &amp; Move-Up Buyers</h4><p style="color:var(--color-text-light);font-size:.95rem">First-time buyers and DC-Baltimore commuters seeking Annapolis lifestyle at an attainable price point represent a strong segment of the 21401 market. The wooded views and community setting of Oxford Landing were key selling points for this audience.</p></div>
<div class="price-box">
<p style="color:var(--color-text-light);margin-bottom:.5rem;font-size:.9rem;letter-spacing:1px;text-transform:uppercase">Final Sale Price</p>
<div class="big-price">$375,000</div>
<p style="color:var(--color-text-light);margin-top:.5rem">Oxford Landing Townhome &bull; Closed January 2026</p>
</div>
</div></div>
</section>

<section class="section bg-cream">
<div class="container text-center" style="max-width:800px;margin:0 auto">
<span class="overline">Selling a Townhome in Annapolis?</span>
<h2 class="section-title">Find Out What Your Home Is Worth</h2>
<div class="divider-center"></div>
<p style="font-size:1.1rem;color:var(--color-text-light);margin-bottom:1.5rem">If you own a home in Oxford Landing, Heritage Harbour, Annapolis Overlook, or anywhere in Anne Arundel County, the dynamics that sold 627 Tripp Creek Ct are directly relevant to your situation. I provide a <strong>free, no-obligation CMA</strong> with real market comps&mdash;so you can make an informed decision.</p>
<p style="font-weight:500;margin-bottom:2rem">Cross-market expertise matters: from $375K Anne Arundel townhomes to $1.17M Howard County luxury estates, the same strategic approach delivers results across every price point.</p>
<a href="/contact" class="btn btn-primary" style="margin-right:1rem">Get My Townhome&apos;s Value</a>
<a href="/anne-arundel-county" class="btn btn-outline">Anne Arundel County Guide</a>
</div>
</section>

<section class="section bg-warm">
<div class="container text-center">
<h2 class="section-title">Selling a Home in Annapolis or Anne Arundel County?</h2>
<p style="margin-bottom:2rem;font-size:1.1rem">Let&apos;s discuss your home&apos;s value in today&apos;s Annapolis market. No pressure&mdash;just expert analysis from a full-service REALTOR&reg;.</p>
<a href="/contact" class="btn btn-primary" style="margin-right:1rem">Free Home Valuation</a>
<a href="tel:4439004056" class="btn btn-outline">Call: 443-900-4056</a>
</div>
</section>

{call_widget()}
{footer('<a href="/faq/va-loan-ellicott-city-md.html">VA loans in Maryland</a><a href="/faq/pcs-move-buying-home-maryland.html">How does a PCS move work?</a>')}
<script src="../js/script.js"></script>
</body>
</html>"""

with open(os.path.join(sold_dir, '627-tripp-creek-annapolis-md.html'), 'w', encoding='utf-8') as f:
    f.write(page2)
print("Page 2 written:", len(page2), "chars")
print("Done!")
