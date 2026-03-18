import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // apple-touch-icon.png നിങ്ങളുടെ public ഫോൾഡറിൽ ഉണ്ടെന്ന് ഉറപ്പുവരുത്തുക
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Edusafa',
        short_name: 'Edusafa',
        description: 'Edusafa Demo Madrasa App',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'web-app-icon-192.png', // '/' ഒഴിവാക്കുന്നതാണ് നല്ലത്
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'web-app-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'web-app-icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        navigateFallback: '/index.html',
        // ക്യാഷ് ചെയ്യേണ്ട ഫയലുകളുടെ ലിസ്റ്റ്
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            // ഇമേജുകൾക്ക് CacheFirst രീതി (വേഗത കൂട്ടും)
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 ദിവസം
              },
            },
          },
          {
            // ഗൂഗിൾ ഫോണ്ടുകൾ ക്യാഷ് ചെയ്യാൻ
            urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
          {
            // സ്റ്റാറ്റിക് ഫയലുകൾക്ക് StaleWhileRevalidate (പശ്ചാത്തലത്തിൽ അപ്ഡേറ്റ് ചെയ്യും)
            urlPattern: /^(?!.*\/api\/).*\.(?:js|css|html)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-cache',
            },
          },
        ],
      },
    }),
  ],
  build: {
    // പെർഫോമൻസ് കൂട്ടാൻ Terser ഉപയോഗിച്ചുള്ള മിനിഫിക്കേഷൻ
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // ലൈവ് ആപ്പിൽ console.log ഒഴിവാക്കും
        drop_debugger: true,
      },
    },
    // വലിയ ഫയലുകളെ ചെറിയ കഷ്ണങ്ങളാക്കി മാറ്റുന്നു (Chunking)
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString()
          }
        },
      },
    },
  },
})
