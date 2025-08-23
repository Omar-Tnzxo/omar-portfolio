#!/usr/bin/env node

import * as esbuild from 'esbuild';
import { copy } from 'fs-extra';
import path from 'path';

async function build() {
  try {
    console.log('🚀 Starting esbuild build...');
    
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
        'global': 'globalThis'
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
