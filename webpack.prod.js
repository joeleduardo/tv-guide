//const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
//const Dotenv = require('dotenv');

//const env = Dotenv.config().parsed;

module.exports = merge(common, {
  mode: 'production',
  /*output: {
    publicPath: `https://joeleduardo.github.io${env.PUBLIC_URL}/`
  },
  plugins: [
    new webpack.DefinePlugin({
      'API_URL': JSON.stringify(env.API_URL),
      'PUBLIC_URL': JSON.stringify(env.PUBLIC_URL)
    })
  ]*/
});