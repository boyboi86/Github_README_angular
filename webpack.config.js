const path = require('path');
const webpack = require('webpack');
const debug = process.env.NODE_ENV !== "production";


module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: 'bundle.js'
  },
  devtool: debug ? "inline-sourcemap" : null,
  module: {
    loader: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['angular']
      }
    },
    {
      test: /\.css$/,
      loader: "style-loader!css-loader"
     }]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: 'src'
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
    mangle: {except: ['$', 'exports', 'require', 'app']},
    compress: {warnings: false},
    sourceMap: false
  })
  ]
}
