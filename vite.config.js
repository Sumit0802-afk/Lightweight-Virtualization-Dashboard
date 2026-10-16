import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// Default base is '/' for Vercel and local dev. The GitHub Pages build passes
// --base explicitly (see the "build:pages" script) since that site is served
// from a /Lightweight-Virtualization-Dashboard/ subpath instead of the root.
export default defineConfig({ plugins: [react()] })