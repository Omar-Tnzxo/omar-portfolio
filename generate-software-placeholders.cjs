/**
 * Generate placeholder images for software arsenal
 * This script creates simple SVG placeholders
 */

const fs = require('fs');
const path = require('path');

const softwareDir = path.join(__dirname, 'public', 'software');

// Ensure directory exists
if (!fs.existsSync(softwareDir)) {
  fs.mkdirSync(softwareDir, { recursive: true });
}

const placeholders = [
  { name: 'tool-1.webp', color: '#915EFF', text: 'Browser Extension' },
  { name: 'tool-2.webp', color: '#00D4FF', text: 'Python Script' },
  { name: 'tool-3.webp', color: '#FF6B9D', text: 'VS Code Extension' },
  { name: 'tool-4.webp', color: '#FFD700', text: 'CLI Tool' },
  { name: 'program-1.webp', color: '#915EFF', text: 'Desktop App' },
  { name: 'program-2.webp', color: '#00D4FF', text: 'CRM System' },
  { name: 'program-3.webp', color: '#FF6B9D', text: 'CMS Platform' },
  { name: 'app-1.webp', color: '#915EFF', text: 'Mobile App' },
  { name: 'app-2.webp', color: '#00D4FF', text: 'Web App' },
  { name: 'app-3.webp', color: '#FF6B9D', text: 'Lead Tracker' },
];

placeholders.forEach(({ name, color, text }) => {
  const svgContent = `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad-${name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${color}88;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="800" height="600" fill="#0a0a1f"/>
  <rect x="50" y="50" width="700" height="500" rx="20" fill="url(#grad-${name})" opacity="0.2"/>
  <text x="400" y="280" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="${color}" text-anchor="middle">
    ${text}
  </text>
  <text x="400" y="340" font-family="Arial, sans-serif" font-size="24" fill="#ffffff" opacity="0.7" text-anchor="middle">
    Software Arsenal
  </text>
</svg>`;

  const filePath = path.join(softwareDir, name.replace('.webp', '.svg'));
  fs.writeFileSync(filePath, svgContent);
  console.log(`✓ Created ${name.replace('.webp', '.svg')}`);
});

console.log('\n✅ All placeholder images created!');
console.log('📁 Location: public/software/');
