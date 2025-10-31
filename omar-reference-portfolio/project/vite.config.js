import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve } from 'path'
import fs from 'fs'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'CalcRealty - حاسبة العقارات',
        short_name: 'CalcRealty',
        description: 'تطبيق حاسبة العقارات الأول في الوطن العربي',
        theme_color: '#2196F3',
        background_color: '#000000',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    }),
    {
      name: 'copy-files',
      writeBundle() {
        // نسخ ملف app-ads.txt إلى مجلد dist
        fs.copyFileSync(
          resolve(__dirname, 'public/app-ads.txt'),
          resolve(__dirname, 'dist/app-ads.txt')
        )
        
        // نسخ ملف .well-known/app-ads.txt إلى مجلد dist
        const wellKnownDir = resolve(__dirname, 'dist/.well-known')
        if (!fs.existsSync(wellKnownDir)) {
          fs.mkdirSync(wellKnownDir, { recursive: true })
        }
        fs.copyFileSync(
          resolve(__dirname, 'public/.well-known/app-ads.txt'),
          resolve(__dirname, 'dist/.well-known/app-ads.txt')
        )
        
        // نسخ ملف google verification إلى مجلد dist
        fs.copyFileSync(
          resolve(__dirname, 'public/google5e1426d4796c5036.html'),
          resolve(__dirname, 'dist/google5e1426d4796c5036.html')
        )
        
        // نسخ ملف BingSiteAuth.xml إلى مجلد dist
        fs.copyFileSync(
          resolve(__dirname, 'public/BingSiteAuth.xml'),
          resolve(__dirname, 'dist/BingSiteAuth.xml')
        )
        
        // نسخ ملف sitemap.xml إلى مجلد dist
        fs.copyFileSync(
          resolve(__dirname, 'sitemap.xml'),
          resolve(__dirname, 'dist/sitemap.xml')
        )
        
        // نسخ ملف robots.txt إلى مجلد dist
        fs.copyFileSync(
          resolve(__dirname, 'robots.txt'),
          resolve(__dirname, 'dist/robots.txt')
        )
        
        // نسخ ملف ads.txt إلى مجلد dist
        fs.copyFileSync(
          resolve(__dirname, 'public/ads.txt'),
          resolve(__dirname, 'dist/ads.txt')
        )
        
        // نسخ ملفات تحقق محركات البحث الأخرى
        fs.copyFileSync(
          resolve(__dirname, 'public/y_key_verification.html'),
          resolve(__dirname, 'dist/y_key_verification.html')
        )
        
        fs.copyFileSync(
          resolve(__dirname, 'public/yandex_verification.html'),
          resolve(__dirname, 'dist/yandex_verification.html')
        )
        
        fs.copyFileSync(
          resolve(__dirname, 'public/yandex_184cd01d4b17b9f1.html'),
          resolve(__dirname, 'dist/yandex_184cd01d4b17b9f1.html')
        )
        
        // نسخ ملف معلومات الذكاء الاصطناعي
        fs.copyFileSync(
          resolve(__dirname, 'public/ai-info.txt'),
          resolve(__dirname, 'dist/ai-info.txt')
        )
        
        // نسخ ملف ping-search-engines.txt
        fs.copyFileSync(
          resolve(__dirname, 'public/ping-search-engines.txt'),
          resolve(__dirname, 'dist/ping-search-engines.txt')
        )
        
        // نسخ ملف _headers
        fs.copyFileSync(
          resolve(__dirname, 'public/_headers'),
          resolve(__dirname, 'dist/_headers')
        )
        
        // نسخ أيقونة الموقع
        fs.copyFileSync(
          resolve(__dirname, 'public/app-logo.png'),
          resolve(__dirname, 'dist/app-logo.png')
        )
      }
    }
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          icons: ['lucide-react'],
          analytics: ['react-ga4']
        }
      }
    },
    sourcemap: true,
    chunkSizeWarningLimit: 1000
  }
})