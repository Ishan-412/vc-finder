// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // REMOVE THIS BLOCK IF IT EXISTS:
  // css: {
  //   postcss: {
  //     plugins: [
  //       tailwindcss,
  //       autoprefixer
  //     ],
  //   },
  // },
});