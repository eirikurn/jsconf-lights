const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, 'index.js'),
  // output: {
  //   path: outputPath,
  //   filename: outputFilename,
  //   publicPath: outputPublicPath,
  //   chunkFilename: outputChunkFilename,
  // },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|createjs)/,
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
