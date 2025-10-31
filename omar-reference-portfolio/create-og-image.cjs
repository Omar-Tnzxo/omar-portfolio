const sharp = require('sharp');
const fs = require('fs');

async function createOGImage() {
  const width = 1200;
  const height = 630;

  try {
    // Create background with gradient
    const svg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#050816;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#151030;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#100d25;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="${width}" height="${height}" fill="url(#grad)"/>

        <!-- Title -->
        <text x="600" y="220" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="#FFFFFF" text-anchor="middle">
          Omar Hassan
        </text>

        <!-- Subtitle -->
        <text x="600" y="300" font-family="Arial, sans-serif" font-size="36" fill="#aaa6c3" text-anchor="middle">
          Digital Marketing &amp; Growth Specialist
        </text>

        <!-- Description -->
        <text x="600" y="380" font-family="Arial, sans-serif" font-size="24" fill="#E2CBFF" text-anchor="middle">
          Expert in digital marketing strategies, full-stack development,
        </text>
        <text x="600" y="420" font-family="Arial, sans-serif" font-size="24" fill="#E2CBFF" text-anchor="middle">
          and CalcRealty solutions
        </text>

        <!-- Website URL -->
        <text x="600" y="520" font-family="Arial, sans-serif" font-size="28" fill="#915EFF" text-anchor="middle">
          omarhassan.site
        </text>
      </svg>
    `;

    // Create OG image
    await sharp(Buffer.from(svg))
      .png()
      .toFile('public/og-image.png');

    console.log('✅ Created og-image.png (1200x630)');

    // Also create WebP version
    await sharp(Buffer.from(svg))
      .webp({ quality: 90 })
      .toFile('public/og-image.webp');

    console.log('✅ Created og-image.webp (1200x630)');

    // Create favicon.ico from logo
    if (fs.existsSync('src/assets/logo.webp')) {
      await sharp('src/assets/logo.webp')
        .resize(32, 32)
        .png()
        .toFile('public/favicon.ico');

      console.log('✅ Created favicon.ico from logo');
    }

  } catch (error) {
    console.error('Error creating OG image:', error);
  }
}

createOGImage();
