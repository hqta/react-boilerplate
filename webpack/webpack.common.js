const webpack                = require('webpack')
const path                   = require('path')
const HtmlWebpackPlugin      = require('html-webpack-plugin')
const MiniCSSExtractPlugin   = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const IconfontWebpackPlugin  = require('iconfont-webpack-plugin')
const configPaths            = require('./config/paths')
const constants              = require('./config/constants')
const modules                = require('./config/modules')

const production = process.env.NODE_ENV === 'production'
const ASSET_PATH = process.env.ASSET_PATH || '/'

const dotenv = require('dotenv').config({
  path: path.resolve(__dirname, '.env')
})

module.exports = {
  entry:        path.resolve(configPaths.src, 'app'),
  output:       {
    path:       configPaths.dist,
    filename:   'js/[name].bundle.js',
    publicPath: ASSET_PATH,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCSSExtractPlugin({
      filename:      '[name].css',
      chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(configPaths.public, 'index.html'),
      title:    constants.title,
      hash:     true,
      minify:   false,
      filename: './index.html',
      // favicon: path.resolve(configPaths.public, 'favicon.ico')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        ...dotenv.parsed,
        NODE_ENV:   JSON.stringify(process.env.NODE_ENV),
        ASSET_PATH: JSON.stringify(process.env.ASSET_PATH)
      }
    })
  ],
  module: {
    rules: [
      {
        test:    /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use:     ['babel-loader']
      },
      {
        test: [/.css$|.scss$/],                
        use: [
          {
            loader: production ? MiniCSSExtractPlugin.loader : 'style-loader'
          },
          {
            loader:  'css-loader',
            options: {
              importLoaders: 1,
              sourceMap:     !production,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: !production,
              plugins:  (loader) => [
                require('autoprefixer')({}),
                require('cssnano')({ preset: 'default' }),
                new IconfontWebpackPlugin(loader),
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !production
            }
          }
        ]  
      },
      {
        test:   /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name:       '[name].[ext]',
          outputPath: 'assets/'
        }
      }
    ]
  },
  resolve: {
    alias: {
      '~':          configPaths.nodeModules,
      'Views':      path.resolve(configPaths.src, 'views'),
      'Components': path.resolve(configPaths.src, 'components'),
      'Styles':     path.resolve(configPaths.src, 'styles'),
      'Images':     path.resolve(configPaths.src, 'assets/images'),
    },
    extensions: ['.ts', '.tsx', '.js']
  },
  target: 'web',
  optimization: {
    minimize: false,
    splitChunks:  {
      cacheGroups:  {
        default: false,
        vendors: false,
        react: {
          test:     new RegExp(`[\\/]node_modules[\\/](${modules.react.join('|')})[\\/]`),
          name:     'react',
          chunks:   'all',
          priority: 999,
          enforce:  true
        },
        vendor: {
          test:     /node_modules/,
          name:     'vendor',
          chunks:   'all',
          priority: 10,
          enforce:  true
        }
      }
    }
  }
}