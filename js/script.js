/**
 * Mitzi Santayana – Luxury Real Estate
 * ===================================================
 * FULL ANIMATION SYSTEM — script.js
 * 1. Page Transition ("Relaxation" Effect)
 * 2. Scroll Reveal ("Narrative" Effect)
 * 3. Parallax Scrolling ("Depth" Effect)
 * 4. Sticky Nav + Back-to-Top ("Control" Effect)
 * 5. Vibe Effect (cursor glow, particles, ripple)
 * + Mobile menu, active link, theme toggle, call widget
 * ===================================================
 */

// ─────────────────────────────────────────────────────
// BOOT
// ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initPageTransition();
    initMobileMenu();
    highlightActiveLink();
    initTheme();
    initScrollReveal();
    initParallax();
    initStickyNav();
    initBackToTop();
    initVibeEffect();
    initRippleEffect();
    initCallWidget();
    injectAdditionalRevealClasses();
    loadFooterComponent();
});

// ─────────────────────────────────────────────────────
// 1. PAGE TRANSITION ("Relaxation Effect")
//    Silk-curtain fade that covers the screen when
//    navigating away and reveals content on arrival.
// ─────────────────────────────────────────────────────
function initPageTransition() {
    // Inject overlay if not already in HTML
    let overlay = document.getElementById('page-transition');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'page-transition';
        document.body.prepend(overlay);
    }

    // Reveal: fade overlay OUT when page is ready
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            overlay.style.transition = 'opacity 0.65s cubic-bezier(0.4, 0, 0.2, 1)';
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
        });
    });

    // On any internal link click: fade overlay IN before navigating
    document.addEventListener('click', (e) => {
        const a = e.target.closest('a[href]');
        if (!a) return;

        const href = a.getAttribute('href');
        const isInternal =
            href &&
            !href.startsWith('#') &&
            !href.startsWith('mailto:') &&
            !href.startsWith('tel:') &&
            !href.startsWith('http') &&
            !a.hasAttribute('target');

        if (!isInternal) return;

        e.preventDefault();
        overlay.style.transition = 'opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1)';
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'all';

        setTimeout(() => {
            window.location.href = href;
        }, 480);
    });
}

// ─────────────────────────────────────────────────────
// 2. SCROLL REVEAL ("Narrative" Effect)
//    Observes elements and adds .is-visible when they
//    enter the viewport — supports up AND down scroll.
//    Every section gets a reveal class automatically.
// ─────────────────────────────────────────────────────
function initScrollReveal() {
    const selectors = [
        '.fade-in-up',
        '.reveal',
        '.reveal-left',
        '.reveal-right',
        '.reveal-scale',
        '.reveal-text',
        '.reveal-stagger',
    ].join(', ');

    const revealEls = document.querySelectorAll(selectors);

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible', 'visible');
                } else {
                    // Re-hide when scrolled back past (bidirectional)
                    const el = entry.target;
                    // Only re-hide if element is ABOVE viewport
                    if (entry.boundingClientRect.bottom < 0) {
                        el.classList.remove('is-visible', 'visible');
                    }
                }
            });
        },
        {
            root: null,
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.08,
        }
    );

    revealEls.forEach((el) => observer.observe(el));
}

// Auto-add reveal classes to every major section so nothing is missed
// Skips elements that already have CSS animation-driven opacity (e.g. home.css fadeInUp cards)
function injectAdditionalRevealClasses() {
    // Helper: check if element already has a CSS animation set
    function hasAnimation(el) {
        const style = window.getComputedStyle(el);
        const anim = style.animationName;
        return anim && anim !== 'none';
    }

    // Every .section-title that doesn't already have a reveal class
    document.querySelectorAll('.section-title:not(.reveal):not(.fade-in-up)').forEach((el) => {
        if (!hasAnimation(el)) el.classList.add('reveal');
    });

    // Each .service-card, .testimonial-card, .additional-service-card
    // Skip if they already animate via CSS (home.css uses fadeInUp)
    document.querySelectorAll(
        '.service-card:not(.reveal), .additional-service-card:not(.reveal)'
    ).forEach((el, i) => {
        if (!hasAnimation(el)) {
            el.classList.add('reveal');
            el.style.transitionDelay = `${i * 0.08}s`;
        }
    });

    // Testimonial cards
    document.querySelectorAll('.testimonial-card:not(.reveal)').forEach((el, i) => {
        if (!hasAnimation(el)) {
            el.classList.add('reveal');
            el.style.transitionDelay = `${i * 0.08}s`;
        }
    });

    // Overlines and dividers
    document.querySelectorAll('.overline:not(.reveal)').forEach((el) => {
        if (!hasAnimation(el)) el.classList.add('reveal');
    });
    document.querySelectorAll('.divider-center:not(.reveal-scale), .divider-left:not(.reveal-scale)').forEach((el) => {
        if (!hasAnimation(el)) el.classList.add('reveal-scale');
    });

    // Story / grid blocks
    document.querySelectorAll('.story-container:not(.reveal)').forEach((el) => {
        if (!hasAnimation(el)) el.classList.add('reveal');
    });

    // Footer sections
    document.querySelectorAll('.footer-brand:not(.reveal), .footer-links:not(.reveal), .footer-contact:not(.reveal)').forEach((el, i) => {
        if (!hasAnimation(el)) {
            el.classList.add('reveal');
            el.style.transitionDelay = `${i * 0.12}s`;
        }
    });

    // Run observer on all newly tagged elements (only once)
    const newEls = document.querySelectorAll('.reveal:not([data-observed]), .reveal-left:not([data-observed]), .reveal-right:not([data-observed]), .reveal-scale:not([data-observed])');
    if (newEls.length > 0) {
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible', 'visible');
                    } else if (entry.boundingClientRect.bottom < 0) {
                        entry.target.classList.remove('is-visible', 'visible');
                    }
                });
            },
            { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.08 }
        );
        newEls.forEach((el) => {
            el.setAttribute('data-observed', '1');
            obs.observe(el);
        });
    }
}

// ─────────────────────────────────────────────────────
// 3. PARALLAX SCROLLING ("Depth" Effect)
//    Handles two hero types:
//    a) <img class="hero-bg"> (homepage)
//    b) background-image inline style (county pages)
// ─────────────────────────────────────────────────────
function initParallax() {
    const hero = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg');   // img element
    const parallaxBgs = document.querySelectorAll('.parallax-bg');

    let ticking = false;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;

                if (hero) {
                    const heroHeight = hero.offsetHeight;
                    const heroBottom = hero.getBoundingClientRect().bottom;

                    if (heroBottom > 0) {
                        if (heroBg) {
                            // Hero uses <img class="hero-bg"> — translate the image
                            heroBg.style.transform = `scale(1.12) translateY(${scrollY * 0.22}px)`;
                        } else {
                            // Hero uses background-image — shift background-position
                            hero.style.backgroundPositionY = `calc(50% + ${scrollY * 0.38}px)`;
                        }

                        // Fade + lift hero content on scroll out
                        const heroContent = hero.querySelector('.hero-content');
                        if (heroContent) {
                            const progress = Math.min(scrollY / (heroHeight * 0.65), 1);
                            heroContent.style.opacity = Math.max(0, 1 - progress * 1.25);
                            heroContent.style.transform = `translateY(${scrollY * 0.12}px)`;
                        }
                    }
                }

                // Any standalone .parallax-bg
                parallaxBgs.forEach((bg) => {
                    if (bg.classList.contains('hero-bg')) return; // already handled above
                    const speed = parseFloat(bg.dataset.parallaxSpeed) || 0.3;
                    const parent = bg.closest('.parallax-section');
                    const rect = parent ? parent.getBoundingClientRect() : bg.getBoundingClientRect();
                    if (rect.bottom > 0 && rect.top < window.innerHeight) {
                        const offset = (rect.top - window.innerHeight / 2) * speed;
                        bg.style.transform = `translateY(${offset}px)`;
                    }
                });

                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Run once on load
}

// ─────────────────────────────────────────────────────
// 4. STICKY NAV + BACK-TO-TOP ("Control" Effect)
// ─────────────────────────────────────────────────────
function initStickyNav() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        if (scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide navbar on fast scroll down, reveal on scroll up
        // Use opacity + pointer-events so we don’t override translateX(-50%) centering
        if (scrollY > lastScroll + 15 && scrollY > 400) {
            navbar.style.opacity = '0';
            navbar.style.pointerEvents = 'none';
        } else if (scrollY < lastScroll - 5) {
            navbar.style.opacity = '1';
            navbar.style.pointerEvents = '';
        }

        lastScroll = scrollY;
    }, { passive: true });
}

function initBackToTop() {
    // Inject button
    let btn = document.getElementById('back-to-top');
    if (!btn) {
        btn = document.createElement('button');
        btn.id = 'back-to-top';
        btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        btn.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(btn);
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ─────────────────────────────────────────────────────
// 5. "VIBE" EFFECT
//    a) Cursor glow that follows mouse
//    b) Floating ambient particle canvas
//    c) Ripple on click (handled in initRippleEffect)
// ─────────────────────────────────────────────────────
function initVibeEffect() {
    // ── Cursor glow ──
    const glow = document.createElement('div');
    glow.id = 'cursor-glow';
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });

    // ── Ambient floating particles ──
    const canvas = document.createElement('canvas');
    canvas.id = 'vibe-canvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    window.addEventListener('resize', () => {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
    });

    const NUM_PARTICLES = 38;
    const particles = Array.from({ length: NUM_PARTICLES }, () => createParticle(W, H));

    function createParticle(w, h) {
        return {
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 1.8 + 0.4,
            dx: (Math.random() - 0.5) * 0.35,
            dy: (Math.random() - 0.5) * 0.35,
            a: Math.random() * 0.5 + 0.15,
            hue: Math.random() < 0.6 ? 38 : 0,  // gold or white
        };
    }

    function drawParticles() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach((p) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.hue === 38
                ? `rgba(197, 160, 89, ${p.a})`
                : `rgba(255, 255, 255, ${p.a * 0.5})`;
            ctx.fill();

            p.x += p.dx;
            p.y += p.dy;

            if (p.x < 0) p.x = W;
            if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H;
            if (p.y > H) p.y = 0;
        });
        requestAnimationFrame(drawParticles);
    }
    drawParticles();
}

// ─────────────────────────────────────────────────────
// RIPPLE on buttons/cards
// ─────────────────────────────────────────────────────
function initRippleEffect() {
    const rippleTargets = document.querySelectorAll(
        '.btn, .btn-primary, .btn-outline, .service-card, .testimonial-card, .footer-btn, .services-cta-btn, .service-cta-btn'
    );

    rippleTargets.forEach((el) => {
        if (window.getComputedStyle(el).position === 'static') {
            el.style.position = 'relative';
        }
        el.style.overflow = 'hidden';

        el.addEventListener('click', (e) => {
            const rect = el.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.width = size + 'px';
            ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            el.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    });
}

// ─────────────────────────────────────────────────────
// MOBILE MENU
// ─────────────────────────────────────────────────────
function initMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const links = document.querySelector('.nav-links');

    if (btn && links) {
        btn.addEventListener('click', () => {
            links.classList.toggle('active');
            btn.classList.toggle('open');
        });

        // Close on nav link click
        links.querySelectorAll('.nav-link, .btn.nav-btn').forEach((link) => {
            link.addEventListener('click', () => {
                links.classList.remove('active');
                btn.classList.remove('open');
            });
        });
    }
}

// ─────────────────────────────────────────────────────
// ACTIVE LINK HIGHLIGHTER
// ─────────────────────────────────────────────────────
function highlightActiveLink() {
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach((link) => {
        const href = link.getAttribute('href');
        if (
            href &&
            (currentPath.endsWith(href) ||
                (href === 'index.html' && (currentPath.endsWith('/') || currentPath === '')))
        ) {
            link.classList.add('active');
        }
    });
}

// ─────────────────────────────────────────────────────
// THEME TOGGLE
// ─────────────────────────────────────────────────────
function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateToggleIcon(savedTheme);

    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateToggleIcon(next);
    });
}

function updateToggleIcon(theme) {
    const icon = document.querySelector('#theme-toggle i');
    if (icon) icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// ─────────────────────────────────────────────────────
// CALL WIDGET
// ─────────────────────────────────────────────────────
function initCallWidget() {
    const callBtn = document.getElementById('callFloat');
    const callModal = document.getElementById('callModal');
    const closeModal = document.getElementById('closeModal');

    if (callBtn && callModal && closeModal) {
        callBtn.addEventListener('click', () => {
            callBtn.classList.add('animate');
            setTimeout(() => {
                callBtn.classList.remove('animate');
                callModal.classList.add('show');
            }, 600);
        });
        closeModal.addEventListener('click', () => callModal.classList.remove('show'));
    }
}

// ─────────────────────────────────────────────────────
// FOOTER COMPONENT LOADER (legacy pages that use fetch)
// ─────────────────────────────────────────────────────
function loadFooterComponent() {
    const footerContainer = document.getElementById('footer');
    if (footerContainer) {
        fetch('components/footer.html')
            .then((r) => r.text())
            .then((html) => { footerContainer.innerHTML = html; })
            .catch(() => { });
    }
}
