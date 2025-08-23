import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          utils: ['clsx', 'tailwind-merge', 'maath']
        }
      },
      external: [],
      onwarn(warning, warn) {
        return;
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    minify: 'esbuild',
    outDir: 'dist',
    target: 'es2020',
    commonjsOptions: {
      include: []
    }
  },
  server: {
    hmr: {
      overlay: false
    },
    port: 5173,
    host: true
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
    exclude: ['@rollup/rollup-linux-x64-gnu', '@rollup/rollup-darwin-x64', '@rollup/rollup-win32-x64-msvc']
  },
  define: {
    global: 'globalThis',
    'process.env.ROLLUP_SKIP_NATIVE': 'true',
    'process.env.ROLLUP_SKIP_NATIVE_BINARIES': 'true',
    'process.env.VITE_SKIP_NATIVE': 'true'
  },
  base: '/',
  publicDir: 'public',
  assetsInclude: ['**/*.webp', '**/*.png', '**/*.svg', '**/*.jpg', '**/*.jpeg'],
  esbuild: {
    target: 'es2020',
    supported: {
      'top-level-await': true
    }
  }
});
