import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import sass from 'sass';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          exportType: 'named',
          ref: true,
        },
        include: '**/*.svg',
      }),
    ],
    resolve: {
      alias: {
        '~': resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          implementation: sass,
        },
      },
    },
  };
});
