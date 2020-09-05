const path              = require('path')
const webpackConfigPath = path.resolve(__dirname, 'webpack')

module.exports = (env = process.env.NODE_ENV) => {
  return require(`${webpackConfigPath}/webpack.${env}.js`)
}