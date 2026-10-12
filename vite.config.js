
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: false,
      includeAssets: ['icon.svg'],
      workbox: {
        globPatterns: ['**/*.{css,html,js,svg,webmanifest}'],
      },
    }),
  ],
  server: {
    allowedHosts: ['transparence.alexis-damien.fr'],
  },
})
