const sharp = require('sharp');

async function createHeroBg() {
  const width = 1920;
  const height = 1080;

  try {
    // Create a dark gradient background with stars effect
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="grad" cx="50%" cy="50%">
            <stop offset="0%" style="stop-color:#151030;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#100d25;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#050816;stop-opacity:1" />
          </radialGradient>

          <!-- Star pattern -->
          <pattern id="stars" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="20" r="1" fill="#ffffff" opacity="0.3"/>
            <circle cx="50" cy="50" r="1.5" fill="#ffffff" opacity="0.5"/>
            <circle cx="150" cy="30" r="1" fill="#ffffff" opacity="0.4"/>
            <circle cx="180" cy="120" r="1" fill="#ffffff" opacity="0.3"/>
            <circle cx="90" cy="150" r="1.2" fill="#ffffff" opacity="0.4"/>
            <circle cx="130" cy="180" r="1" fill="#ffffff" opacity="0.5"/>
            <circle cx="30" cy="100" r="1.3" fill="#ffffff" opacity="0.3"/>
            <circle cx="170" cy="70" r="1" fill="#ffffff" opacity="0.4"/>
            <circle cx="60" cy="160" r="1.5" fill="#915EFF" opacity="0.2"/>
            <circle cx="140" cy="40" r="1.5" fill="#E2CBFF" opacity="0.2"/>
          </pattern>
        </defs>

        <!-- Base gradient -->
        <rect width="${width}" height="${height}" fill="url(#grad)"/>

        <!-- Stars overlay -->
        <rect width="${width}" height="${height}" fill="url(#stars)"/>

        <!-- Accent glow circles -->
        <circle cx="300" cy="200" r="200" fill="#915EFF" opacity="0.03"/>
        <circle cx="${width - 300}" cy="300" r="250" fill="#E2CBFF" opacity="0.03"/>
        <circle cx="${width / 2}" cy="${height - 200}" r="180" fill="#915EFF" opacity="0.02"/>
      </svg>
    `;

    // Create hero background
    await sharp(Buffer.from(svg))
      .webp({ quality: 85 })
      .toFile('public/herobg.webp');

    console.log('✅ Created herobg.webp with dark gradient and stars');

    // Get file size
    const fs = require('fs');
    const stats = fs.statSync('public/herobg.webp');
    console.log(`   File size: ${(stats.size / 1024).toFixed(2)} KB`);

  } catch (error) {
    console.error('Error creating hero background:', error);
  }
}

createHeroBg();
