const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

var includePaths = [
  fs.realpathSync(__dirname),
  fs.realpathSync(__dirname + '/shared'),
];

module.exports = {
  entry: path.join(__dirname, 'index.js'),
  output: {
    path: 'dist',
    filename: 'app.js',
    //publicPath: outputPublicPath,
    //chunkFilename: outputChunkFilename,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: includePaths,
        exclude: /(node_modules)/,
        loader: 'babel',
      }, {
        test: /\.css$/,
        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss',
      }, {
        test: /\.(png|jpg|svg)$/,
        loader: `file`,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body',
    }),
  ],
}
