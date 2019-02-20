const path = require('path');
const webpack = require('webpack');

const config = {
  entry: {
    app: './src/index.js',
    sw: './src/serviceworker.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: '[name].js'
  },
  devServer: {
    contentBase: './dist',
    host: '0.0.0.0',
    hot: true
  }
};
module.exports = (env, argv) => {
  if (argv.mode !== 'production') {
    config.plugins = [
      new webpack.HotModuleReplacementPlugin()
    ];
  }
  return config;
};

