import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // base: '/courseForm/', // Adjust this if needed
  optimizeDeps: {
    exclude: ['react-bootstrap'], // Exclude react-bootstrap from optimization
  },
  // build: {
  //   rollupOptions: {
  //     output: {
  //       // Add these lines for SPA build
  //       entryFileNames: `assets/[name].[format].js`,
  //       chunkFileNames: `assets/[name].[format].js`,
  //       assetFileNames: (assetInfo) => {
  //         // Optional: Customize asset filename generation here
  //         return `assets/[name].[ext]`;
  //       },
  //     },
  //   },
  //   // Add this line if your app runs under a subdirectory on Render
    
  },
});