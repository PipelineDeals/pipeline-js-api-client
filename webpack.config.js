/* eslint-env node */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var externalAssets = {
  css: [
    'https://cdn.jsdelivr.net/bootstrap/3.3.7/css/bootstrap.min.css'
  ],
  js: [
    'https://cdn.jsdelivr.net/g/lodash@4.14.0,handlebarsjs@4.0.5,jquery@3.1.0,bootstrap@3.3.7,momentjs@2.14.1',
    'https://assets.zendesk.com/apps/sdk/2.0/zaf_sdk.js'
  ]
}

const isTest = (process.env.NODE_ENV === 'test')

const getPlugins = () => {
  let plugins = []

  plugins.push(new ExtractTextPlugin('main.css'))

  if (!isTest) {
    plugins.push(new HtmlWebpackPlugin({
      warning: 'AUTOMATICALLY GENERATED FROM ./lib/templates/layout.hdbs - DO NOT MODIFY THIS FILE DIRECTLY',
      vendorCss: externalAssets.css,
      vendorJs: externalAssets.js,
      template: './lib/templates/layout.hdbs'
    }))
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_debugger: false,
        warnings: false
      }
    }))
  }

  return plugins
}

const getExternals = () => {
  let externals = {
    handlebars: 'Handlebars',
    jquery: 'jQuery',
    lodash: '_',
    moment: 'moment',
    zendesk_app_framework_sdk: 'ZAFClient'
  }

  if (isTest) {
    externals['cheerio'] = 'window'
    externals['react/addons'] = true
    externals['react/lib/ExecutionEnvironment'] = true
    externals['react/lib/ReactContext'] = true
  }

  return externals
}

module.exports = {
  progress: true,
  entry: {
    app: ['babel-polyfill', './src/javascripts/index.js', './src/stylesheets/app.scss']
  },
  output: {
    path: './dist/assets',
    filename: 'main.js',
    sourceMapFilename: '[file].map'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style", ["css?sourceMap", "sass?sourceMap"])
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-object-rest-spread']
        }
      },
      {
        test: /\.(handlebars|hd?bs)$/,
        loader: 'handlebars-loader',
        query: {
          extensions: ['handlebars', 'hdbs', 'hbs'],
          runtime: 'handlebars'
        }
      }
    ]
  },
  resolveLoader: {
    modulesDirectories: [ './lib/loaders', 'node_modules' ]
  },
  resolve: {
    modulesDirectories: [ 'node_modules', './lib/javascripts' ],
    alias: {
      'app_manifest': path.join(__dirname, './dist/manifest.json')
    },
    extensions: ['', '.js']
  },
  externalAssets: externalAssets,
  externals: getExternals(),
  devtool: '#eval',
  plugins: getPlugins()
};
