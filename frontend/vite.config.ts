import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Automatically update service workers
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'], // Static assets
      manifest: {
        name: "Bike repair shop",
        short_name: "BRS",
        lang: "no",
        start_url: "/",
        icons: [
          {
            src: "icons/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable"
          },
          {
            src: "icons/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ],
        theme_color: "#000000",
        background_color: "#FFFFFF",
        display: "fullscreen",
        orientation: "portrait"
      },
      workbox: {
        runtimeCaching: [
          // Cache API requests with StaleWhileRevalidate strategy
          // {
          //   urlPattern: ({ url }) => url.pathname.startsWith('/api/'),
          //   handler: 'StaleWhileRevalidate',
          //   options: {
          //     cacheName: 'api-cache',
          //     expiration: {
          //       maxEntries: 50,
          //       maxAgeSeconds: 60 * 60 * 24, // Cache API responses for 1 day
          //     },
          //     cacheableResponse: {
          //       statuses: [0, 200], // Cache valid responses
          //     },
          //   },
          // },
          // Cache pages with NetworkFirst strategy
          {
            urlPattern: ({ request }) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pages-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 7, // Cache pages for 7 days
              },
            },
          },
          // Cache static assets (images, scripts, stylesheets)
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30, // Cache images for 30 days
              },
            },
          },
          {
            urlPattern: ({ request }) =>
              request.destination === 'script' || request.destination === 'style',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-resources',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // Cache for 30 days
              },
            },
          },
        ],
      },
    }),
  ],
});