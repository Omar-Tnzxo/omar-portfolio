import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting Vercel build process...');
console.log('Current directory:', __dirname);
console.log('Process CWD:', process.cwd());

// List all files in current directory
console.log('Files in current directory:');
try {
  const files = fs.readdirSync(__dirname);
  console.log(files);
} catch (error) {
  console.log('Could not read directory:', error.message);
}

// Check if src directory exists
const srcPath = path.join(__dirname, 'src');
if (fs.existsSync(srcPath)) {
  console.log('src directory found');
  const srcFiles = fs.readdirSync(srcPath);
  console.log('Files in src directory:', srcFiles);
} else {
  console.log('src directory not found');
}

// Check if main.tsx exists
const mainTsxPath = path.join(__dirname, 'src', 'main.tsx');
if (fs.existsSync(mainTsxPath)) {
  console.log('main.tsx found at:', mainTsxPath);
} else {
  console.log('main.tsx not found at:', mainTsxPath);
}

try {
  // Run the build command directly
  console.log('Running vite build...');
  execSync('npx vite build', { stdio: 'inherit' });
  console.log('Vercel build completed successfully!');
} catch (error) {
  console.error('Vercel build failed:', error.message);
  process.exit(1);
} 