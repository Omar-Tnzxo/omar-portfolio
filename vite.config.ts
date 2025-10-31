import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { copyFileSync, existsSync, mkdirSync } from 'fs';

// Plugin to copy Netlify files to dist
const copyNetlifyFiles = () => {
  return {
    name: 'copy-netlify-files',
    closeBundle() {
      const files = ['_redirects', '_headers', 'robots.txt', 'sitemap.xml'];

      // Ensure dist exists
      if (!existsSync('dist')) {
        mkdirSync('dist', { recursive: true });
      }

      files.forEach(file => {
        const source = `public/${file}`;
        const dest = `dist/${file}`;

        if (existsSync(source)) {
          try {
            copyFileSync(source, dest);
            console.log(`✅ Copied ${file} to dist/`);
          } catch (err) {
            console.warn(`⚠️  Failed to copy ${file}:`, err);
          }
        }
      });
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    copyNetlifyFiles()
  ],
  css: {
    transformer: 'postcss',
    preprocessorOptions: {
      css: {
        charset: false
      }
    },
    postcss: './postcss.config.cjs',
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2015',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        // Code splitting for better performance
        manualChunks: (id) => {
          // React ecosystem
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router')) {
            return 'react-vendor';
          }
          // Animation libraries
          if (id.includes('node_modules/framer-motion')) {
            return 'animation-vendor';
          }
          // UI libraries
          if (id.includes('node_modules/lucide-react') || id.includes('node_modules/react-icons')) {
            return 'ui-vendor';
          }
          // Email and form libraries
          if (id.includes('node_modules/@emailjs') || id.includes('node_modules/sonner')) {
            return 'form-vendor';
          }
        },
        assetFileNames: (assetInfo) => {
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
});
