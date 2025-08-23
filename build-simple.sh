#!/bin/bash

# Exit on any error
set -e

echo "=== Starting simple build process ==="

# Clean install without optional dependencies
echo "Installing dependencies..."
npm ci --omit=optional --legacy-peer-deps

# Set environment variables
export ROLLUP_SKIP_NATIVE=true
export ROLLUP_SKIP_NATIVE_BINARIES=true
export VITE_SKIP_NATIVE=true

echo "Environment variables set:"
echo "ROLLUP_SKIP_NATIVE: $ROLLUP_SKIP_NATIVE"
echo "ROLLUP_SKIP_NATIVE_BINARIES: $ROLLUP_SKIP_NATIVE_BINARIES"
echo "VITE_SKIP_NATIVE: $VITE_SKIP_NATIVE"

# Try alternative build approach
echo "Building project with esbuild..."
npx esbuild src/main.tsx --bundle --outdir=dist --format=esm --target=es2015 --minify

# If esbuild fails, try vite with different settings
if [ $? -ne 0 ]; then
    echo "esbuild failed, trying vite with minimal settings..."
    npx vite build --mode production
fi

# Check if dist directory exists
if [ -d "dist" ]; then
    echo "✅ Build successful! dist directory created."
    ls -la dist/
else
    echo "❌ Build failed! dist directory not found."
    exit 1
fi

echo "=== Build completed successfully! ==="
