const webpack = require('webpack');
const path = require('path');
const CommonsChunkPlugin = require('webpack/libn/optimize/CommonsChunkPlugin');

const config = {
  devtool: 'inline-source-map',

  entry: {
    local: './app/index.js',
    vendor: ['react', 'react-dom']
  },

  output: {
    path: path.join(__dirname, 'app'),
    filename: '[name].js',
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

  plugins: [
    new CommonsChunkPlugin({
      name: 'vendor',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: "'development'"
      }
    }),
  ]

}


module.exports = config;
