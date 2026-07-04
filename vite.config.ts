/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/apple-touch-icon.png'],
      workbox: {
        // Precache EVERYTHING (audio and fonts included): the app must be
        // fully usable offline with zero runtime network calls.
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,mp3}'],
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
      },
      manifest: {
        name: 'HeyBoop',
        short_name: 'HeyBoop',
        description: 'Tap anywhere — numbers, letters, animals, and fruits for little ones.',
        display: 'fullscreen',
        orientation: 'any',
        background_color: '#FFF8ED',
        theme_color: '#FFF8ED',
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: '/icons/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
