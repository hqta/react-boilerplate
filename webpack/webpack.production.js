const common         = require('./webpack.common')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const { merge }      = require('webpack-merge')

const webpackProdConfig = {
  mode: 'production'
}

common.plugins.push(
  new UglifyJSPlugin()
)

module.exports = merge(
  common,
  webpackProdConfig
)