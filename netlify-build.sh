#!/bin/bash

# Netlify Build Script for Linux compatibility
echo "🚀 Starting Netlify build process..."

# Set environment variables
export NPM_CONFIG_OPTIONAL=false
export ROLLUP_SKIP_NATIVE=true
export ROLLUP_SKIP_NATIVE_BINARIES=true
export VITE_SKIP_NATIVE=true
export CI=false

# Clean install without optional dependencies
echo "📦 Installing dependencies..."
npm ci --omit=optional --no-audit --no-fund

# Build the project
echo "🏗️ Building project..."
npm run build

echo "✅ Build completed successfully!"
