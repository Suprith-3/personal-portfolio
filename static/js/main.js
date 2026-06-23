// Toggle Icon Navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};



// Scroll Sections Active Link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    let top = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    // Remove toggle icon and navbar when click navbar link
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Typed.js Animation
const typed = new Typed('.multiple-text', {
    strings: ['Full Stack Developer', 'AI Developer', 'Software Engineer', 'Tech Enthusiast'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// GSAP Animations with ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animation
gsap.from('.home-content', {
    opacity: 0,
    y: 50,
    duration: 1,
    delay: 0.2
});

gsap.from('.home-img', {
    opacity: 0,
    scale: 0.8,
    duration: 1,
    delay: 0.4
});

// General Section Scroll Animations
const animateOnScroll = (element, yOffset = 50) => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: yOffset,
        duration: 0.8,
        stagger: 0.2
    });
};

animateOnScroll('.about-img', -50);
animateOnScroll('.about-content');
animateOnScroll('.timeline-item');
animateOnScroll('.skill-category');
animateOnScroll('.service-box');
animateOnScroll('.portfolio-box');
animateOnScroll('.achievements-container');
animateOnScroll('.contact-wrapper');

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submit-btn');
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, message })
            });

            const result = await response.json();
            
            formStatus.style.display = 'block';
            formStatus.style.color = 'var(--main-color)';
            formStatus.innerText = result.message || 'Message sent successfully!';
            
            contactForm.reset();
        } catch (error) {
            formStatus.style.display = 'block';
            formStatus.style.color = 'red';
            formStatus.innerText = 'Failed to send message. Please try again.';
        } finally {
            submitBtn.innerText = 'Send Message';
            submitBtn.disabled = false;
            
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    });
}

// High-performance Canvas Constellation Background
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let mouse = { x: null, y: null, radius: 150 };

// Resize Canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
}

// Particle Class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1.0;
        this.vy = (Math.random() - 0.5) * 1.0;
        this.radius = Math.random() * 2 + 1.5;
        this.color = Math.random() > 0.5 ? 'rgba(0, 240, 255, 0.7)' : 'rgba(188, 19, 254, 0.7)'; // Blue or Purple
    }

    update() {
        // Move particle
        this.x += this.vx;
        this.y += this.vy;

        // Bounce boundaries
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // Mouse interaction (gentle attraction/repulsion)
        if (mouse.x !== null && mouse.y !== null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) {
                // Gentle push away
                let force = (mouse.radius - dist) / mouse.radius;
                this.x -= (dx / dist) * force * 1.5;
                this.y -= (dy / dist) * force * 1.5;
            }
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset shadow for lines performance
    }
}

// Initialize Particle Array
function initParticles() {
    particles = [];
    const particleDensity = (canvas.width * canvas.height) / 10000;
    const count = Math.min(Math.floor(particleDensity), 120); // Cap at 120 for performance
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }
}

// Connect nearby particles with glowing lines
function connectParticles() {
    const connectionDist = 120;
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            let dx = particles[i].x - particles[j].x;
            let dy = particles[i].y - particles[j].y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectionDist) {
                // Line opacity falls off with distance
                let alpha = (connectionDist - dist) / connectionDist * 0.15;
                ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
                ctx.lineWidth = 1.0;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }

        // Draw connections to the mouse as well
        if (mouse.x !== null && mouse.y !== null) {
            let dx = particles[i].x - mouse.x;
            let dy = particles[i].y - mouse.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) {
                let alpha = (mouse.radius - dist) / mouse.radius * 0.25;
                ctx.strokeStyle = `rgba(188, 19, 254, ${alpha})`; // Purple lines to cursor
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    }
}

// Animation Loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    connectParticles();
    requestAnimationFrame(animate);
}

// Event Listeners
window.addEventListener('resize', resizeCanvas);

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

// Run Constellation Effect
resizeCanvas();
animate();
