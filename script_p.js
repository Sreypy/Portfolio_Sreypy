// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation
    const navLinks = document.querySelectorAll('.navigation a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Basic validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            alert('Please fill in all fields.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Simulate form submission
        const submitButton = this.querySelector('.btn-submit');
        const originalText = submitButton.textContent;

        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);

        // In a real application, you would send the data to your server here
        console.log('Form submitted with data:', data);
    });

    // Hero section button functionality
    const viewProjectBtn = document.querySelector('.btn-primary');
    const getInTouchBtn = document.querySelector('.btn-secondary');

    viewProjectBtn.addEventListener('click', function() {
        document.querySelector('#portfolio').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

    getInTouchBtn.addEventListener('click', function() {
        document.querySelector('#contact').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

    // Add active navigation state
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navigation a');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // Add CSS for active navigation state
    const style = document.createElement('style');
    style.textContent = `
        .navigation a.active {
            color: #d97706;
            font-weight: bold;
        }

        .navigation a:hover {
            color: #d97706;
        }

        /* Fade in animation for sections */
        section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        section.visible {
            opacity: 1;
            transform: translateY(0);
        }

        /* Initial state for hero section */
        .hero-section {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Scroll event listener for active navigation
    window.addEventListener('scroll', updateActiveNavigation);

    // Initial call to set active navigation
    updateActiveNavigation();

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all sections except hero
    const sectionsToObserve = document.querySelectorAll('section:not(.hero-section)');
    sectionsToObserve.forEach(section => {
        observer.observe(section);
    });

    // Make hero section visible immediately
    document.querySelector('.hero-section').classList.add('visible');
});

// Form input focus effects
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, textarea');

    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // Add focus styles
    const focusStyle = document.createElement('style');
    focusStyle.textContent = `
        .form-group.focused label {
            color: #d97706;
        }

        .form-group input:focus,
        .form-group textarea:focus {
            border-color: #d97706;
            box-shadow: 0px 4px 4px rgba(0,0,0,0.25), 0 0 0 2px rgba(217, 119, 6, 0.2);
        }
    `;
    document.head.appendChild(focusStyle);
});
