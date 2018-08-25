const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  plugins:[
    new CopyWebpackPlugin([
      { from: 'src/styles.css', to: '[name].[ext]', toType: 'template' },
      { from: 'src/scss/*.*', to: '[name].[ext]', toType: 'template' },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader'
      },
    ]
  },
  externals: {
    react: {
      commonjs2: "react",
      root: "React"
    },
    "react-dom": {
      commonjs2: "react-dom",
      root: "ReactDOM"
    }
  }
};
