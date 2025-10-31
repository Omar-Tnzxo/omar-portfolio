// Generate Portfolio Project Placeholder Images
const fs = require('fs');
const path = require('path');

// SVG template for project placeholders
const createProjectPlaceholder = (title, color, category) => `
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-${category}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:0.3" />
      <stop offset="100%" style="stop-color:${color};stop-opacity:0.8" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="800" height="600" fill="#0f0f1e"/>
  <rect width="800" height="600" fill="url(#grad-${category})"/>
  
  <!-- Grid Pattern -->
  <defs>
    <pattern id="grid-${category}" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="800" height="600" fill="url(#grid-${category})"/>
  
  <!-- Category Badge -->
  <rect x="30" y="30" width="120" height="32" rx="16" fill="rgba(0,0,0,0.5)"/>
  <text x="90" y="51" font-family="Arial, sans-serif" font-size="14" fill="white" text-anchor="middle" font-weight="600">
    ${category.toUpperCase()}
  </text>
  
  <!-- Icon/Symbol -->
  <circle cx="400" cy="250" r="80" fill="rgba(255,255,255,0.1)"/>
  <circle cx="400" cy="250" r="60" fill="rgba(255,255,255,0.15)"/>
  
  <!-- Title -->
  <text x="400" y="380" font-family="Arial, sans-serif" font-size="32" fill="white" text-anchor="middle" font-weight="bold">
    ${title}
  </text>
  
  <!-- Subtitle -->
  <text x="400" y="420" font-family="Arial, sans-serif" font-size="16" fill="rgba(255,255,255,0.6)" text-anchor="middle">
    Portfolio Project
  </text>
  
  <!-- Decorative Elements -->
  <circle cx="100" cy="500" r="40" fill="rgba(255,255,255,0.05)"/>
  <circle cx="700" cy="100" r="60" fill="rgba(255,255,255,0.05)"/>
</svg>
`;

// Portfolio project definitions
const portfolioProjects = [
  // Mobile Apps
  { file: 'calcrealty-cover.svg', title: 'CalcRealty', color: '#00D4FF', category: 'mobile', folder: 'mobile' },
  { file: 'calcrealty-1.svg', title: 'CalcRealty UI', color: '#00D4FF', category: 'mobile', folder: 'mobile' },
  { file: 'calcrealty-2.svg', title: 'CalcRealty Feature', color: '#00D4FF', category: 'mobile', folder: 'mobile' },
  { file: 'calcrealty-3.svg', title: 'CalcRealty Dashboard', color: '#00D4FF', category: 'mobile', folder: 'mobile' },
  { file: 'calcrealty-4.svg', title: 'CalcRealty Report', color: '#00D4FF', category: 'mobile', folder: 'mobile' },
  
  // Web Development
  { file: 'portfolio-cover.svg', title: 'Portfolio Website', color: '#915EFF', category: 'web', folder: 'web' },
  { file: 'portfolio-1.svg', title: 'Portfolio Homepage', color: '#915EFF', category: 'web', folder: 'web' },
  { file: 'portfolio-2.svg', title: 'Portfolio Projects', color: '#915EFF', category: 'web', folder: 'web' },
  { file: 'portfolio-3.svg', title: 'Portfolio Contact', color: '#915EFF', category: 'web', folder: 'web' },
  { file: 'fashion-cover.svg', title: 'E-commerce Store', color: '#FF6B9D', category: 'web', folder: 'web' },
  { file: 'fashion-1.svg', title: 'Fashion Products', color: '#FF6B9D', category: 'web', folder: 'web' },
  { file: 'fashion-2.svg', title: 'Fashion Cart', color: '#FF6B9D', category: 'web', folder: 'web' },
  { file: 'fashion-3.svg', title: 'Fashion Checkout', color: '#FF6B9D', category: 'web', folder: 'web' },
  
  // Social Media
  { file: 'real-estate-cover.svg', title: 'Lead Generation', color: '#FFA500', category: 'social', folder: 'social' },
  { file: 'real-estate-1.svg', title: 'Social Post 1', color: '#FFA500', category: 'social', folder: 'social' },
  { file: 'real-estate-2.svg', title: 'Social Post 2', color: '#FFA500', category: 'social', folder: 'social' },
  { file: 'real-estate-3.svg', title: 'Social Analytics', color: '#FFA500', category: 'social', folder: 'social' },
  { file: 'finance-cover.svg', title: 'B2B Finance', color: '#00FF88', category: 'social', folder: 'social' },
  { file: 'finance-1.svg', title: 'Finance Campaign', color: '#00FF88', category: 'social', folder: 'social' },
  { file: 'finance-2.svg', title: 'Finance Strategy', color: '#00FF88', category: 'social', folder: 'social' },
  
  // Telegram Bots
  { file: 'property-bot-cover.svg', title: 'Property Bot', color: '#0088CC', category: 'telegram', folder: 'bots' },
  { file: 'property-bot-1.svg', title: 'Bot Interface', color: '#0088CC', category: 'telegram', folder: 'bots' },
  { file: 'property-bot-2.svg', title: 'Bot Analytics', color: '#0088CC', category: 'telegram', folder: 'bots' },
  
  // Automation
  { file: 'content-automation-cover.svg', title: 'Content Automation', color: '#FFD700', category: 'automation', folder: 'automation' },
  { file: 'content-1.svg', title: 'Workflow 1', color: '#FFD700', category: 'automation', folder: 'automation' },
  { file: 'content-2.svg', title: 'Workflow 2', color: '#FFD700', category: 'automation', folder: 'automation' },
  
  // Scripts
  { file: 'property-scripts-cover.svg', title: 'Video Scripts', color: '#FF1493', category: 'script', folder: 'scripts' },
  { file: 'script-1.svg', title: 'Script Sample', color: '#FF1493', category: 'script', folder: 'scripts' },
];

// Ensure directories exist
const dirs = ['mobile', 'web', 'social', 'bots', 'automation', 'scripts'];
dirs.forEach(dir => {
  const dirPath = path.join(__dirname, 'public', 'portfolio', dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Generate all placeholders
let successCount = 0;
let errorCount = 0;

portfolioProjects.forEach(project => {
  try {
    const svg = createProjectPlaceholder(project.title, project.color, project.category);
    const filePath = path.join(__dirname, 'public', 'portfolio', project.folder, project.file);
    fs.writeFileSync(filePath, svg.trim());
    console.log(`✅ Created: ${project.folder}/${project.file}`);
    successCount++;
  } catch (error) {
    console.error(`❌ Error creating ${project.file}:`, error.message);
    errorCount++;
  }
});

// Also create a generic placeholder
try {
  const genericPlaceholder = createProjectPlaceholder('Project', '#915EFF', 'portfolio');
  const genericPath = path.join(__dirname, 'public', 'placeholder-project.svg');
  fs.writeFileSync(genericPath, genericPlaceholder.trim());
  console.log(`✅ Created: placeholder-project.svg`);
  successCount++;
} catch (error) {
  console.error(`❌ Error creating placeholder-project.svg:`, error.message);
  errorCount++;
}

console.log('\n📊 Summary:');
console.log(`✅ Successfully created: ${successCount} files`);
console.log(`❌ Errors: ${errorCount} files`);
console.log('\n🎉 Portfolio placeholder generation complete!');
