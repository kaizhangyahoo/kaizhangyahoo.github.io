// ============================================
// SRE Terminal Theme — Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initStatusUpdater();
});

// --- Header scroll effect ---
function initHeaderScroll() {
    const header = document.getElementById('site-header');
    if (!header) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                ticking = false;
            });
            ticking = true;
        }
    });
}

// --- Mobile menu toggle ---
function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        toggle.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            toggle.classList.remove('active');
        });
    });
}

// --- Smooth scrolling for anchor links ---
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// --- Scroll-triggered animations ---
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe cards, timeline items, cert cards, connect cards
    const animateElements = document.querySelectorAll(
        '.card, .timeline-item, .cert-card, .connect-card'
    );

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`;
        observer.observe(el);
    });
}

// Add CSS class for animated-in elements
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// --- Live status updater (simulated uptime counter) ---
function initStatusUpdater() {
    const metricsEl = document.querySelector('.status-metrics');
    if (!metricsEl) return;

    // Simulate slight latency variations
    setInterval(() => {
        const latency = Math.floor(Math.random() * 8) + 8; // 8-15ms range
        const metricValues = metricsEl.querySelectorAll('.metric-value');
        if (metricValues.length >= 2) {
            metricValues[1].textContent = latency + 'ms';
        }
    }, 3000);
}
