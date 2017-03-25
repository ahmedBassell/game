module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'main.js',
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: [/node_modules/],
      },
      {
        test: /\.jsx$/,
        loader: 'babel',
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style!css',
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'html-loader',
      }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
};