const webpack = require('webpack');
const baseConfig = require('./base.js');

const devConfig = baseConfig;
devConfig.devtool = 'cheap-module-eval-source-map';
devConfig.devServer = {
  port: 7000
};

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"develop"'
    }
  })
];

devConfig.plugins.push(...plugins);
module.exports = baseConfig;

