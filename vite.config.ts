import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  envPrefix: ['API_'],

  server: {
    port: 3000,
  },

  plugins: [
    tsConfigPaths(),
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routesDirectory: 'src/app',
    }),
    react(),
    tailwindcss(),
  ],
});
