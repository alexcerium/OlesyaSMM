// Website Data Configuration
const siteData = {
    // Site Information
    site: {
        title: "Professional SMM Specialist",
        logo: "SMM PRO",
        description: "Transforming brands through strategic social media marketing"
    },

    // Navigation
    navigation: [
        { id: "home", label: "Home", href: "#home" },
        { id: "about", label: "About", href: "#about" },
        { id: "clients", label: "Clients", href: "#clients" },
        { id: "case", label: "Case", href: "#case" },
        { id: "pricing", label: "Pricing", href: "#pricing" },
        { id: "workflow", label: "Workflow", href: "#workflow" },
        { id: "faq", label: "FAQ", href: "#faq" },
        { id: "certificates", label: "Certificates", href: "#certificates" },
        { id: "contact", label: "Contact", href: "#contact" }
    ],

    // Hero Section
    hero: {
        title: "PROFESSIONAL SMM SPECIALIST",
        subtitle: "Transforming brands through strategic social media marketing",
        buttons: [
            { text: "Download CV", href: "#", type: "primary" },
            { text: "Contact Me", href: "#contact", type: "secondary" }
        ]
    },

    // About Section
    about: {
        title: "ABOUT ME",
        content: [
            "I am a passionate SMM specialist with over 5 years of experience in creating engaging social media strategies that drive real business results. My expertise spans across Instagram, Facebook, TikTok, and LinkedIn marketing.",
            "I specialize in content creation, community management, influencer partnerships, and data-driven campaign optimization. Every project I work on is approached with creativity, strategy, and measurable outcomes in mind."
        ],
        skills: {
            title: "Skills & Expertise",
            items: [
                { icon: "fas fa-chart-line", text: "Strategy Development" },
                { icon: "fas fa-camera", text: "Content Creation" },
                { icon: "fas fa-users", text: "Community Management" },
                { icon: "fas fa-analytics", text: "Analytics & Reporting" }
            ]
        },
        software: {
            title: "Software & Tools",
            items: [
                "Canva Pro",
                "Adobe Creative Suite",
                "Later",
                "Hootsuite",
                "Google Analytics",
                "Meta Business Suite"
            ]
        }
    },

    // Clients Section
    clients: {
        title: "CLIENTS & PROJECTS",
        items: [
            {
                id: 1,
                icon: "fab fa-instagram",
                title: "Fashion Brand",
                description: "Luxury fashion boutique",
                results: "+150% engagement",
                image: "assets/images/clients-fashion-brand.jpg",
                modalData: {
                    title: "Fashion Brand Transformation",
                    description: "Complete social media overhaul for a luxury fashion boutique",
                    stats: {
                        followers: "+250%",
                        engagement: "8.5%",
                        reach: "+400%"
                    },
                    images: [
                        "assets/images/case-study-hero.jpg",
                        "assets/images/case-study-before.jpg",
                        "assets/images/case-study-after.jpg"
                    ]
                }
            },
            {
                id: 2,
                icon: "fas fa-utensils",
                title: "Restaurant Chain",
                description: "Fine dining establishment",
                results: "+200% followers",
                image: "assets/images/clients-restaurant-chain.jpg",
                modalData: {
                    title: "Restaurant Chain Success",
                    description: "Social media strategy for fine dining establishment",
                    stats: {
                        followers: "+200%",
                        engagement: "12.3%",
                        reach: "+350%"
                    },
                    images: [
                        "assets/images/case-study-hero.jpg",
                        "assets/images/case-study-before.jpg",
                        "assets/images/case-study-after.jpg"
                    ]
                }
            },
            {
                id: 3,
                icon: "fas fa-spa",
                title: "Beauty Salon",
                description: "Premium beauty services",
                results: "+300% bookings",
                image: "assets/images/clients-beauty-salon.jpg",
                modalData: {
                    title: "Beauty Salon Growth",
                    description: "Premium beauty services social media campaign",
                    stats: {
                        followers: "+300%",
                        engagement: "15.7%",
                        reach: "+500%"
                    },
                    images: [
                        "assets/images/case-study-hero.jpg",
                        "assets/images/case-study-before.jpg",
                        "assets/images/case-study-after.jpg"
                    ]
                }
            },
            {
                id: 4,
                icon: "fas fa-dumbbell",
                title: "Fitness Studio",
                description: "Personal training center",
                results: "+180% members",
                image: "assets/images/clients-fitness-studio.jpg",
                modalData: {
                    title: "Fitness Studio Expansion",
                    description: "Personal training center social media strategy",
                    stats: {
                        followers: "+180%",
                        engagement: "9.2%",
                        reach: "+280%"
                    },
                    images: [
                        "assets/images/case-study-hero.jpg",
                        "assets/images/case-study-before.jpg",
                        "assets/images/case-study-after.jpg"
                    ]
                }
            }
        ]
    },

    // Featured Case Section
    featuredCase: {
        title: "FEATURED CASE STUDY",
        projectTitle: "LUXURY FASHION BRAND TRANSFORMATION",
        description: "Complete social media overhaul for a premium fashion boutique, resulting in unprecedented growth and engagement.",
        results: [
            { number: "+250%", label: "Followers Growth" },
            { number: "+180%", label: "Sales Increase" },
            { number: "12.5%", label: "Engagement Rate" }
        ],
        button: { text: "View Full Case Study", href: "#" }
    },

    // Pricing Section
    pricing: {
        title: "PRICE LIST",
        packages: [
            {
                title: "Full Package",
                price: "$2,500",
                period: "/month",
                features: [
                    "Complete SMM strategy",
                    "Daily content creation",
                    "Community management",
                    "Analytics & reporting",
                    "Influencer partnerships"
                ],
                button: { text: "Get Started", href: "#contact" },
                featured: false
            },
            {
                title: "SMM Strategy",
                price: "$800",
                period: "/one-time",
                features: [
                    "Comprehensive strategy",
                    "Content calendar",
                    "Brand guidelines",
                    "Competitor analysis",
                    "Implementation plan"
                ],
                button: { text: "Choose Plan", href: "#contact" },
                featured: true
            },
            {
                title: "Content Shooting",
                price: "$500",
                period: "/session",
                features: [
                    "Professional photography",
                    "Video content",
                    "Editing & retouching",
                    "Content optimization",
                    "Usage rights"
                ],
                button: { text: "Book Session", href: "#contact" },
                featured: false
            },
            {
                title: "Russian Copywriting",
                price: "$200",
                period: "/post",
                features: [
                    "Engaging captions",
                    "Hashtag research",
                    "Call-to-action optimization",
                    "Brand voice consistency",
                    "SEO optimization"
                ],
                button: { text: "Order Content", href: "#contact" },
                featured: false
            },
            {
                title: "Consultation",
                price: "$150",
                period: "/hour",
                features: [
                    "Strategy review",
                    "Performance analysis",
                    "Optimization tips",
                    "Q&A session",
                    "Action plan"
                ],
                button: { text: "Book Consultation", href: "#contact" },
                featured: false
            }
        ]
    },

    // Workflow Section
    workflow: {
        title: "WORKFLOW STAGES",
        steps: [
            {
                number: "01",
                title: "Discovery & Research",
                description: "Understanding your brand, target audience, and competitive landscape"
            },
            {
                number: "02",
                title: "Strategy Development",
                description: "Creating a comprehensive social media strategy tailored to your goals"
            },
            {
                number: "03",
                title: "Content Creation",
                description: "Developing engaging, high-quality content that resonates with your audience"
            },
            {
                number: "04",
                title: "Implementation",
                description: "Executing the strategy with consistent posting and community engagement"
            },
            {
                number: "05",
                title: "Monitoring & Optimization",
                description: "Tracking performance and continuously optimizing for better results"
            },
            {
                number: "06",
                title: "Reporting & Analysis",
                description: "Providing detailed reports and insights for strategic decision-making"
            }
        ]
    },

    // FAQ Section
    faq: {
        title: "FREQUENTLY ASKED QUESTIONS",
        items: [
            {
                question: "How long does it take to see results?",
                answer: "Typically, you'll see initial engagement improvements within 2-4 weeks, with significant growth occurring over 3-6 months of consistent strategy implementation."
            },
            {
                question: "Which social media platforms do you work with?",
                answer: "I specialize in Instagram, Facebook, TikTok, LinkedIn, and YouTube. The platform mix is determined based on your target audience and business goals."
            },
            {
                question: "Do you provide content creation services?",
                answer: "Yes, I offer comprehensive content creation including photography, videography, graphic design, and copywriting services."
            },
            {
                question: "How do you measure success?",
                answer: "Success is measured through key metrics including follower growth, engagement rates, reach, website traffic, and ultimately, business conversions and sales."
            },
            {
                question: "What's included in your monthly packages?",
                answer: "Monthly packages include strategy development, content creation, community management, analytics reporting, and ongoing optimization based on performance data."
            }
        ]
    },

    // Certificates Section
    certificates: {
        title: "CERTIFICATES & QUALIFICATIONS",
        items: [
            {
                icon: "fab fa-google",
                title: "Google Digital Marketing",
                description: "Certified in Google Ads and Analytics"
            },
            {
                icon: "fab fa-facebook",
                title: "Meta Business Suite",
                description: "Facebook & Instagram Marketing Expert"
            },
            {
                icon: "fas fa-graduation-cap",
                title: "Digital Marketing Institute",
                description: "Professional Diploma in Digital Marketing"
            },
            {
                icon: "fab fa-linkedin",
                title: "LinkedIn Marketing",
                description: "LinkedIn Marketing Solutions Certified"
            }
        ]
    },

    // Contact Section
    contact: {
        title: "GET IN TOUCH",
        heading: "Ready to transform your social media presence?",
        description: "Let's discuss your project and create a strategy that drives real results for your business.",
        methods: [
            {
                icon: "fab fa-telegram",
                text: "Telegram",
                href: "https://t.me/yourusername"
            },
            {
                icon: "fas fa-envelope",
                text: "Email",
                href: "mailto:hello@smmspecialist.com"
            }
        ]
    },

    // Footer
    footer: {
        links: [
            { text: "Privacy Policy", href: "privacy.html" },
            { text: "Terms of Use", href: "terms.html" }
        ],
        credits: "Designed & built by Aleksandr Matkava — with love from the Caucasian Mineral Waters"
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = siteData;
}
