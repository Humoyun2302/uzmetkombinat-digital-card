import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { adminApiPlugin } from './vite-plugin-admin-api.ts'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(import.meta.dirname), '')
  for (const key of ['ADMIN_USERNAME', 'ADMIN_PASSWORD', 'ADMIN_SECRET']) {
    if (env[key]) process.env[key] = env[key]
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      adminApiPlugin(path.resolve(import.meta.dirname)),
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, './src'),
      },
    },
  }
})
