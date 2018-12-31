const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = [{
  entry: {
    main:['@babel/polyfill','./src/main.js']
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'public')
  },
 optimization: {
   splitChunks: {
     chunks: 'all'
   }
 },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {}
      }
    },
    {
      test: /\.scss$/,
      use: [
        "style-loader",
        MiniCssExtractPlugin.loader,
        "css-loader",
        "sass-loader"
      ]
    },
    {
      test: /\.html$/,
      include: [
        path.resolve(__dirname, "app/components")
      ],
      use: {
        loader: 'html-loader',
        options: {}
      }
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: 'src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "styles.[contenthash].css",
    }),
    // new CopyWebpackPlugin([{
    //     from: 'src/data/',
    //     to: 'data/[name].[ext]',
    //     toType: 'template'
    //   },{
    //       from: 'src/styles/',
    //       to: 'styles/[name].[ext]',
    //       toType: 'template'
    //     }
    // ], {})
  ]
}];
