// Main JavaScript for Qanadi Rahmani Landing Page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Initialize consultation form
    initConsultationForm();
    
    // Initialize budget slider
    initBudgetSlider();
    
    // Initialize navbar scroll effect
    initNavbarScrollEffect();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize interactive elements
    initInteractiveElements();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize consultation form
function initConsultationForm() {
    const form = document.getElementById('consultationForm');
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validateForm(form)) {
                // Simulate form submission
                submitForm(form, successModal);
            }
        });
    }
}

// Form validation
function validateForm(form) {
    const fullName = form.querySelector('#fullName');
    const phone = form.querySelector('#phone');
    let isValid = true;
    
    // Reset previous validation states
    form.querySelectorAll('.is-invalid').forEach(el => {
        el.classList.remove('is-invalid');
    });
    
    // Validate full name
    if (!fullName.value.trim()) {
        fullName.classList.add('is-invalid');
        isValid = false;
    }
    
    // Validate phone number (Persian/English digits, 10-15 characters)
    const phoneRegex = /^[\d۰-۹]{10,15}$/;
    if (!phoneRegex.test(phone.value.trim())) {
        phone.classList.add('is-invalid');
        isValid = false;
    }
    
    return isValid;
}

// Simulate form submission
function submitForm(form, successModal) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading me-2"></span>در حال ارسال...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset form
        form.reset();
        document.getElementById('budgetValue').textContent = '500 میلیون';
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success modal
        successModal.show();
        
        // Track form submission (you can replace this with actual analytics)
        console.log('Form submitted successfully');
    }, 2000);
}

// Initialize budget slider
function initBudgetSlider() {
    const budgetSlider = document.getElementById('budget');
    const budgetValue = document.getElementById('budgetValue');
    
    if (budgetSlider && budgetValue) {
        budgetSlider.addEventListener('input', function() {
            budgetValue.textContent = `${this.value} میلیون`;
        });
    }
}

// Initialize navbar scroll effect
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Initialize scroll animations
function initScrollAnimations() {
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
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(el => observer.observe(el));
}

// Initialize interactive elements
function initInteractiveElements() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.process-step, .benefit-card, .project-card, .comparison-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Initialize comparison toggle (if needed)
    initComparisonToggle();
    
    // Initialize project gallery interactions
    initProjectGallery();
}

// Initialize comparison toggle functionality
function initComparisonToggle() {
    const comparisonCards = document.querySelectorAll('.comparison-card');
    
    comparisonCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add active state or toggle functionality here
            this.classList.toggle('active');
        });
    });
}

// Initialize project gallery interactions
function initProjectGallery() {
    const projectImages = document.querySelectorAll('.project-card img');
    
    projectImages.forEach(img => {
        img.addEventListener('click', function() {
            // You can add lightbox functionality here
            console.log('Image clicked:', this.src);
        });
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimized scroll handler
const optimizedScrollHandler = throttle(function() {
    const scrolled = window.scrollY;
    const navbar = document.querySelector('.navbar');
    
    if (scrolled > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.95) !important;
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .comparison-card.active {
        transform: scale(1.02);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
    }
`;

document.head.appendChild(style);

// Add loading animation for images
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
}

// Initialize image loading
initImageLoading();

// Add error handling for images
function initImageErrorHandling() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/400x300?text=تصویر+در+دسترس+نیست';
            this.alt = 'تصویر در دسترس نیست';
        });
    });
}

// Initialize image error handling
initImageErrorHandling();

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close modals
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.show');
        if (openModal) {
            const modal = bootstrap.Modal.getInstance(openModal);
            if (modal) {
                modal.hide();
            }
        }
    }
    
    // Enter key to submit forms
    if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
        const form = e.target.closest('form');
        if (form) {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.click();
            }
        }
    }
});

// Add focus management for accessibility
function initAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'پرش به محتوای اصلی';
    skipLink.className = 'skip-link sr-only';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 9999;
        border-radius: 4px;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID
    const heroSection = document.getElementById('home');
    if (heroSection) {
        heroSection.id = 'main-content';
    }
}

// Initialize accessibility features
initAccessibility();

// Console welcome message
console.log(`
🏪 قنادی رحمانی - سیستم مدیریت محتوا
📧 برای پشتیبانی: info@qanadi-rahmani.com
🌐 وب‌سایت: https://qanadi-rahmani.com
`);