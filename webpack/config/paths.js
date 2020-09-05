const path     = require('path')
const basePath = './../../'

const dist        = path.resolve(__dirname, basePath, 'dist')
const src         = path.resolve(__dirname, basePath, 'src')
const public      = path.resolve(__dirname, basePath, 'public')
const nodeModules = path.resolve(__dirname, basePath, 'node_modules')

module.exports = {
  dist,
  src,
  public,
  nodeModules
}