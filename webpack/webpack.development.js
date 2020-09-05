const webpack     = require('webpack')
const { merge }   = require('webpack-merge')
const common      = require('./webpack.common')
const constants   = require('./config/constants')

const webpackDevConfig = {
  mode: 'development',
  devServer: {
    contentBase: './dist',
    port:    constants.port,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}

common.plugins.push(
  new webpack.HotModuleReplacementPlugin() 
)

module.exports = merge(
  common,
  webpackDevConfig
)