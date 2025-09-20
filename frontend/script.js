// JavaScript for MyTechBlogs Interactive Features

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeInteractivity();
    setupScrollEffects();
    setupFormHandlers();
});

// Initialize all interactive features
function initializeInteractivity() {
    // Add loading animation
    document.body.classList.add('loaded');
    
    // Setup navbar scroll effect
    setupNavbarScroll();
    
    // Setup back to top button
    setupBackToTop();
    
    // Add smooth scrolling to anchor links
    setupSmoothScrolling();
    
    // Initialize tooltips if Bootstrap tooltips are needed
    initializeTooltips();
}

// Navbar scroll effect
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(102, 126, 234, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '';
            navbar.style.backdropFilter = '';
        }
    });
}

// Back to top button functionality
function setupBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
    }
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize tooltips
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Setup scroll effects for animations
function setupScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe blog cards and other elements
    document.querySelectorAll('.blog-card, .stats-card, .resource-card').forEach(card => {
        observer.observe(card);
    });
}

// Form handlers
function setupFormHandlers() {
    // Contact form handler
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Submit blog form handler
    const submitBlogForm = document.querySelector('#submitBlogForm');
    if (submitBlogForm) {
        submitBlogForm.addEventListener('submit', handleSubmitBlogForm);
    }

    // Feedback form handler
    const feedbackForm = document.querySelector('#feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', handleFeedbackForm);
    }
}

// Handle contact form submission
function handleContactForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        e.target.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Handle submit blog form
function handleSubmitBlogForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const author = formData.get('author');
    const email = formData.get('email');
    const content = formData.get('content');
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Submitting...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showNotification('Blog submitted successfully! We\'ll review it and get back to you.', 'success');
        e.target.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Handle feedback form
function handleFeedbackForm(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const feedback = formData.get('feedback');
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showNotification('Thank you for your feedback!', 'success');
        e.target.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 1500);
}

// Newsletter subscription
function subscribeNewsletter() {
    const emailInput = document.getElementById('newsletterEmail');
    const messageDiv = document.getElementById('newsletterMessage');
    const email = emailInput.value.trim();
    
    if (!email) {
        showMessage(messageDiv, 'Please enter your email address.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showMessage(messageDiv, 'Please enter a valid email address.', 'error');
        return;
    }
    
    // Show loading state
    const subscribeBtn = document.querySelector('.newsletter-section .btn');
    const originalText = subscribeBtn.innerHTML;
    subscribeBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Subscribing...';
    subscribeBtn.disabled = true;
    
    // Simulate subscription
    setTimeout(() => {
        showMessage(messageDiv, 'Successfully subscribed to our newsletter!', 'success');
        emailInput.value = '';
        
        // Reset button
        subscribeBtn.innerHTML = originalText;
        subscribeBtn.disabled = false;
    }, 2000);
}

// Toggle read more functionality
function toggleReadMore(button) {
    const card = button.closest('.blog-card');
    const cardText = card.querySelector('.card-text');
    const isExpanded = card.classList.contains('expanded');
    
    if (isExpanded) {
        // Collapse
        card.classList.remove('expanded');
        button.innerHTML = '<i class="fas fa-book-open me-1"></i>Read More';
        cardText.style.maxHeight = '';
    } else {
        // Expand
        card.classList.add('expanded');
        button.innerHTML = '<i class="fas fa-book me-1"></i>Read Less';
        
        // Add more content (simulate expanded content)
        const originalText = cardText.textContent;
        const expandedText = originalText + ' This is additional content that would normally be hidden. Here you would see the full blog post preview with more detailed information about the topic, including code examples, explanations, and useful tips for developers.';
        cardText.textContent = expandedText;
    }
}

// Utility function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)} me-2"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Show message in specific element
function showMessage(element, message, type = 'info') {
    element.innerHTML = `
        <div class="alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible fade show" role="alert">
            <i class="fas fa-${getNotificationIcon(type)} me-2"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
}

// Get notification icon based on type
function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Get notification color based on type
function getNotificationColor(type) {
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    return colors[type] || '#17a2b8';
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-left: 1rem;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .blog-card.expanded .card-text {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);

// Theme toggle functionality (bonus feature)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Load saved theme
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Call on page load
loadSavedTheme();