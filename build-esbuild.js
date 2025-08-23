#!/usr/bin/env node

import * as esbuild from 'esbuild';
import { copy } from 'fs-extra';
import path from 'path';
import { readFileSync } from 'fs';

async function build() {
  try {
    console.log('🚀 Starting esbuild build...');
    
    // Load environment variables from .env file
    let envVars = {};
    try {
      const envContent = readFileSync('.env', 'utf8');
      envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && !key.startsWith('#')) {
          envVars[key.trim()] = valueParts.join('=').trim();
        }
      });
    } catch (error) {
      console.log('⚠️ Could not read .env file, using defaults');
    }
    
    // Build with esbuild
    const result = await esbuild.build({
      entryPoints: ['src/main.tsx'],
      bundle: true,
      outdir: 'dist',
      format: 'esm',
      target: 'es2020',
      minify: true,
      sourcemap: false,
      loader: {
        '.tsx': 'tsx',
        '.ts': 'ts',
        '.jsx': 'jsx',
        '.js': 'js',
        '.css': 'css',
        '.svg': 'file',
        '.png': 'file',
        '.jpg': 'file',
        '.jpeg': 'file',
        '.webp': 'file',
        '.pdf': 'file'
      },
      define: {
        'process.env.NODE_ENV': '"production"',
        'global': 'globalThis',
        'import.meta.env.VITE_APP_EMAILJS_KEY': JSON.stringify(envVars.VITE_APP_EMAILJS_KEY || process.env.VITE_APP_EMAILJS_KEY || 'H4YFvBxDUh6YpVn0a'),
        'import.meta.env.VITE_APP_SERVICE_ID': JSON.stringify(envVars.VITE_APP_SERVICE_ID || process.env.VITE_APP_SERVICE_ID || 'service_mrbmgus'),
        'import.meta.env.VITE_APP_TEMPLATE_ID': JSON.stringify(envVars.VITE_APP_TEMPLATE_ID || process.env.VITE_APP_TEMPLATE_ID || 'template_d16rk5m'),
        'import.meta.env.VITE_APP_EMAILJS_RECIEVER': JSON.stringify(envVars.VITE_APP_EMAILJS_RECIEVER || process.env.VITE_APP_EMAILJS_RECIEVER || 'omar-agha@engineer.com')
      },
      external: [],
      platform: 'browser',
      splitting: true,
      metafile: true,
      write: true,
      publicPath: '/',
      assetNames: 'assets/[name]-[hash]',
      chunkNames: 'chunks/[name]-[hash]',
      entryNames: '[name]'
    });

    console.log('✅ esbuild build completed successfully!');
    
    // Copy public assets
    await copy('public', 'dist', { overwrite: true });
    console.log('✅ Public assets copied!');
    
    // Copy and update index.html
    const indexPath = 'index.html';
    const distIndexPath = 'dist/index.html';
    await copy(indexPath, distIndexPath, { overwrite: true });
    console.log('✅ index.html copied!');
    
    console.log('🎉 Build completed successfully!');
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

build();
