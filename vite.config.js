import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all IP addresses
    port: 5173, // Default Vite port
    strictPort: false, // Try next available port if 5173 is busy
  },
})
