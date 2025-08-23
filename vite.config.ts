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
      // Skip native binaries for Netlify
      external: process.env.ROLLUP_SKIP_NATIVE ? [] : undefined
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    minify: 'esbuild',
    outDir: 'dist',
    // Skip native dependencies
    target: 'es2020'
  },
  server: {
    hmr: {
      overlay: false
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
    exclude: process.env.ROLLUP_SKIP_NATIVE ? ['@rollup/rollup-linux-x64-gnu'] : []
  },
  define: {
    global: 'globalThis',
  },
  base: '/',
  publicDir: 'public'
});
