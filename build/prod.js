const webpack = require('webpack');
const baseConfig = require('./base.js');

const prodConfig = baseConfig;
const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    comments: false,
    compress: {
      warnings: false,
      drop_console: true,
      collapse_vars: true,
      reduce_vars: true
    }
  })
];
prodConfig.plugins.push(...plugins);
module.exports = prodConfig;
