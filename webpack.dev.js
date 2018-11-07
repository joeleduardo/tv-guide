const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

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
      "API_URL": JSON.stringify("http://localhost:1337")
    }),
  ]
});