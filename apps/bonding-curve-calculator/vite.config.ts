import path from 'node:path';
import react from '@vitejs/plugin-react-swc';
import unocss from 'unocss/vite';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [unocss(), react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
});
