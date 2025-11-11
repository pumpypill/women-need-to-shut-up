// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Petition counter animation
    function animateCounter() {
        const counter = document.querySelector('.counter-number');
        if (!counter) return;
        
        const target = 12847;
        const increment = target / 200;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            counter.textContent = Math.floor(current).toLocaleString();
            
            if (current >= target) {
                counter.textContent = target.toLocaleString();
                clearInterval(timer);
            }
        }, 20);
    }
    
    // Intersection Observer for counter animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const counterElement = document.querySelector('.petition-counter');
    if (counterElement) {
        counterObserver.observe(counterElement);
    }
    
    // Button click handlers
    function setupButtonHandlers() {
        // Learn more button - scroll to about section instead of mission
        const learnMoreButtons = document.querySelectorAll('.btn-secondary');
        learnMoreButtons.forEach(button => {
            if (button.textContent.includes('Learn More')) {
                button.addEventListener('click', function() {
                    document.getElementById('about').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                });
            }
        });
    }
    
    // Setup all button handlers
    setupButtonHandlers();
    
    // Scroll-based animations for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                entry.target.style.opacity = '1';
            }
        });
    }, observerOptions);
    
    // Observe all cards
    const cards = document.querySelectorAll('.mission-card, .fact-card, .testimonial');
    cards.forEach(card => {
        card.style.opacity = '0';
        cardObserver.observe(card);
    });
    
    // Dynamic copyright year
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.footer-bottom p');
    if (copyrightElement) {
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2025', currentYear);
    }
    
    // Add some randomization to the petition counter
    setInterval(() => {
        const counter = document.querySelector('.counter-number');
        if (counter) {
            const currentValue = parseInt(counter.textContent.replace(/,/g, ''));
            const randomChange = Math.floor(Math.random() * 10) - 5;
            const newValue = Math.max(0, currentValue + randomChange);
            counter.textContent = newValue.toLocaleString();
        }
    }, 30000); // Update every 30 seconds
});

// Add some CSS for initial card states
const initialStyles = `
    .mission-card,
    .fact-card,
    .testimonial {
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
`;

const styleElement = document.createElement('style');
styleElement.textContent = initialStyles;
document.head.appendChild(styleElement);