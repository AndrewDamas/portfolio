import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // For GitHub Pages project sites, set VITE_BASE=/<repo-name>/ in CI.
  // Defaults to '/' for local dev and user/org pages (username.github.io).
  base: process.env.VITE_BASE ?? '/',
})
