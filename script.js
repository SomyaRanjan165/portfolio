// Added smoother interaction behavior
// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        setTimeout(() => {
            preloader.remove();
        }, 600);
    }
});

// Custom Cursor Glow
const cursorGlow = document.getElementById('cursor-glow');
if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateCursor = () => {
        // Smooth interpolation
        let dx = mouseX - cursorX;
        let dy = mouseY - cursorY;
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        
        cursorGlow.style.transform = `translate(calc(-50% + ${cursorX}px), calc(-50% + ${cursorY}px))`;
        requestAnimationFrame(animateCursor);
    };
    animateCursor();
}

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

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animate hamburger lines
        const lines = hamburger.querySelectorAll('.line');
        navLinks.classList.contains('active') ? 
            lines.forEach(l => l.style.backgroundColor = 'var(--accent)') : 
            lines.forEach(l => l.style.backgroundColor = 'var(--text-primary)');
    });
}

// Active Nav Highlighting
const sections = document.querySelectorAll('section, header');
const navItems = document.querySelectorAll('.nav-links a');

const navObserverOptions = {
    threshold: 0.3,
    rootMargin: "-100px 0px -100px 0px"
};

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === entry.target.id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, navObserverOptions);

sections.forEach(sec => navObserver.observe(sec));


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
            
            // Stagger grid children if applicable
            if (entry.target.classList.contains('stagger-grid')) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                    child.classList.add('visible');
                });
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const fadeElements = document.querySelectorAll('.fade-in, .stagger-grid');
fadeElements.forEach(el => observer.observe(el));

// Animated Counters
const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // ms
                const increment = target / (duration / 16); // 60fps
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
            });
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.getElementById('statistics');
if (statsSection) counterObserver.observe(statsSection);

// Typing Effect
const textArray = ["AI/ML Engineer", "Full Stack Developer", "Content Creator"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; 
let textArrayIndex = 0;
let charIndex = 0;

const typingTextSpan = document.querySelector('.typing-text');

function type() {
    if (!typingTextSpan) return;
    if (charIndex < textArray[textArrayIndex].length) {
        typingTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (!typingTextSpan) return;
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

// Canvas Particles
const canvas = document.getElementById('particles-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
            this.baseAlpha = Math.random() * 0.5 + 0.1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = `rgba(0, 240, 255, ${this.baseAlpha})`;
            ctx.fill();
        }
        update() {
            if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
            if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
            
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function initParticles() {
        particlesArray = [];
        const numberOfParticles = (canvas.height * canvas.width) / 15000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 0.5;
            let x = (Math.random() * ((canvas.width - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((canvas.height - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * 1) - 0.5;
            let directionY = (Math.random() * 1) - 0.5;
            let color = '#00f0ff';
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function animateParticles() {
        requestAnimationFrame(animateParticles);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connectParticles();
    }

    function connectParticles() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = `rgba(0, 240, 255, ${opacityValue * 0.2})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    initParticles();
    animateParticles();
}

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
