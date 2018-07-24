const webpack = require('webpack');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

const projectPath = path.resolve('./');
const dllBundlePath = path.join(projectPath, './node_modules/__dll-bundle__');

module.exports = {
  entry: {
    vendor: [
      'babel-polyfill',
      'axios',
      'react',
      'react-dom',
      'react-loadable',
      'react-router',
      'react-router-dom',
      'mobx',
      'mobx-react'
    ]
  },
  output: {
    filename: '[name]_[chunkhash:8].dll.js',
    path: dllBundlePath,
    library: '[name]_[chunkhash:8]'
  },
  mode: isProduction ? 'production' : 'development',
  performance: {
    hints: false
  },
  plugins: [
    new webpack.DllPlugin({
      context: projectPath,
      path: path.join(dllBundlePath, '[name].json'),
      name: '[name]_[chunkhash:8]'
    }),
    new webpack.HashedModuleIdsPlugin()
  ]
};
