const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Title',
      template: '/src/template.html',
    }),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};
