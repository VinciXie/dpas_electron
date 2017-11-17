const webpack = require('webpack');
const path = require('path');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');

var port = 9000;

const config = {
  devtool: 'cheap-module-eval-source-map',

  context: path.join(__dirname, 'src'),

  entry: {
    local: './index.js',
    // vendor: ['react', 'react-dom']
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'build/[name]-[hash:6].js',
  },

  module: {
    rules: [

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },

      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
                sourceMap: true
            }
          }
        ]
      },

    ]
  },

  // externals: {
  //   react: 'react',
  //   'react-dom': 'react-dom',
  // },

  resolve: {
    modules: ["node_modules"],
    mainFiles: ["index"]
  },

  plugins: [
    // new CommonsChunkPlugin({
    //   name: 'vendor',
    // }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./dll/manifest.json'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: "'development'"
      }
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'index.html',
      filename: 'index.html'
    }),
    // new DashboardPlugin({ port: port }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: port,
  }
}


module.exports = config;
