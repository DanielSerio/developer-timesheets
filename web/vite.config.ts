import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react()
  ],
  resolve: {
    alias: {
      '#': path.resolve(__dirname, './src'),
      '#const': path.resolve(__dirname, './src/const'),
      '#hooks': path.resolve(__dirname, './src/hooks'),
      '#styles': path.resolve(__dirname, './src/styles'),
      '#modules': path.resolve(__dirname, './src/modules'),
      "#providers": path.resolve(__dirname, './src/providers'),
      "#types": path.resolve(__dirname, './src/types'),
      "#services": path.resolve(__dirname, './src/services'),
    },
  },
});
