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
        loader: 'babel-loader',
        exclude: [/node_modules/],
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        presets: ['es2015', 'react'],
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