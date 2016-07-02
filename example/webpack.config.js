var eslintFriendlyFormatter = require('eslint-friendly-formatter');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    basic: [
      'webpack-dev-server/client?http://localhost:8881/',
      'webpack/hot/only-dev-server',
      './example/basic.jsx',
    ],
    form: [
      'webpack-dev-server/client?http://localhost:8881/',
      'webpack/hot/only-dev-server',
      './example/form.jsx',
    ],
    expandable: [
      'webpack-dev-server/client?http://localhost:8881/',
      'webpack/hot/only-dev-server',
      './example/expanding.jsx',
    ],
  },
  output: {
    path: __dirname,
    filename: '[name].js',
    publicPath: 'http://localhost:8881/',
    chunkFilename: '[id].chunk.js',
    sourceMapFilename: '[name].map',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.es6'],
    modulesDirectories: ['node_modules'],
  },
  module: {
    preLoaders: [
      { test: /\.jsx$/, loader: 'eslint-loader', exclude: [/node_modules/, /example/, /lib/] },
    ],
    loaders: [
      { test: /\.jsx$|\.es6$|\.js$/, loaders: ['react-hot', 'babel-loader?stage=0'], exclude: /node_modules/ },
      { test: /\.scss$|\.css$/, loader: 'style-loader!style!css!sass' },
      { test: /\.(jpe?g|png|gif)$/i, loader: 'url?limit=10000!img?progressive=true' },
    ],
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
  ],
  eslint: {
    configFile: './.eslintrc',
    fix: true,
    formatter: eslintFriendlyFormatter,
  },
  devtool: 'eval-source-map',
};
