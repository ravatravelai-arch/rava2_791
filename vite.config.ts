import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// پیاده‌سازی __dirname برای محیط‌های ESM در نودجی‌اس
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  // بخش‌های define و loadEnv را حذف کردیم چون دیگر نیازی نیست
});