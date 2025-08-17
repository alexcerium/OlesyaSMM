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

// Heart animation for pricing buttons
function createHeartAnimation(button, callback) {
    const numHearts = 22;
    let heartsCreated = 0;
    
    // Get the button position for heart origin
    const buttonRect = button.getBoundingClientRect();
    const pricingSection = document.querySelector('.pricing');
    const sectionRect = pricingSection.getBoundingClientRect();
    
    // Calculate button center relative to pricing section
    const buttonCenterX = buttonRect.left - sectionRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top - sectionRect.top + buttonRect.height / 2;
    
    // Trigger callback quickly after animation starts
    setTimeout(() => {
        if (callback) {
            callback();
        }
    }, 400); // Much faster redirect - only 400ms delay
    
    for (let i = 0; i < numHearts; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.className = 'heart-particle';
            heart.textContent = '🤍';
            
            // Start from button position with slight random offset
            const startX = buttonCenterX + (Math.random() - 0.5) * 60; // ±30px horizontal spread
            const startY = buttonCenterY + (Math.random() - 0.5) * 30; // ±15px vertical spread
            
            // Fly upwards with much wider horizontal variation
            const horizontalVariation = (Math.random() - 0.5) * 600; // ±300px horizontal movement
            const upwardDistance = 250 + Math.random() * 350; // 250-600px upward flight
            
            heart.style.left = startX + 'px';
            heart.style.top = startY + 'px';
            heart.style.setProperty('--end-x', horizontalVariation + 'px');
            heart.style.setProperty('--end-y', -upwardDistance + 'px');
            
            pricingSection.appendChild(heart);
            heartsCreated++;
            
            // Remove heart after animation (no tracking needed since redirect happens quickly)
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 2500);
        }, i * 50); // Faster creation for snappier effect
    }
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
    const animateElements = document.querySelectorAll('.client-card, .pricing-card, .step, .certificate-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Special animation observer for software and collaborators sections
    const skillsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillItems = entry.target.querySelectorAll('.software-item, .collaborator-item');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 150); // Stagger animation
                });
            } else {
                // Reset animation when section is out of view
                const skillItems = entry.target.querySelectorAll('.software-item, .collaborator-item');
                skillItems.forEach(item => {
                    item.classList.remove('animate');
                });
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe software and collaborators sections
    const softwareSection = document.querySelector('.software-section');
    const collaboratorsSection = document.querySelector('.collaborators-section');
    
    if (softwareSection) skillsObserver.observe(softwareSection);
    if (collaboratorsSection) skillsObserver.observe(collaboratorsSection);

    // Scroll-triggered border shimmer animation
    let shimmerTimeout;
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        clearTimeout(shimmerTimeout);
        
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDirection = currentScrollTop > lastScrollTop ? 'down' : 'up';
        lastScrollTop = currentScrollTop;
        
        shimmerTimeout = setTimeout(() => {
            const skillItems = document.querySelectorAll('.software-item.animate, .collaborator-item.animate');
            skillItems.forEach((item, index) => {
                setTimeout(() => {
                    // Add shimmer class for border animation
                    item.classList.add('shimmer');
                    setTimeout(() => {
                        item.classList.remove('shimmer');
                    }, 2000);
                }, index * 100);
            });
        }, 50);
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
    updateModalContent(projectId);
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Animate modal appearance
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
        
        // Start entrance animations after modal appears
        setTimeout(() => {
            // Animate project image first
            const projectImage = document.querySelector('.project-image');
            if (projectImage) {
                projectImage.classList.add('animate');
            }
            
            // Then animate content sections sequentially
            setTimeout(() => {
                const projectContent = document.querySelector('.project-content');
                if (projectContent) {
                    projectContent.classList.add('animate');
                }
            }, 300);
            
        }, 200);
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    const modalContent = document.querySelector('.modal-content');
    
    // Reset entrance animations
    const projectImage = document.querySelector('.project-image');
    const projectContent = document.querySelector('.project-content');
    
    if (projectImage) projectImage.classList.remove('animate');
    if (projectContent) projectContent.classList.remove('animate');
    
    modal.style.opacity = '0';
    modalContent.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

function getProjectData(projectId) {
    const project = siteData.clients.items.find(item => item.id == projectId);
    return project ? project.modal : siteData.clients.items[0].modal;
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

// Download functionality is now handled by the download attribute in the HTML

// Add some additional interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Heart animation for pricing buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-outline')) {
            e.preventDefault();
            const href = e.target.getAttribute('data-href');
            
            createHeartAnimation(e.target, function() {
                // Redirect after ALL hearts have disappeared
                if (href.startsWith('#')) {
                    // Smooth scroll to section
                    const targetSection = document.querySelector(href);
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                } else {
                    // External link
                    window.location.href = href;
                }
            });
        }
    });

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
