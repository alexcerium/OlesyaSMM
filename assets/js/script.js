// Image format support utilities
function getImageWithFallback(basePath) {
    if (!basePath) return 'assets/images/ui-placeholder.jpg';
    
    // Remove existing extension
    const pathWithoutExt = basePath.replace(/\.(jpg|jpeg)$/i, '');
    
    // Try .jpg first
    const jpgPath = `${pathWithoutExt}.jpg`;
    const jpegPath = `${pathWithoutExt}.jpeg`;
    
    return jpgPath;
}

// Function to handle image loading errors and try alternative extensions
function handleImageError(img) {
    const currentSrc = img.src;
    const isJpg = currentSrc.toLowerCase().endsWith('.jpg');
    const isJpeg = currentSrc.toLowerCase().endsWith('.jpeg');
    
    if (isJpg) {
        // Try .jpeg extension
        img.src = currentSrc.replace(/\.jpg$/i, '.jpeg');
    } else if (isJpeg) {
        // Try .jpg extension
        img.src = currentSrc.replace(/\.jpeg$/i, '.jpg');
    } else {
        // Fallback to placeholder
        img.src = 'assets/images/ui-placeholder.jpg';
    }
}

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
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
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(250, 235, 215, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(250, 235, 215, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Project modal functionality
    const clientCards = document.querySelectorAll('.client-card');
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close');
    const modalContent = document.querySelector('.modal-content');

    clientCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Close other open answers
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    const otherAnswer = otherQuestion.nextElementSibling;
                    const otherIcon = otherQuestion.querySelector('i');
                    otherAnswer.classList.remove('active');
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current answer
            answer.classList.toggle('active');
            icon.style.transform = answer.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
        });
    });



    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-item, .client-card, .pricing-card, .step, .certificate-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
});

// Project modal functions
function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const modalContent = document.querySelector('.modal-content');
    
    // Update modal content based on project
    const projectData = { id: projectId };
    updateModalContent(projectData);
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Animate modal appearance
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    const modalContent = document.querySelector('.modal-content');
    
    modal.style.opacity = '0';
    modalContent.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

function getProjectData(projectId) {
    const project = siteData.clients.items.find(item => item.id == projectId);
    return project ? project.modalData : siteData.clients.items[0].modalData;
}

function updateModalContent(projectData) {
    const project = siteData.clients.items.find(item => item.id == projectData.id);
    if (!project) return;
    
    const modalBody = document.querySelector('.modal-body');
    const stats = project.modalData.stats;
    
    modalBody.innerHTML = `
        <div class="project-gallery">
            <div class="project-image">
                <i class="fas fa-image"></i>
                <h3>${project.modalData.title}</h3>
                <p>${project.modalData.description}</p>
            </div>
            <div class="project-stats">
                <div class="stat">
                    <h4>Followers Growth</h4>
                    <span class="stat-number">${stats.followers}</span>
                </div>
                <div class="stat">
                    <h4>Engagement Rate</h4>
                    <span class="stat-number">${stats.engagement}</span>
                </div>
                <div class="stat">
                    <h4>Reach Increase</h4>
                    <span class="stat-number">${stats.reach}</span>
                </div>
            </div>
        </div>
    `;
}



// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Download CV functionality
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.querySelector('a[href="#"]');
    if (downloadBtn && downloadBtn.textContent === 'Download CV') {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('CV download feature will be implemented soon!', 'info');
        });
    }
});

// Add some additional interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Hover effects for pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0) scale(1)';
            } else {
                this.style.transform = 'scale(1.05)';
            }
        });
    });

    // Animate numbers in case study
    const resultNumbers = document.querySelectorAll('.result-number');
    const animateNumbers = () => {
        resultNumbers.forEach(number => {
            const target = parseInt(number.textContent.replace(/[^\d]/g, ''));
            const increment = target / 50;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                number.textContent = number.textContent.replace(/\d+/, Math.floor(current));
            }, 30);
        });
    };

    // Trigger number animation when case study is visible
    const caseSection = document.querySelector('.featured-case');
    if (caseSection) {
        const caseObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    caseObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        caseObserver.observe(caseSection);
    }
});
