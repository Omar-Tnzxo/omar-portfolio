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
  plugins: [react(), copyNetlifyFiles()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ['**/*.gltf', '**/*.bin', '**/*.glb'],
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Code splitting for better performance
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'animation-vendor': ['framer-motion'],
        },
        assetFileNames: (assetInfo) => {
          // Keep related files together
          if (assetInfo.name?.endsWith('.bin')) {
            return 'assets/[name]-[hash][extname]';
          }
          if (assetInfo.name?.endsWith('.gltf')) {
            return 'assets/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
});
