// for @testing-library/react only as vite use esbuild instead of babel
module.exports = {
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    '@emotion',
    '@babel/plugin-transform-runtime',
  ],
};
