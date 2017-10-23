const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

const webpackConfig = {
  target: 'web',
  profile: true,
  entry: {
    react: path.join(__dirname, '../src/index.jsx')
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.scss', '.css', '.html', '.jsx'],
    alias: {
      jquery: path.resolve(__dirname, '../node_modules/jquery/src/jquery.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        options: {
          // 添加 ES6， react 语法支持
          presets: ['es2015', 'react'],
          //
          // // 在开发环境才启用 HMR 和 Catch Error
          // env: {
          //   development: {
          //     presets: ['react-hmre']
          //   }
          // }
        },
        exclude: /node_modules/
      },
      {
        test: /\.jsx$/,
        enforce: 'pre',
        use: {
          loader: 'eslint-loader',
          options: {
            fix: true
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['syntax-dynamic-import']
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader!postcss-loader',
          fallback: 'style-loader'
        })
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader!postcss-loader!sass-loader?sourceMap',
          fallback: 'style-loader'
        })
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: 'html-loader'
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: 'json-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 2048,
            name: './images/[name].[ext]'
          }
        }
      },
      {
        test: /\.woff|\.woff2|\.svg|\.eot|\.ttf/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 2048,
            name: './fonts/[name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: 2
    }),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, '../dist/index.html'),
      // favicon: path.join(__dirname, '../logo.png'),
      template: path.join(__dirname, '../src/react.html'),
      chunks: ['vendor', 'react'],
      inject: 'body',
      chunksSortMode: 'manual',
      hash: true
    }),
    new ExtractTextPlugin('[name].css')
  ]
}

module.exports = webpackConfig
