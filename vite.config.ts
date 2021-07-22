/* eslint-disable quotes */
import { defineConfig,loadEnv } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import viteCompression from 'vite-plugin-compression';
import svgr from 'vite-plugin-svgr';
import { resolve } from 'path';
// import analyze from 'rollup-plugin-analyzer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode,process.cwd());

  //expose .env as process.env
  const envWithProcessPrefix = Object.entries(env).reduce(
    (prev, [key, val]) => ({
      ...prev,
      [`process.env.${key}`]: `"${val}"`,
    }),
    {},
  );
  
  return ({
    build: {
      outDir: 'build',
      // sourcemap: true,
    },
    define: envWithProcessPrefix,
    esbuild: {
      jsxInject: `import React from 'react'`,
    },
    plugins: [
      reactRefresh(),
      viteCompression(),
      // viteCompression({
      //   algorithm: 'brotliCompress',
      // }), //brotli compression
      svgr(),
      // analyze({ summaryOnly: true }), //for package analyze
    ],
    resolve: {
      alias: [{ find: '@', replacement: resolve('src') }],
    },
  });
});
