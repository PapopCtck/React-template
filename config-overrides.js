/* eslint-disable @typescript-eslint/no-var-requires */
const zlib = require('zlib');

const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = function override(config) {
  //do stuff with the webpack config...
  config.plugins.push(...plugins);
  return config;
};

const plugins = [
  new BundleAnalyzerPlugin(),
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
