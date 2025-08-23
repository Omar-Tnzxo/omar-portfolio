#!/bin/bash

# Clean install without optional dependencies
echo "Installing dependencies..."
npm ci --omit=optional --legacy-peer-deps

# Set environment variables
export ROLLUP_SKIP_NATIVE=true
export ROLLUP_SKIP_NATIVE_BINARIES=true

# Build the project
echo "Building project..."
npm run build

echo "Build completed!"
