import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@emotion/react',
      '@emotion/styled',
      '@mui/material',
      '@mui/icons-material',
      '@mui/system',
    ],
  },
  resolve: {
    dedupe: ['@emotion/react', '@emotion/styled', 'react', 'react-dom'],
  },
  base: '/employee-admin/',
});
