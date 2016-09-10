module.exports = {
  entry: './static/js/index.js',
  output: {
    path: __dirname,
    publichPath: '/static/',
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
        loader: 'style!css'
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
}
