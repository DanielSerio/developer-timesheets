import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '#': path.resolve(__dirname, './src'),
      '#const': path.resolve(__dirname, './src/const'),
      '#hooks': path.resolve(__dirname, './src/hooks'),
      '#styles': path.resolve(__dirname, './src/styles'),
      '#modules': path.resolve(__dirname, './src/modules'),
      "#providers": path.resolve(__dirname, './src/providers'),
      "#types": path.resolve(__dirname, './src/types'),
    },
  },
});
