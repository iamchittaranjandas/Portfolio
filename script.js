// ========================================
// Typewriter Effect
// ========================================
const typewriterPhrases = [
    'scalable .NET applications.',
    'REST APIs & microservices.',
    'cloud-native solutions on Azure.',
    'enterprise management systems.',
    'secure government platforms.',
    'clean, maintainable code.'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

if (typewriterEl) {
    function typewrite() {
        const currentPhrase = typewriterPhrases[phraseIndex];

        if (isDeleting) {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 30 : 60;

        if (!isDeleting && charIndex === currentPhrase.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % typewriterPhrases.length;
            speed = 500;
        }

        setTimeout(typewrite, speed);
    }
    typewrite();
}

// ========================================
// Scroll Animations (Intersection Observer)
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// ========================================
// Navbar Scroll Effect
// ========================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
    }
});

// ========================================
// Active Nav Link on Scroll
// ========================================
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-primary');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-primary');
        }
    });
});

// ========================================
// Mobile Menu
// ========================================
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

if (hamburger && navLinksContainer) {
    hamburger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
    });

    // Close menu on link click and outside click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinksContainer.contains(e.target) && navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
        }
    });
}

// ========================================
// Theme Toggle
// ========================================
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

// Check for saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
root.setAttribute('data-theme', savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const current = root.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
}

// ========================================
// Animated Counter
// ========================================
const statNumbers = document.querySelectorAll('.count-up');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseFloat(el.dataset.target);
            const isDecimal = target % 1 !== 0;
            const duration = 2000; // 2 seconds
            const startTime = performance.now();

            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                const currentValue = eased * target;

                el.textContent = isDecimal
                    ? currentValue.toFixed(1)
                    : Math.round(currentValue);

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }

            requestAnimationFrame(updateCounter);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

// ========================================
// Bento Card Mouse Glow Effect (Premium Flashlight)
// ========================================
if (window.matchMedia('(pointer: fine)').matches) {
    const cards = document.querySelectorAll('.bento-card');

    cards.forEach(card => {
        const glow = card.querySelector('.bento-glow');
        if (!glow) return;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            // Calculate mouse position relative to card
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Move the glow element using transform translate to follow the mouse perfectly
            glow.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        });
    });
}

// ========================================
// Smooth scroll for all anchor links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
