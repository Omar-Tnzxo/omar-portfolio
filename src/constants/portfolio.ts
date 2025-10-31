import { PortfolioCategory, PortfolioProject, ProjectSubCategory } from "../types/portfolio";

// Portfolio Categories (Level 1 - Folders)
export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  {
    id: "web-development",
    name: "Web Development",
    slug: "web-development",
    color: "#915EFF",
    description: "Full-stack web applications and responsive websites",
  },
  {
    id: "mobile-apps",
    name: "Mobile Apps",
    slug: "mobile-apps",
    color: "#00D4FF",
    description: "Native and cross-platform mobile applications",
  },
  {
    id: "social-media",
    name: "Social Media Management",
    slug: "social-media",
    color: "#FF6B9D",
    description: "Content strategy, campaigns, and community management",
  },
  {
    id: "telegram-bots",
    name: "Telegram Bots",
    slug: "telegram-bots",
    color: "#0088CC",
    description: "Automated bots and integrations for Telegram",
  },
  {
    id: "automation",
    name: "Automation",
    slug: "automation",
    color: "#FFA500",
    description: "Workflow automation and process optimization",
  },
  {
    id: "ai-solutions",
    name: "AI Solutions",
    slug: "ai-solutions",
    color: "#00FF88",
    description: "AI-powered tools and intelligent systems",
  },
  {
    id: "script-writing",
    name: "Script Writing",
    slug: "script-writing",
    color: "#FFD700",
    description: "Video scripts, content narratives, and storytelling",
  },
  {
    id: "ai-design",
    name: "AI Design",
    slug: "ai-design",
    color: "#FF1493",
    description: "AI-assisted design and creative automation",
  },
];

// Sub-categories for filtering within categories
export const PROJECT_SUB_CATEGORIES: Record<string, ProjectSubCategory[]> = {
  "mobile-apps": [
    { id: "all", name: "All", slug: "all" },
    { id: "real-estate", name: "Real Estate", slug: "real-estate" },
    { id: "food-beverage", name: "Food & Beverage", slug: "food-beverage" },
    { id: "utilities", name: "Utilities", slug: "utilities" },
    { id: "personal", name: "Personal Projects", slug: "personal" },
  ],
  "web-development": [
    { id: "all", name: "All", slug: "all" },
    { id: "ecommerce", name: "E-commerce", slug: "ecommerce" },
    { id: "portfolio", name: "Portfolio", slug: "portfolio" },
    { id: "landing", name: "Landing Pages", slug: "landing" },
    { id: "dashboard", name: "Dashboards", slug: "dashboard" },
  ],
  "social-media": [
    { id: "all", name: "All", slug: "all" },
    { id: "real-estate", name: "Real Estate", slug: "real-estate" },
    { id: "fashion", name: "Fashion", slug: "fashion" },
    { id: "food", name: "Food & Beverage", slug: "food" },
    { id: "finance", name: "Finance", slug: "finance" },
  ],
};

// Portfolio Projects (All Projects Data)
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  // ===== MOBILE APPS =====
  {
    id: "calcrealty-app",
    slug: "calcrealty",
    title: "CalcRealty - Real Estate Calculator",
    client: "Personal Project / Real Estate Market",
    myRole: "Full-Stack Mobile Developer & Product Designer",
    category: "mobile-apps",
    subCategory: "real-estate",
    shortDescription: "A PropTech financial calculator solving complex payment plans for real estate professionals.",
    fullDescription: "CalcRealty is a comprehensive mobile application designed specifically for the Egyptian real estate market. It addresses the critical challenge of calculating complex payment plans, installments, and unit pricing that real estate agents and customers face daily.",
    challenge: "Real estate agents in Egypt spend significant time manually calculating payment plans, down payments, installment schedules, and unit prices across different projects. This manual process is error-prone, time-consuming, and creates friction in the sales process.",
    solution: "Developed a Flutter-based mobile app with an intuitive interface that automates all real estate financial calculations. Features include: instant payment plan generation, multiple currency support, comparison tools, and offline functionality. The app acquired 1,500+ organic users within 24 hours through community marketing.",
    image: "/portfolio/mobile/calcrealty-cover.webp",
    video: "/portfolio/mobile/calcrealty-demo.mp4",
    skills: ["Flutter", "Dart", "Supabase", "UI/UX Design", "Firebase", "Mobile Development"],
    techStack: {
      frontend: ["Flutter", "Dart", "Material Design"],
      backend: ["Supabase", "PostgreSQL"],
      tools: ["Android Studio", "Figma", "Git"],
    },
    projectDate: "March 2024",
    projectLink: "https://play.google.com/store/apps/details?id=com.calcrealty",
    githubLink: "https://github.com/omar-tnzxo/CalcRealty",
    liveLink: "https://play.google.com/store/apps/details?id=com.calcrealty",
    gallery: [
      "/portfolio/mobile/calcrealty-1.webp",
      "/portfolio/mobile/calcrealty-2.webp",
      "/portfolio/mobile/calcrealty-3.webp",
      "/portfolio/mobile/calcrealty-4.webp",
    ],
    results: [
      "1,500+ organic downloads in first 24 hours",
      "4.8★ average rating on Google Play",
      "Used by 50+ real estate agencies",
      "Reduced calculation time from 10 minutes to 30 seconds",
    ],
  },
  
  // ===== WEB DEVELOPMENT =====
  {
    id: "portfolio-website",
    slug: "portfolio-website",
    title: "Digital Marketing Portfolio",
    client: "Personal Brand",
    myRole: "Full-Stack Developer & UX Designer",
    category: "web-development",
    subCategory: "portfolio",
    shortDescription: "A modern, animated portfolio showcasing digital marketing and development expertise.",
    fullDescription: "A comprehensive portfolio website built with cutting-edge web technologies to showcase my expertise in digital marketing, web development, and creative solutions. Features advanced animations, responsive design, and an intuitive user experience.",
    challenge: "Create a portfolio that stands out in a crowded market while effectively communicating technical skills, marketing expertise, and creative capabilities. The site needed to be fast, accessible, and visually impressive.",
    solution: "Built with React, TypeScript, and Tailwind CSS, leveraging Framer Motion for smooth animations. Implemented code splitting, lazy loading, and optimized assets for maximum performance. Designed with a mobile-first approach ensuring perfect display across all devices.",
    image: "/portfolio/web/portfolio-cover.webp",
    skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite", "SEO"],
    techStack: {
      frontend: ["React 18", "TypeScript", "Tailwind CSS", "Framer Motion"],
      backend: ["EmailJS", "Netlify Functions"],
      tools: ["Vite", "Git", "Figma", "Lighthouse"],
    },
    projectDate: "October 2025",
    githubLink: "https://github.com/omar-tnzxo/omar-portfolio",
    liveLink: "https://omarhassan.site",
    gallery: [
      "/portfolio/web/portfolio-1.webp",
      "/portfolio/web/portfolio-2.webp",
      "/portfolio/web/portfolio-3.webp",
    ],
    results: [
      "100/100 Lighthouse SEO score",
      "95+ Lighthouse Performance score",
      "50% increase in client inquiries",
    ],
  },
  {
    id: "fashion-ecommerce",
    slug: "fashion-ecommerce",
    title: "Luxe Fashion - E-commerce Store",
    client: "Luxe Fashion Brand",
    myRole: "Brand Manager & Full-Stack Developer",
    category: "web-development",
    subCategory: "ecommerce",
    shortDescription: "Complete women's fashion e-commerce brand from concept to launch.",
    fullDescription: "A comprehensive e-commerce project where I founded and managed a women's fashion brand. This included creating the brand identity from scratch, building the online store, designing all product photography and content, and executing paid advertising campaigns.",
    challenge: "Launch a new fashion brand in a highly competitive market with limited budget. Needed to establish brand credibility, build an engaging online presence, and drive sales through digital channels.",
    solution: "Developed a complete brand strategy starting with market research, created a cohesive visual identity using Canva, built the e-commerce store on a scalable platform, and executed targeted Meta advertising campaigns. Implemented conversion optimization strategies and email marketing automation.",
    image: "/portfolio/web/fashion-cover.webp",
    skills: ["E-commerce", "Brand Development", "Canva", "Meta Ads", "Content Design", "Marketing"],
    techStack: {
      frontend: ["E-commerce Platform", "Custom CSS"],
      tools: ["Canva", "Meta Business Suite", "Mailchimp"],
    },
    projectDate: "January 2023 - March 2024",
    liveLink: "#",
    gallery: [
      "/portfolio/web/fashion-1.webp",
      "/portfolio/web/fashion-2.webp",
      "/portfolio/web/fashion-3.webp",
    ],
    results: [
      "Built brand from zero to 5,000+ followers",
      "Achieved 3.2x ROAS on Meta campaigns",
      "Generated EGP 150,000+ in first 6 months",
    ],
  },

  // ===== SOCIAL MEDIA MANAGEMENT =====
  {
    id: "real-estate-lead-engine",
    slug: "real-estate-lead-engine",
    title: "Real Estate Lead Generation System",
    client: "The Avenue Properties",
    myRole: "Content Strategist & Lead Generation Specialist",
    category: "social-media",
    subCategory: "real-estate",
    shortDescription: "Organic content strategy generating 5-30 qualified leads daily without paid ads.",
    fullDescription: "A comprehensive content-driven lead generation system designed for a real estate consultancy that was heavily dependent on paid advertising. Transformed their approach from ad-dependent to organic authority-building through strategic content marketing.",
    challenge: "The client was spending heavily on paid ads with inconsistent results and rising costs. They needed a sustainable, cost-effective lead generation system that would establish them as market authorities and attract qualified leads organically.",
    solution: "Developed a value-first content strategy focusing on educational content about real estate investment, market insights, and buying guides. Created a content calendar distributing high-value posts across Facebook Groups and Telegram channels. Implemented community engagement tactics and lead nurturing sequences.",
    image: "/portfolio/social/real-estate-cover.webp",
    skills: ["Content Strategy", "Facebook Marketing", "Telegram Marketing", "Lead Generation", "Copywriting"],
    projectDate: "March 2024 - December 2024",
    gallery: [
      "/portfolio/social/real-estate-1.webp",
      "/portfolio/social/real-estate-2.webp",
      "/portfolio/social/real-estate-3.webp",
    ],
    results: [
      "Generated 5-30 qualified leads daily",
      "80% reduction in paid advertising spend",
      "Increased brand authority and recognition",
      "Built engaged community of 10,000+ members",
    ],
    caseSpecificContent: {
      type: 'social-media',
      content: [
        "Sample Post 1: Real Estate Investment Guide - Engagement: 2,500+ reactions",
        "Sample Post 2: Market Analysis Report - Reach: 50,000+ people",
        "Sample Post 3: First-Time Buyer Tips - Leads Generated: 45",
      ],
    },
  },
  {
    id: "finance-social-media",
    slug: "finance-social-media",
    title: "B2B Finance Content Management",
    client: "Avenue Advertising Agency (Multiple Clients)",
    myRole: "Content & Social Media Specialist",
    category: "social-media",
    subCategory: "finance",
    shortDescription: "Managing social media for B2B finance firms with focus on thought leadership.",
    fullDescription: "As part of my role at Avenue Advertising Agency, I manage content strategy and execution for multiple B2B finance clients. This includes developing monthly content plans, writing all copy, providing creative direction to designers, and monitoring performance metrics.",
    challenge: "B2B finance content needs to balance professionalism with engagement, educate without overwhelming, and build trust while maintaining compliance. Each client has unique positioning and target audiences.",
    solution: "Developed tailored content strategies for each client focusing on thought leadership, industry insights, and educational content. Created a content framework that maintains brand voice while maximizing engagement. Implemented A/B testing and data-driven optimization.",
    image: "/portfolio/social/finance-cover.webp",
    skills: ["B2B Marketing", "Content Writing", "LinkedIn Strategy", "Meta Business Suite", "Analytics"],
    projectDate: "April 2025 - Present",
    gallery: [
      "/portfolio/social/finance-1.webp",
      "/portfolio/social/finance-2.webp",
    ],
    results: [
      "Managed 5+ diverse client accounts",
      "Increased average engagement by 150%",
      "Generated qualified B2B leads consistently",
    ],
  },

  // ===== TELEGRAM BOTS =====
  {
    id: "property-inquiry-bot",
    slug: "property-inquiry-bot",
    title: "Real Estate Inquiry Automation Bot",
    client: "The Avenue Properties",
    myRole: "Bot Developer & Automation Specialist",
    category: "telegram-bots",
    shortDescription: "Automated bot handling property inquiries and lead qualification on Telegram.",
    fullDescription: "A custom Telegram bot built to automate the initial stages of property inquiry handling. The bot qualifies leads, collects requirements, schedules viewings, and integrates with the CRM system.",
    challenge: "The sales team was overwhelmed with repetitive inquiries on Telegram, spending hours answering basic questions and collecting lead information. This prevented them from focusing on high-value activities.",
    solution: "Developed a PHP-based Telegram bot that handles initial inquiries, asks qualifying questions, collects lead data, and routes serious prospects to the appropriate sales agent. Integrated with 8X CRM for seamless lead management.",
    image: "/portfolio/bots/property-bot-cover.webp",
    skills: ["PHP", "Telegram Bot API", "CRM Integration", "Automation", "MySQL"],
    techStack: {
      backend: ["PHP", "Telegram Bot API", "MySQL"],
      tools: ["Git", "CRM API Integration"],
    },
    projectDate: "June 2024",
    gallery: [
      "/portfolio/bots/property-bot-1.webp",
      "/portfolio/bots/property-bot-2.webp",
    ],
    results: [
      "Handled 500+ inquiries per month",
      "Reduced response time from hours to seconds",
      "Freed up 15 hours per week for sales team",
      "Improved lead qualification accuracy by 60%",
    ],
  },

  // ===== AUTOMATION =====
  {
    id: "content-scheduling-automation",
    slug: "content-scheduling-automation",
    title: "Multi-Platform Content Automation",
    client: "Avenue Advertising Agency",
    myRole: "Automation Engineer",
    category: "automation",
    shortDescription: "n8n workflow automating content scheduling across multiple platforms.",
    fullDescription: "A comprehensive automation system built with n8n that streamlines content creation, approval, and scheduling across Facebook, Instagram, LinkedIn, and Twitter for multiple clients simultaneously.",
    challenge: "Managing content for 5+ clients across multiple platforms was time-consuming and error-prone. Manual scheduling increased the risk of missed posts and inconsistent publishing.",
    solution: "Built automated workflows using n8n that integrate with Google Sheets for content planning, Slack for approvals, and Meta Business Suite/Buffer for publishing. Includes automatic asset optimization and posting time optimization.",
    image: "/portfolio/automation/content-automation-cover.webp",
    skills: ["n8n", "API Integration", "Workflow Automation", "Buffer", "Meta Business Suite"],
    techStack: {
      tools: ["n8n", "Google Sheets API", "Meta API", "Buffer API", "Slack API"],
    },
    projectDate: "May 2025",
    gallery: [
      "/portfolio/automation/content-1.webp",
      "/portfolio/automation/content-2.webp",
    ],
    results: [
      "Reduced scheduling time by 80%",
      "Eliminated missed posts",
      "Managed 100+ posts per week automatically",
    ],
  },

  // ===== SCRIPT WRITING =====
  {
    id: "property-video-scripts",
    slug: "property-video-scripts",
    title: "Real Estate Video Marketing Scripts",
    client: "The Avenue Properties",
    myRole: "Script Writer & Content Strategist",
    category: "script-writing",
    shortDescription: "Engaging video scripts for property tours and real estate marketing campaigns.",
    fullDescription: "A collection of professional video scripts written for real estate marketing videos, property tours, and promotional campaigns. Scripts are designed to engage viewers, highlight key features, and drive inquiries.",
    challenge: "Real estate video content often feels generic and fails to capture viewer attention. Needed scripts that are engaging, informative, and drive action while maintaining professionalism.",
    solution: "Developed a script framework that starts with hook-driven openings, uses storytelling techniques to highlight property benefits, and ends with clear calls-to-action. Each script is tailored to the property type and target audience.",
    image: "/portfolio/scripts/property-scripts-cover.webp",
    skills: ["Script Writing", "Storytelling", "Video Marketing", "Copywriting"],
    projectDate: "July 2024",
    gallery: [
      "/portfolio/scripts/script-1.webp",
    ],
    results: [
      "Written 30+ video scripts",
      "Average view completion rate: 75%",
      "Videos generated 200+ qualified inquiries",
    ],
    caseSpecificContent: {
      type: 'script',
      content: `[OPENING SHOT: Aerial view of compound]

NARRATOR:
"Imagine waking up every morning to this view..."

[CUT TO: Interior living room with large windows]

"Where luxury meets comfort, and every detail is designed for the life you deserve."

[SHOW: Kitchen, bedrooms, amenities]

"This isn't just a home. It's your sanctuary in the heart of Sheikh Zayed."

[CALL TO ACTION]

"Contact us today to schedule your private tour."`,
    },
  },
];

// Helper function to get projects by category
export const getProjectsByCategory = (categorySlug: string): PortfolioProject[] => {
  return PORTFOLIO_PROJECTS.filter(project => project.category === categorySlug);
};

// Helper function to get projects by category and sub-category
export const getProjectsByCategoryAndSub = (categorySlug: string, subCategorySlug: string): PortfolioProject[] => {
  if (subCategorySlug === 'all') {
    return getProjectsByCategory(categorySlug);
  }
  return PORTFOLIO_PROJECTS.filter(
    project => project.category === categorySlug && project.subCategory === subCategorySlug
  );
};

// Helper function to get a single project
export const getProjectBySlug = (categorySlug: string, projectSlug: string): PortfolioProject | undefined => {
  return PORTFOLIO_PROJECTS.find(
    project => project.category === categorySlug && project.slug === projectSlug
  );
};

// Helper function to get featured projects for homepage (3 projects)
export const getFeaturedProjects = (): PortfolioProject[] => {
  return [
    PORTFOLIO_PROJECTS.find(p => p.id === "calcrealty-app")!,
    PORTFOLIO_PROJECTS.find(p => p.id === "real-estate-lead-engine")!,
    PORTFOLIO_PROJECTS.find(p => p.id === "portfolio-website")!,
  ].filter(Boolean);
};
