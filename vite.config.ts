import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project site: https://Himanshu03-Dev.github.io/aradhaya-beauty-hub/
// If the repository is ever renamed, change this to match the new path
// (or use './' for a base-agnostic build).
export default defineConfig({
  base: '/aradhaya-beauty-hub/',
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/*.zip'],
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          motion: ['framer-motion', 'gsap'],
        },
      },
    },
  },
})
