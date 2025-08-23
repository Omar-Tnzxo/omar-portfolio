#!/bin/bash

# Exit on any error
set -e

echo "=== Starting Vite build process ==="

# Clean install without optional dependencies
echo "Installing dependencies..."
npm ci --omit=optional --legacy-peer-deps

# Set environment variables
export ROLLUP_SKIP_NATIVE=true
export ROLLUP_SKIP_NATIVE_BINARIES=true
export VITE_SKIP_NATIVE=true
export NODE_OPTIONS="--max-old-space-size=4096"

echo "Environment variables set:"
echo "ROLLUP_SKIP_NATIVE: $ROLLUP_SKIP_NATIVE"
echo "ROLLUP_SKIP_NATIVE_BINARIES: $ROLLUP_SKIP_NATIVE_BINARIES"
echo "VITE_SKIP_NATIVE: $VITE_SKIP_NATIVE"
echo "NODE_OPTIONS: $NODE_OPTIONS"

# Build with Vite using production mode
echo "Building project with Vite..."
npx vite build --mode production --force

# Check if dist directory exists
if [ -d "dist" ]; then
    echo "✅ Build successful! dist directory created."
    ls -la dist/
else
    echo "❌ Build failed! dist directory not found."
    exit 1
fi

echo "=== Build completed successfully! ==="
