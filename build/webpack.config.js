const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const projectPath = path.resolve('./');
const dllBundlePath = path.join(projectPath, './node_modules/__dll-bundle__');
const vendorManifestPath = path.resolve(dllBundlePath, 'vendor.json');

let vendorManifest;

try {
  vendorManifest = require(vendorManifestPath);
} catch(e) {
  console.error(chalk.red('[Webpack] Dll files are missing. Please run `npm run build:dll`\n'));
  process.exit(1);
}

module.exports = {
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? '' : 'eval-source-map',

  entry: {
    main: './src/main.js'
  },

  output: isProduction ? {
    path: path.join(projectPath, 'dist'),
    filename: 'assets/js/[name]_[chunkhash:8].js',
    chunkFilename: 'assets/js/chunk_[name]_[chunkhash:8].js',
    publicPath: '/',
  } : {
    path: path.join(projectPath, 'dist'),
    filename: 'assets/js/[name]_[hash:8].js',
    chunkFilename: 'assets/js/chunk_[name]_[hash:8].js',
    publicPath: '/',
  },

  resolve: {
      modules: [
        path.resolve(projectPath, "src"),
        'node_modules',
      ],
      extensions: ['.js', '.jsx', '.json'],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/]/,
          name: 'common',
          priority: -10,
          chunks: 'all',
        },
      }
    },
    runtimeChunk: 'single',
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: !isProduction
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },

  module: {
    rules: [
      {
        test: /\.(?:js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        enforce: "pre",
        test: /\.(?:js|jsx)$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          cache: false,
          // emitError: true,
          // emitWarning: true
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: !isProduction,
              camelCase: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          },
          { loader: 'postcss-loader', options: {
            ident: 'postcss',
            plugins: () => [
              postcssPresetEnv({
                stage: 0
              })
            ]
          } }
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(?:woff2?|eot|ttf|svg)$/,
        loader: 'file-loader',
        options: isProduction ? {
          name: 'assets/fonts/[name]_[hash:10].[ext]'
        } : {
          name: 'assets/fonts/[name].[ext]'
        }
      },
      {
        test: /\.(?:png|jpg|jpeg|git)$/,
        loader: 'file-loader',
        options: isProduction ? {
          name: 'assets/images/[name]_[hash:10].[ext]'
        } : {
          name: 'assets/images/[name].[ext]'
        }
      },
    ],
  },

  plugins: [
    new webpack.DllReferencePlugin({
      context: projectPath,
      manifest: vendorManifest
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: 'index.html',
      chunksSortMode: 'dependency',
    }),
    new AddAssetHtmlPlugin({
      filepath: path.join(dllBundlePath, `*.dll.js`),
      outputPath: 'assets/js/',
      publicPath: '/assets/js/',
      includeSourcemap: false
    }),
    new MiniCssExtractPlugin({
      filename: isProduction ?
        'assets/css/[name].[contenthash:8].css' :
        'assets/css/[name].css',
      chunkFilename: isProduction ?
        'assets/css/[name].[contenthash:8].css' :
        'assets/css/[name].css'
    }),
    new CopyWebpackPlugin([
      {
        from: '**/*',
        context: 'static/',
        ignore: ['.*']
      }
    ]),
    ...isProduction ? [
      // new webpack.HotModuleReplacementPlugin(),
    ] : [
      new webpack.HotModuleReplacementPlugin(),
    ],
  ],

  devServer: {
    port: 8080,
    host: "0.0.0.0",
    hot: !isProduction,
    https: false,
    compress: true,
    historyApiFallback: true,
    disableHostCheck: true,
    inline: true,
    contentBase: path.join(projectPath, 'dist'),
    proxy: {
      '/api': {
        target: 'localhost:8081'
      }
    }
  },
};
