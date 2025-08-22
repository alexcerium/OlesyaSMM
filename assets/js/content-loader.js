// Content Loader - Dynamically populates website content from data.js

// Utility function to handle .jpg, .jpeg, and .png extensions
function getImagePath(basePath) {
    if (!basePath) return 'assets/images/ui-placeholder.jpg';
    
    // Remove existing extension if present
    const pathWithoutExt = basePath.replace(/\.(jpg|jpeg|png)$/i, '');
    
    // Try .png first, then .jpg, then .jpeg
    const pngPath = `${pathWithoutExt}.png`;
    const jpgPath = `${pathWithoutExt}.jpg`;
    const jpegPath = `${pathWithoutExt}.jpeg`;
    
    // For now, return the .png version (will be handled by fallback in CSS/HTML)
    return pngPath;
}

// Function to check if image exists and fallback to alternative extension
function checkImageExists(imagePath, callback) {
    const img = new Image();
    img.onload = function() {
        callback(imagePath);
    };
    img.onerror = function() {
        // Try alternative extensions in order: .png, .jpg, .jpeg
        let altPath;
        if (imagePath.match(/\.png$/i)) {
            altPath = imagePath.replace(/\.png$/i, '.jpg');
        } else if (imagePath.match(/\.jpg$/i)) {
            altPath = imagePath.replace(/\.jpg$/i, '.jpeg');
        } else if (imagePath.match(/\.jpeg$/i)) {
            altPath = imagePath.replace(/\.jpeg$/i, '.png');
        } else {
            callback('assets/images/ui-placeholder.jpg');
            return;
        }
        
        if (altPath !== imagePath) {
            const altImg = new Image();
            altImg.onload = function() {
                callback(altPath);
            };
            altImg.onerror = function() {
                // Try third extension
                let thirdPath;
                if (altPath.match(/\.png$/i)) {
                    thirdPath = altPath.replace(/\.png$/i, '.jpg');
                } else if (altPath.match(/\.jpg$/i)) {
                    thirdPath = altPath.replace(/\.jpg$/i, '.png');
                } else if (altPath.match(/\.jpeg$/i)) {
                    thirdPath = altPath.replace(/\.jpeg$/i, '.png');
                } else {
                    callback('assets/images/ui-placeholder.jpg');
                    return;
                }
                
                const thirdImg = new Image();
                thirdImg.onload = function() {
                    callback(thirdPath);
                };
                thirdImg.onerror = function() {
                    callback('assets/images/ui-placeholder.jpg');
                };
                thirdImg.src = thirdPath;
            };
            altImg.src = altPath;
        } else {
            callback('assets/images/ui-placeholder.jpg');
        }
    };
    img.src = imagePath;
}

document.addEventListener('DOMContentLoaded', function() {
    // Load navigation
    loadNavigation();
    
    // Load hero section
    loadHero();
    
    // Load about section
    loadAbout();
    
    // Load clients section
    loadClients();
    
    // Load featured case section
    loadFeaturedCase();
    
    // Load pricing section
    loadPricing();
    
    // Load workflow section
    loadWorkflow();
    
    // Load FAQ section
    loadFAQ();
    
    // Load certificates section
    loadCertificates();
    
    // Load contact section
    loadContact();
    
    // Load footer
    loadFooter();
});

// Navigation loader
function loadNavigation() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.innerHTML = siteData.navigation.map(item => 
            `<li><a href="${item.href}">${item.label}</a></li>`
        ).join('');
    }
}

// Hero section loader
function loadHero() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) heroTitle.textContent = siteData.hero.title;
    if (heroSubtitle) heroSubtitle.textContent = siteData.hero.subtitle;
    
    if (heroButtons) {
        heroButtons.innerHTML = siteData.hero.buttons.map(button => {
            const downloadAttr = button.download ? `download` : '';
            return `<a href="${button.href}" class="btn btn-${button.type}" ${downloadAttr}>${button.text}</a>`;
        }).join('');
    }
}

// About section loader
function loadAbout() {
    const aboutTitle = document.querySelector('#about .section-title');
    const aboutText = document.querySelector('.about-text');
    const softwareSection = document.querySelector('.software-section');
    const collaboratorsSection = document.querySelector('.collaborators-section');
    
    if (aboutTitle) aboutTitle.textContent = siteData.about.title;
    
    if (aboutText) {
        aboutText.innerHTML = siteData.about.content.map(paragraph => 
            `<p>${paragraph}</p>`
        ).join('');
    }
    
    if (softwareSection) {
        const softwareTitle = softwareSection.querySelector('h3');
        const softwareGrid = softwareSection.querySelector('.software-grid');
        
        if (softwareTitle) softwareTitle.textContent = siteData.about.software.title;
        if (softwareGrid) {
            softwareGrid.innerHTML = siteData.about.software.items.map(software => 
                `<div class="software-item">${software}</div>`
            ).join('');
        }
    }
    
    if (collaboratorsSection) {
        const collaboratorsTitle = collaboratorsSection.querySelector('h3');
        const collaboratorsGrid = collaboratorsSection.querySelector('.collaborators-grid');
        
        if (collaboratorsTitle) collaboratorsTitle.textContent = siteData.about.collaborators.title;
        if (collaboratorsGrid) {
            collaboratorsGrid.innerHTML = siteData.about.collaborators.items.map(collaborator => 
                `<div class="collaborator-item">
                    <h3 class="brand-name">${collaborator.brand}</h3>
                    <a href="${collaborator.link}" target="_blank" class="brand-link">
                        <i class="fas fa-paperclip"></i>
                        <span>View Profile</span>
                    </a>
                </div>`
            ).join('');
        }
    }
}

// Clients section loader
function loadClients() {
    const clientsTitle = document.querySelector('#clients .section-title');
    const clientsGrid = document.querySelector('.clients-grid');
    
    if (clientsTitle) clientsTitle.textContent = siteData.clients.title;
    
    if (clientsGrid) {
        clientsGrid.innerHTML = siteData.clients.items.map(client => 
            `<div class="client-card" data-project="${client.id}">
                <div class="client-image">
                    <img src="assets/images/${client.preview}" alt="${client.title} Project" class="client-project-image" onerror="this.style.display='none'; this.parentElement.classList.add('no-image');">
                </div>
                <h3>${client.title}</h3>
                <p>${client.description}</p>
            </div>`
        ).join('');
    }
}

// Featured case section loader
function loadFeaturedCase() {
    const caseTitle = document.querySelector('#case .section-title');
    const caseText = document.querySelector('.case-text h3');
    const caseDescription = document.querySelector('.case-text p');
    const caseImage = document.querySelector('.case-study-image');
    const caseResults = document.querySelector('.case-results');
    const caseButton = document.querySelector('.case-text .btn');
    
    if (caseTitle) caseTitle.textContent = siteData.featuredCase.title;
    if (caseText) caseText.textContent = siteData.featuredCase.projectTitle;
    if (caseDescription) caseDescription.textContent = siteData.featuredCase.description;
    if (caseImage) caseImage.src = `assets/images/${siteData.featuredCase.image}`;
    
    if (caseResults) {
        caseResults.innerHTML = siteData.featuredCase.results.map(result => 
            `<div class="result-item">
                <span class="result-number">${result.number}</span>
                <span class="result-label">${result.label}</span>
            </div>`
        ).join('');
    }
    
    if (caseButton) {
        caseButton.textContent = siteData.featuredCase.button.text;
        caseButton.href = siteData.featuredCase.button.href;
    }
}

// Pricing section loader
function loadPricing() {
    const pricingTitle = document.querySelector('#pricing .section-title');
    const pricingSubtitle = document.querySelector('#pricing .section-subtitle');
    const pricingGrid = document.querySelector('.pricing-grid');
    
    if (pricingTitle) pricingTitle.textContent = siteData.pricing.title;
    if (pricingSubtitle) pricingSubtitle.textContent = siteData.pricing.subtitle;
    
    if (pricingGrid) {
        pricingGrid.innerHTML = siteData.pricing.packages.map(pkg => 
            `<div class="pricing-card${pkg.featured ? ' featured' : ''}">
                <div class="card-content">
                    <h3>${pkg.title}</h3>
                    <div class="price">${pkg.price} ${pkg.period}</div>
                    <ul>
                        ${pkg.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                <div class="card-button">
                    <a href="${pkg.button.href}" class="btn btn-outline" data-href="${pkg.button.href}">${pkg.button.text}</a>
                </div>
            </div>`
        ).join('');
    }
}

// Workflow section loader
function loadWorkflow() {
    const workflowTitle = document.querySelector('#workflow .section-title');
    const workflowSteps = document.querySelector('.workflow-steps');
    
    if (workflowTitle) workflowTitle.textContent = siteData.workflow.title;
    
    if (workflowSteps) {
        workflowSteps.innerHTML = siteData.workflow.steps.map(step => 
            `<div class="step">
                <div class="step-header">
                    <div class="step-number">${step.number}</div>
                    <h3>${step.title}</h3>
                </div>
                <div class="step-time">${step.time}</div>
                <p>${step.description}</p>
            </div>`
        ).join('');
    }
}

// FAQ section loader
function loadFAQ() {
    const faqTitle = document.querySelector('#faq .section-title');
    const faqList = document.querySelector('.faq-list');
    
    if (faqTitle) faqTitle.textContent = siteData.faq.title;
    
    if (faqList) {
        faqList.innerHTML = siteData.faq.items.map(item => 
            `<div class="faq-item">
                <div class="faq-question">
                    <h3>${item.question}</h3>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer">
                    <p>${item.answer}</p>
                </div>
            </div>`
        ).join('');
    }
}

// Certificates section loader
function loadCertificates() {
    const certificatesTitle = document.querySelector('#certificates .section-title');
    const certificateTitle = document.querySelector('.certificate-title');
    const certificateImage = document.querySelector('.certificate-image img');
    const certificateDescription = document.querySelector('.certificate-description');
    
    if (certificatesTitle) certificatesTitle.textContent = siteData.certificates.title;
    
    if (certificateTitle) certificateTitle.textContent = siteData.certificates.items[0].title;
    if (certificateImage) certificateImage.src = `assets/images/${siteData.certificates.items[0].image}`;
    if (certificateDescription) certificateDescription.textContent = siteData.certificates.items[0].description;
}

// Contact section loader
function loadContact() {
    const contactTitle = document.querySelector('#contact .section-title');
    const contactHeading = document.querySelector('.contact-info h3');
    const contactDescription = document.querySelector('.contact-info p');
    const contactMethods = document.querySelector('.contact-methods');
    
    if (contactTitle) contactTitle.textContent = siteData.contact.title;
    if (contactHeading) contactHeading.textContent = siteData.contact.heading;
    if (contactDescription) contactDescription.textContent = siteData.contact.description;
    
    if (contactMethods) {
        contactMethods.innerHTML = siteData.contact.methods.map(method => 
            `<a href="${method.href}" class="contact-method">
                <i class="${method.icon}"></i>
                <span>${method.text}</span>
            </a>`
        ).join('');
    }
}

// Footer loader
function loadFooter() {
    const footerLinks = document.querySelector('.footer-links');
    const footerCredits = document.querySelector('.footer-credits p');
    
    if (footerLinks) {
        footerLinks.innerHTML = siteData.footer.links.map(link => 
            `<a href="${link.href}">${link.text}</a>`
        ).join('');
    }
    
    if (footerCredits) {
        footerCredits.textContent = siteData.footer.credits;
    }
}

// Update project modal data function
function updateModalContent(projectId) {
    const project = siteData.clients.items.find(item => item.id == projectId);
    if (!project) return;
    
    const modalBody = document.querySelector('.modal-body');
    const modal = project.modal;
    
    modalBody.innerHTML = `
        <div class="project-gallery">
            <div class="project-image">
                <img src="assets/images/${modal.image}" alt="${modal.title}" class="modal-project-image" onerror="this.style.display='none'; this.parentElement.classList.add('no-image');">
            </div>
            <div class="project-content">
                <h2 class="project-title">${modal.title}</h2>
                <p class="project-description">${modal.text}</p>
            </div>
        </div>
    `;
}
