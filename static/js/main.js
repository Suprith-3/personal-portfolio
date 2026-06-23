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

// Simple Particle Effect using JS to generate CSS shapes
const particlesContainer = document.getElementById('particles');
const particleCount = 50;

for(let i = 0; i < particleCount; i++) {
    let particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 5 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = Math.random() > 0.5 ? 'var(--main-color)' : 'var(--accent-color)';
    particle.style.borderRadius = '50%';
    particle.style.opacity = Math.random() * 0.5;
    particle.style.top = Math.random() * 100 + 'vh';
    particle.style.left = Math.random() * 100 + 'vw';
    
    // Animate using GSAP
    gsap.to(particle, {
        y: `-${Math.random() * 100 + 50}vh`,
        x: `${(Math.random() - 0.5) * 100}vw`,
        duration: Math.random() * 10 + 10,
        repeat: -1,
        ease: "none",
        delay: -Math.random() * 20
    });
    
    particlesContainer.appendChild(particle);
}
