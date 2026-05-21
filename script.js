// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger lines
    const lines = hamburger.querySelectorAll('.line');
    navLinks.classList.contains('active') ? 
        lines.forEach(l => l.style.backgroundColor = 'var(--accent)') : 
        lines.forEach(l => l.style.backgroundColor = 'var(--text-primary)');
});

// Smooth reveal elements on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(el => observer.observe(el));

// Typing Effect
const textArray = ["AI/ML Engineer", "Full Stack Developer", "Content Creator"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; 
let textArrayIndex = 0;
let charIndex = 0;

const typingTextSpan = document.querySelector('.typing-text');

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typingTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typingTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 500);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if (textArray.length) setTimeout(type, newTextDelay);
});

// Form submission (prevent default for demo)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Message Sent <i class="fa-solid fa-check"></i>';
        btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        btn.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.5)';
        
        // Reset form and button after 3 seconds
        setTimeout(() => {
            contactForm.reset();
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.boxShadow = '';
        }, 3000);
    });
}
