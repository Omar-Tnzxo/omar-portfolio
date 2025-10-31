import { SoftwareItem, SoftwareCategory } from "../types/software";

// Software Categories
export const SOFTWARE_CATEGORIES: SoftwareCategory[] = [
  {
    id: "tools",
    name: "Tools",
    slug: "tools",
    color: "#915EFF",
    description: "Utilities, scripts, extensions, and smaller solutions",
  },
  {
    id: "programs",
    name: "Programs",
    slug: "programs",
    color: "#00D4FF",
    description: "Desktop apps, complex back-end systems, and larger-scale software",
  },
  {
    id: "apps",
    name: "Apps",
    slug: "apps",
    color: "#FF6B9D",
    description: "Web applications and mobile applications",
  },
];

// Software Items Data
export const SOFTWARE_ITEMS: SoftwareItem[] = [
  // Tools
  {
    id: "chrome-ext-1",
    image: "/software/tool-1.svg",
    title: "LinkedIn Automation Chrome Extension",
    description: "Automate LinkedIn outreach and connection requests with smart filters.",
    type: "Browser Extension",
    priceModel: "Free",
    category: "tools",
    link: "#",
  },
  {
    id: "python-script-1",
    image: "/software/tool-2.svg",
    title: "Data Scraper Pro",
    description: "Python script for extracting structured data from websites efficiently.",
    type: "Python Script",
    priceModel: "Free",
    category: "tools",
  },
  {
    id: "vscode-ext-1",
    image: "/software/tool-3.svg",
    title: "Code Snippet Manager",
    description: "VS Code extension to organize and quickly access your code snippets.",
    type: "VS Code Extension",
    priceModel: "Both",
    category: "tools",
  },
  {
    id: "cli-tool-1",
    image: "/software/tool-4.svg",
    title: "DevOps CLI Helper",
    description: "Command-line tool to streamline common DevOps tasks and workflows.",
    type: "CLI Tool",
    priceModel: "Free",
    category: "tools",
  },

  // Programs
  {
    id: "program-1",
    image: "/software/program-1.svg",
    title: "Marketing Automation Suite",
    description: "Full-featured desktop application for automating marketing workflows.",
    type: "Desktop Application",
    priceModel: "Paid",
    category: "programs",
  },
  {
    id: "program-2",
    image: "/software/program-2.svg",
    title: "Real Estate CRM System",
    description: "Comprehensive CRM solution tailored for real estate professionals.",
    type: "Backend System",
    priceModel: "Both",
    category: "programs",
  },
  {
    id: "program-3",
    image: "/software/program-3.svg",
    title: "Content Management Platform",
    description: "Enterprise-grade CMS with advanced workflow management capabilities.",
    type: "Backend System",
    priceModel: "Paid",
    category: "programs",
  },

  // Apps
  {
    id: "app-1",
    image: "/software/app-1.svg",
    title: "CalcRealty",
    description: "PropTech financial calculator for real estate market analysis.",
    type: "Flutter Mobile App",
    priceModel: "Free",
    category: "apps",
    link: "https://play.google.com/store/apps/details?id=com.calcrealty",
  },
  {
    id: "app-2",
    image: "/software/app-2.svg",
    title: "Social Media Dashboard",
    description: "Unified dashboard for managing multiple social media accounts.",
    type: "Web Application",
    priceModel: "Both",
    category: "apps",
  },
  {
    id: "app-3",
    image: "/software/app-3.svg",
    title: "Lead Generation Tracker",
    description: "Track and analyze lead sources across multiple marketing channels.",
    type: "Web Application",
    priceModel: "Free",
    category: "apps",
  },
];

// Helper function to get items by category
export const getSoftwareByCategory = (category: string): SoftwareItem[] => {
  return SOFTWARE_ITEMS.filter((item) => item.category === category);
};

// Helper function to get category by slug
export const getCategoryBySlug = (slug: string): SoftwareCategory | undefined => {
  return SOFTWARE_CATEGORIES.find((cat) => cat.slug === slug);
};
