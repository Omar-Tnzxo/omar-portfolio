const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Directories to convert images in
const directories = [
  './src/assets',
  './src/assets/tech',
  './src/assets/company',
  './src/assets/projects',
  './public',
  './public/assets'
];

// Image extensions to convert
const imageExtensions = ['.png', '.jpg', '.jpeg'];

// Function to convert image to WebP
async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath);

    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    const savedKB = ((inputStats.size - outputStats.size) / 1024).toFixed(2);

    console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
    console.log(`   Saved: ${savedKB} KB (${inputStats.size} → ${outputStats.size} bytes)`);

    return { input: inputStats.size, output: outputStats.size };
  } catch (error) {
    console.error(`❌ Error converting ${inputPath}:`, error.message);
    return null;
  }
}

// Function to scan directory and convert images
async function convertImagesInDirectory(dir) {
  if (!fs.existsSync(dir)) {
    console.log(`⚠️  Directory not found: ${dir}`);
    return { totalInput: 0, totalOutput: 0, count: 0 };
  }

  const files = fs.readdirSync(dir);
  let totalInput = 0;
  let totalOutput = 0;
  let count = 0;

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      continue; // Skip subdirectories for now
    }

    const ext = path.extname(file).toLowerCase();

    if (imageExtensions.includes(ext)) {
      const outputPath = filePath.replace(ext, '.webp');

      // Skip if WebP already exists and is newer
      if (fs.existsSync(outputPath)) {
        const outputStat = fs.statSync(outputPath);
        if (outputStat.mtime > stat.mtime) {
          console.log(`⏭️  Skipped (already exists): ${file}`);
          continue;
        }
      }

      const result = await convertToWebP(filePath, outputPath);
      if (result) {
        totalInput += result.input;
        totalOutput += result.output;
        count++;
      }
    }
  }

  return { totalInput, totalOutput, count };
}

// Main function
async function main() {
  console.log('🖼️  Starting image conversion to WebP...\n');
  console.log('=' .repeat(60));

  let grandTotalInput = 0;
  let grandTotalOutput = 0;
  let grandTotalCount = 0;

  for (const dir of directories) {
    console.log(`\n📁 Processing: ${dir}`);
    console.log('-'.repeat(60));

    const { totalInput, totalOutput, count } = await convertImagesInDirectory(dir);

    grandTotalInput += totalInput;
    grandTotalOutput += totalOutput;
    grandTotalCount += count;

    if (count > 0) {
      const savedKB = ((totalInput - totalOutput) / 1024).toFixed(2);
      console.log(`\n   Converted: ${count} images`);
      console.log(`   Saved: ${savedKB} KB`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('🎉 CONVERSION COMPLETE!\n');
  console.log(`Total images converted: ${grandTotalCount}`);
  console.log(`Total size before: ${(grandTotalInput / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total size after: ${(grandTotalOutput / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total saved: ${((grandTotalInput - grandTotalOutput) / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Compression ratio: ${((1 - grandTotalOutput / grandTotalInput) * 100).toFixed(1)}%`);
  console.log('='.repeat(60));
}

main().catch(console.error);
