import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@/Layout', replacement: path.resolve(__dirname, 'Layout.jsx') },
      { find: '@/components', replacement: path.resolve(__dirname, 'Components') },
      { find: '@/services', replacement: path.resolve(__dirname, 'src/services') },
      { find: '@/pages', replacement: path.resolve(__dirname, 'Pages') },
      { find: '@/entities', replacement: path.resolve(__dirname, 'Entities') },
      { find: '@/utils', replacement: path.resolve(__dirname, 'utils.jsx') },
      { find: '@', replacement: path.resolve(__dirname, '.') },
    ],
  },
  server: {
    port: 5173,
  },
});
