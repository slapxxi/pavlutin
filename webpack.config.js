module.exports = {
  entry: './src/js/index.js',
  output: {
    path: '/static/js/',
    publichPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {presets: ['react', 'es2015', 'stage-1']}
      },
      {
        exclude: /node_modules/,
        test: /\.css$/,
        loader: 'style-loader!css-loader!postcss-loader'
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  postcss: function() {
    return [require('autoprefixer'), require('precss')({import: {extension: 'scss'}})]
  }
}
