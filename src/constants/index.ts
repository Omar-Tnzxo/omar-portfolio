// Contains constant data for using in website
// ! Don't remove anything from here if not sure

import {
  mobile,
  backend,
  creator,
  web,
  git,
  mysql,
  meta,
  avenueAdvertisingAgency,
  avenueProperties,
  project1,
  project2,
  project3,
  project4,
  project5,
  project6,
  youtube,
  linkedin,
  twitter,
  github,
  facebook,
  instagram,
  telegram,
  python,
  flutter,
  dart,
  supabase,
  metaBusinessSuite,
  canva,
  n8n,
  buffer,
  easyOrders,
  notion,
} from "../assets";

// Navbar Links
export const NAV_LINKS = [
  {
    id: "about",
    title: "About",
    link: null,
  },
  {
    id: "work",
    title: "Work",
    link: null,
  },
  {
    id: "projects",
    title: "Projects",
    link: "/projects",
  },
  {
    id: "contact",
    title: "Contact",
    link: null,
  },
] as const;

// Services
export const SERVICES = [
  {
    title: "Content & Social Media Specialist",
    icon: web,
  },
  {
    title: "Strategic Marketing & Lead Generation",
    icon: mobile,
  },
  {
    title: "PropTech Development & Automation",
    icon: backend,
  },
  {
    title: "Brand Building & E-commerce",
    icon: creator,
  },
] as const;

// Technologies
export const TECHNOLOGIES = [
  {
    name: "Meta Business Suite",
    icon: metaBusinessSuite,
  },
  {
    name: "Canva",
    icon: canva,
  },
  {
    name: "n8n",
    icon: n8n,
  },
  {
    name: "Buffer",
    icon: buffer,
  },
  {
    name: "Easy Orders",
    icon: easyOrders,
  },
  {
    name: "Notion",
    icon: notion,
  },
  {
    name: "Python",
    icon: python,
  },
  {
    name: "Flutter",
    icon: flutter,
  },
  {
    name: "Dart",
    icon: dart,
  },
  {
    name: "Supabase",
    icon: supabase,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "mysql",
    icon: mysql,
  },
] as const;

// Experiences
export const EXPERIENCES = [
  {
    title: "Content & Social Media Specialist",
    company_name: "Avenue Advertising Agency",
    icon: avenueAdvertisingAgency,
    iconBg: "#383E56",
    date: "April 2025 - Present",
    points: [
      "Managing a portfolio of 5 diverse client accounts, primarily in real estate consultancy and B2B finance firms.",
      "Developing and executing end-to-end content strategies and monthly plans tailored to each client's unique brand identity.",
      "Authoring all written content, including core concepts, captions, and on-design text while providing creative direction.",
      "Continuously monitoring content performance metrics and making data-driven adjustments to strategies.",
    ],
  },
  {
    title: "Resale Specialist",
    company_name: "The Avenue Properties",
    icon: avenueProperties,
    iconBg: "#E6DEDD",
    date: "January 2025 - April 2025",
    points: [
      "Specialized in the secondary real estate market, managing the full deal cycle for resale properties.",
      "Conducted unit valuations, market analysis, and advised clients on resale investment opportunities.",
      "Managed all negotiations between buyers and sellers and drafted resale contracts.",
    ],
  },
  {
    title: "Real Estate Consultant & Marketer",
    company_name: "The Avenue Properties",
    icon: avenueProperties,
    iconBg: "#383E56",
    date: "March 2024 - December 2024",
    points: [
      "Combined real estate consultancy with digital marketing to provide comprehensive service.",
      "Developed and executed organic marketing strategies on Facebook and Telegram, generating 5-30 qualified leads daily.",
      "Managed the full client relationship lifecycle, from initial contact to continuous follow-up.",
    ],
  },
  {
    title: "Brand & Digital Marketing Manager",
    company_name: "Freelance",
    icon: meta,
    iconBg: "#E6DEDD",
    date: "January 2023 - March 2024",
    points: [
      "Founded and managed a women's fashion e-commerce brand from concept to launch.",
      "Developed complete brand identity including logo, visual system, and tone of voice.",
      "Built and managed the e-commerce store and handled all content design using Canva.",
      "Executed paid advertising campaigns on Meta platforms as a media buyer.",
    ],
  },
] as const;

// Testimonials
export const TESTIMONIALS = [
  {
    testimonial:
      "Omar's strategic approach transformed our lead generation completely. His technical skills and marketing expertise delivered measurable results.",
    name: "Engy ****",
    designation: "Marketing Director",
    company: "Avenue Advertising Agency",
  },
  {
    testimonial:
      "Working with Omar was exceptional - he understands both business goals and technical implementation. His solutions exceeded our expectations.",
    name: "Basil ****",
    designation: "CEO",
    company: "The Avenue Properties",
  },
  {
    testimonial:
      "Omar's unique combination of creativity and technical expertise is outstanding. He built our brand from scratch and delivered exceptional results.",
    name: "Karim ****",
    designation: "Business Development Manager",
    company: "Real Estate Solutions",
  },
] as const;

// Projects
export const PROJECTS = [
  {
    id: 1,
    title: "CalcRealty - PropTech Mobile App",
    des: "A PropTech financial calculator for the real estate market, designed to solve a key challenge in the sales process. Built with Flutter & Dart, featuring Supabase backend for authentication and data management. Successfully acquired over 1,500 organic users within 24 hours of launch through targeted community marketing.",
    img: project1,
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/fm.svg"],
    link: "View",
    actualLink: "https://play.google.com/store/apps/details?id=com.calcrealty",
  },
  {
    id: 2,
    title: "Organic Lead Generation System",
    des: "A content-driven system designed to generate a consistent flow of qualified leads for a real estate consultancy without ad spend. Shifted from direct-selling approach to value-first content strategy, distributing high-value content on targeted platforms (Facebook Groups, Telegram). Generated consistent flow of 5-30 new qualified leads daily.",
    img: project2,
    iconLists: ["/next.svg", "/tail.svg", "/ts.svg", "/stream.svg", "/c.svg"],
    link: "View",
    actualLink: "#",
  },
  {
    id: 3,
    title: "Fashion E-commerce Brand",
    des: "A comprehensive project where I built a complete women's fashion brand from the ground up. This involved creating the brand identity, setting up and managing the e-commerce storefront, designing all content, and running targeted paid advertising campaigns on Meta platforms.",
    img: project3,
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg", "/three.svg", "/c.svg"],
    link: "View",
    actualLink: "#",
  },
] as const;

export const SOCIALS = [
  {
    name: "Linkedin",
    icon: linkedin,
    link: "https://www.linkedin.com/in/omar-tnzxo",
  },
  {
    name: "GitHub",
    icon: github,
    link: "https://github.com/omar-tnzxo",
  },
  {
    name: "Twitter",
    icon: twitter,
    link: "https://twitter.com/omar.tnzxo",
  },
  {
    name: "Facebook",
    icon: facebook,
    link: "https://facebook.com/omar.tnzxo",
  },
  {
    name: "Instagram",
    icon: instagram,
    link: "https://instagram.com/omar.tnzxo",
  },
  {
    name: "Telegram",
    icon: telegram,
    link: "https://t.me/omar.tnzxo",
  },
] as const;
