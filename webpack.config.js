const path = require('path');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname,'/src'),
    filename: 'bundle.js'
  },
  module: {
    loader: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['angular']
      }
    }]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: 'src'
  }
};
