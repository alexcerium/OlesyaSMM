// Website Data Configuration
const siteData = {
    // Site Information
    site: {
        title: "Professional SMM Specialist",
        logo: "SMM PRO",
        description: ""
    },

    // Navigation
    navigation: [
        { id: "home", label: "ГЛАВНАЯ", href: "#home" },
        { id: "about", label: "ОБО МНЕ", href: "#about" },
        { id: "clients", label: "КЛИЕНТЫ", href: "#clients" },
        { id: "case", label: "КЕЙС", href: "#case" },
        { id: "pricing", label: "ЦЕНЫ", href: "#pricing" },
        { id: "workflow", label: "ЭТАПЫ", href: "#workflow" },
        { id: "faq", label: "ВОПРОСЫ", href: "#faq" },
        { id: "certificates", label: "СЕРТИФИКАТЫ", href: "#certificates" },
        { id: "contact", label: "КОНТАКТЫ", href: "#contact" }
    ],

    // Hero Section
    hero: {
        title: "PROFESSIONAL SMM SPECIALIST",
        subtitle: "Приведу вам клиентов через стратегический SMM",
        buttons: [
            { text: "Скачать портфолио", href: "assets/Portfolio.pdf", type: "primary", download: "Portfolio.pdf" },
            { text: "Связаться со мной", href: "#contact", type: "secondary" }
        ]
    },

    // About Section
    about: {
        title: "ABOUT ME",
        content: [
            "Меня зовут Олеся Голоскова. Я создаю стратегии и контент для брендов, которые хотят быть ближе к своей аудитории. Для меня SMM — это не только про лайки и подписчиков, а про эмоции, доверие и результат. Я умею превращать сухие факты в живые истории, которые вовлекают и продают.",
            "Моя цель - сделать так, чтобы ваш бренд звучал в социальных сетях искренне и интересно, выделялся среди конкурентов и находил «своих» людей."
        ],
        software: {
            title: "Использую в работе",
            items: [
                "FaceApp",
                "Snapseed",
                "CapCut",
                "ChatGPT",
                "Canva",
                "Pinterest",
                "Behance",
                "Graphionica",
                "BeautyPlus",
                "Avatan",
                "Facetune",
                "Lightroom",
                "MalibooMake",
                "Picsart"
            ]
        },
        collaborators: {
            title: "В ходе работы взаимодействовала",
            items: [
                { 
                    brand: "inwhite collection", 
                    link: "https://www.instagram.com/inwhite_collection_?igsh=MTg1NmJlMGVsd250MQ==" 
                },
                { 
                    brand: "amalicouture", 
                    link: "https://www.instagram.com/amalicouture?igsh=c2JncGJkbG5qangy" 
                },
                { 
                    brand: "secret beauty cosmetics", 
                    link: "https://www.instagram.com/secret_beauty_cosmetics_?igsh=MTZyNWRyaWV3YWthdA==" 
                },
                { 
                    brand: "salutbon", 
                    link: "https://www.instagram.com/salutbcn?igsh=MXBycWR6amlsNnVreg==" 
                },
                { 
                    brand: "salonprop", 
                    link: "https://www.instagram.com/salonprop?igsh=MWduazk4dHU3Nmlraw==" 
                }
            ]
        }
    },

    // Clients Section
    clients: {
        title: "CLIENTS & PROJECTS",
        items: [
            {
                id: 1,
                preview: "inwhite-preview.jpeg",
                title: "inwhite_collection",
                description: "Вечерние платья | Свадебные платья | ПРОКАТ ПРОДАЖА",
                modal: {
                  image: "inwhite.png",
                  title: "inwhite_collection",
                  text: "• Разработала SMM-стратегию\n• Составила контент-план\n• Создала визуал в едином tone of voice\n• Подобрала блогеров для коллабораций\n• Увеличила охваты и получила измеримый результат"
                }
              },
              {
                id: 2,
                preview: "amalicouture-preview.jpeg",
                title: "amalicouture",
                description: "Работала сторисмейкером для бренда Amali Couture",
                modal: {
                  image: "amalicouture.png",
                  title: "Amali Couture",
                  text: "• Работала сторисмейкером для бренда Amali Couture\n• Разработала креативные сторис-решения с акцентом на вовлечение аудитории\n• Использовала отметки и интерактивы для увеличения охватов\n• В результате удалось значительно повысить просмотры и активность подписчиков"
                }
              },
              {
                id: 3,
                preview: "secret_beauty_cosmetics_-preview.jpeg",
                title: "secret_beauty_cosmetics_",
                description: "Работала с брендом secret_beauty_cosmetics_",
                modal: {
                  image: "secret_beauty_cosmetics_.png",
                  title: "secret_beauty_cosmetics_",
                  text: "• Работала с брендом secret_beauty_cosmetics_\n• Создала хайлайты, шапку профиля и аватар бренда\n• Провела консультацию по подбору блогеров для сотрудничества\n• Проанализировала и подготовила статистику аккаунта\n• Обеспечила рост подписчиков и увеличение вовлечённости"
                }
              }
        ]
    },

    // Featured Case Section
    featuredCase: {
        title: "Избранный кейс",
        projectTitle: "inwhite collection",
        description: "Полтора года я развивала бренд: выстроила SMM-стратегию, разработала контент-план, задала Tone of Voice, выстроила сотрудничество с блогерами и создала единый визуальный стиль.Результат - узнаваемый бренд с системным продвижением и сильной коммуникацией с аудиторией.",
        image: "inwhite-featured.png",
        results: [
            { number: "+15%", label: "Рост подписчиков" },
            { number: "+85%", label: "Рост вовлечённости (лайки, комментарии, сторис)" },
            { number: "45%", label: "Рост продаж" }
        ],
        button: { text: "Посмотреть кейс полностью", href: "#clients" }
    },

    // Pricing Section
    pricing: {
        title: "PRICE LIST",
        subtitle: "Точную стоимость я смогу назвать после бесплатного брифа — он ни к чему не обязывает, но помогает подобрать лучшее решение под ваш запрос.",
        packages: [
            {
                title: "Полное ведение Instagram",
                price: "от 20 000 ₽",
                period: "/месяц",
                features: [
                    "SMM-стратегия + контент-план",
                    "6 постов + 3 Reels ежемесячно",
                    "Ежедневные Stories",
                    "Анализ ЦА и конкурентов",
                    "Работа с блогерами и СМИ"
                ],
                button: { text: "Оставить запрос", href: "#contact" },
                featured: false
            },
            {
                title: "Полное ведение Telegram",
                price: "от 20 000 ₽",
                period: "/месяц",
                features: [
                    "Оформление канала и визуал",
                    "Контент-план + 5-7 постов в неделю",
                    "Подготовка текстов и ваших фото, видео",
                    "Кружки, подогревающие интерес",
                    "Модерация и ответы",
                    "Аналитика и рост"
                ],
                button: { text: "Оставить запрос", href: "#contact" },
                featured: false
            },
            {
                title: "Стратегия + контент-план",
                price: "от 10 000 ₽",
                period: "/разово",
                features: [
                    "Аудит и анализ ниши",
                    "Tone of Voice и визуальный стиль",
                    "Контент-рубрикатор",
                    "План публикаций",
                    "Рекомендации по внедрению"
                ],
                button: { text: "Заказать", href: "#contact" },
                featured: false
            },
            {
                title: "Консультация",
                price: "5 000 ₽",
                period: "/разово",
                features: [
                    "Разбор профиля",
                    "Рекомендации по визуалу и контенту",
                    "План действий на 1–2 месяца",
                    "Ответы на вопросы"
                ],
                button: { text: "Записаться", href: "#contact" },
                featured: false
            }
        ]
    },

    // Workflow Section
    workflow: {
        title: "ЭТАПЫ РАБОТЫ",
        steps: [
            {
                number: "01",
                title: "Бриф",
                time: "1-3 рабочих дня",
                description: "Погружаюсь в ваш бренд, изучаю сильные стороны, целевую аудиторию и конкурентов, чтобы говорить с клиентом «на одном языке»"
            },
            {
                number: "02",
                title: "Старт сотрудничества",
                time: "Срок индивидуален",
                description: "Обсуждаем цели, согласовываем план действий — вы вносите 50 % предоплаты, я приступаю к работе"
            },
            {
                number: "03",
                title: "SMM-стратегия",
                time: "5–7 рабочих дней",
                description: "Создаю индивидуальную стратегию продвижения: визуальная концепция, tone of voice, рубрики и ключевые метрики"
            },
            {
                number: "04",
                title: "Контент-план",
                time: "5–7 рабочих дней",
                description: "Формирую контент-календарь: темы, форматы, сценарии, тексты, сторис-механики — всё, что позволит продавать нативно и красиво"
            },
            {
                number: "05",
                title: "Производство и постинг",
                time: "7–14 рабочих дней",
                description: "Организую съёмку, создаю фото/видео-контент, пишу тексты и публикую посты. От вас — минимальное вовлечение. От меня — максимальный результат"
            },
            {
                number: "06",
                title: "Работа с блогерами",
                time: "Срок зависит от кампании",
                description: "Подбираю близких по духу инфлюенсеров, договариваюсь об интеграциях и привлекаю к бренду новую, «тёплую» аудиторию"
            }
        ]
    },

    // FAQ Section
    faq: {
        title: "ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ",
        items: [
            {
                question: "С какими соцсетями вы работаете?",
                answer: "Работаю с Instagram и Telegram - ведение, оформление и продвижение аккаунтов."
            },
            {
                question: "Сколько времени нужно, чтобы увидеть результат?",
                answer: "Первые изменения в охвате и вовлечённости обычно появляются через 2–3 месяца регулярной работы."
            },
            {
                question: "Вы создаёте контент?",
                answer: "Да, беру на себя полный цикл: фото, видео, дизайн и копирайтинг."
            },
            {
                question: "Сколько постов в неделю нужно публиковать?",
                answer: "Для стабильного роста достаточно 3–5 публикаций в неделю. Главное — регулярность и качество контента."
            },
            {
                question: "Стоит ли работать с блогерами и сколько это стоит?",
                answer: "Да, если цель — быстро увеличить охват, доверие к бренду и продажи через рекомендации. Стоимость зависит от ниши и охватов инфлюенсера."
            }
        ]
    },

    // Certificates Section
    certificates: {
        title: "CЕРТИФИКАТЫ И ОБРАЗОВАНИЕ",
        items: [
            {
                image: "smm-school-certificate.jpeg",
                title: "International SMM Diploma",
                description: "Авторский курс в Барселоне с практикой и специализацией на продвижении брендов на российском рынке"
            }
        ]
    },

    // Contact Section
    contact: {
        title: "СВЯЗАТЬСЯ СО МНОЙ",
        heading: "Готовы преобразить ваши социальные сети?",
        description: "Обсудим ваш проект и создадим стратегию, которая принесёт бизнес-результаты.",
        methods: [
            {
                icon: "fab fa-telegram",
                text: "Telegram",
                href: "https://t.me/O_GLS"
            },
            {
                icon: "fab fa-whatsapp",
                text: "WhatsApp",
                href: "https://wa.me/79288200263"
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