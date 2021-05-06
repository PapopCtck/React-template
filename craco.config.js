/* eslint-disable @typescript-eslint/no-var-requires */
const zlib = require('zlib');

const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const plugins = [
  new CompressionPlugin({
    filename: '[path][base].gz',
    algorithm: 'gzip',
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8,
  }),
  new CompressionPlugin({
    filename: '[path][base].br',
    algorithm: 'brotliCompress',
    test: /\.(js|css|html|svg)$/,
    compressionOptions: {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
      },
    },
    threshold: 10240,
    minRatio: 0.8,
  }),
];

module.exports = function () {
  const isAnalyze = typeof process.env.BUNDLE_ANALYZE !== 'undefined';
  if (isAnalyze) {
    plugins.push(new BundleAnalyzerPlugin());
  }
  return {
    webpack: {
      plugins: {
        add: plugins,
      },
    },
  };
};

