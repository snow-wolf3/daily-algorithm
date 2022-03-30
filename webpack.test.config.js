var path = require("path")
var webpack = require("webpack")

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

var webpackConfig = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
    ]
  },

  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('src'),
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ]
}

module.exports = webpackConfig
