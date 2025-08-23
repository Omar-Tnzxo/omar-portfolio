#!/bin/bash

# Netlify Build Script for Linux compatibility
echo "🚀 Starting Netlify build process..."

# Set environment variables
export NPM_CONFIG_OPTIONAL=false
export ROLLUP_SKIP_NATIVE=true
export ROLLUP_SKIP_NATIVE_BINARIES=true
export VITE_SKIP_NATIVE=true
export CI=false
export NODE_OPTIONS="--max-old-space-size=4096"

# Clean install without optional dependencies
echo "📦 Installing dependencies..."
npm ci --omit=optional --no-audit --no-fund --legacy-peer-deps

# Check if installation was successful
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Force install rollup native binary
echo "🔧 Installing rollup native binary..."
npm install @rollup/rollup-linux-x64-gnu@4.6.1 --no-save

# Build the project
echo "🏗️ Building project..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

# Check if dist directory exists
if [ ! -d "dist" ]; then
    echo "❌ dist directory not found after build"
    exit 1
fi

echo "✅ Build completed successfully!"
echo "📁 dist directory contents:"
ls -la dist/
