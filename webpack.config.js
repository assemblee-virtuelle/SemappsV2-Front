const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const filewatcherPlugin = require("filewatcher-webpack-plugin");

// the path(s) that should be cleaned
let pathsToClean = [
  'dist',
  'build'
]

// the clean options to use
let cleanOptions = {
  //root:     '/full/webpack/root/path',
  exclude:  ['shared.js'],
  verbose:  true,
  dry:      false
}

// sample WebPack config
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
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
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
    },
    {
      test: /\.(png|jp(e*)g|svg)$/,  
      use: [{
        loader: 'url-loader',
        options: { 
          limit: 8000, // Convert images < 8kb to base64 strings
          name: 'images/[hash]-[name].[ext]'
        } 
      }]
    }]
  },
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    //new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      template: 'src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "styles.[contenthash].css",
    }),
    new filewatcherPlugin({
      watchFileRegex: ['src/**/*.js', 'src/**/*.html'], 
      onReadyCallback: () => console.log('Yo Im ready'),
      usePolling: false,
      ignored: '/node_modules/'
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
  ],
}];
