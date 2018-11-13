const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv');

const env = Dotenv.config().parsed;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'API_URL': JSON.stringify(env.API_URL),
      'PUBLIC_URL': JSON.stringify('/')
    }),
  ]
});