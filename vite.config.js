import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
    // En desarrollo, redirige el backend PHP local (php -S localhost:8000 -t public).
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
});
