import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      includeAssets: ["favicon.ico", "robots.txt"],

      manifest: {
        name: "DEMO",
        short_name: "DEMO",
        description: "Edusafa Demo Madrasa App",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",

        icons: [
          {
            src: "/web-app-icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/web-app-icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },

      workbox: {
        // ✅ Prevent old cache issues
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,

        // ✅ Fix React Router refresh issue
        navigateFallback: "/index.html",

        runtimeCaching: [
          {
            // 🔹 Cache images
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },

          {
            // 🔹 Cache fonts
            urlPattern: /\.(?:woff|woff2|ttf|otf)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "fonts-cache",
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },

          {
            // 🔹 Cache static assets
            urlPattern: /^(?!.*\/api\/).*\.(?:js|css|html)$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "static-cache",
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },

      // ✅ iOS PWA support
      devOptions: {
        enabled: false,
      },
    }),
  ],
});