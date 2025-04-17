process.env.NODE_ENV = 'test'

var webpackConfig = require('./webpack.config.js')

module.exports = function (config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'chai', 'sinon'],

    // list of files / patterns to load in the browser
    files: [
      { pattern: 'node_modules/babel-polyfill/dist/polyfill.js', watched: false, included: true, served: true },
      { pattern: 'node_modules/whatwg-fetch/dist/fetch.umd.js', watched: false, included: true, served: true },
      { pattern: 'spec/**/*_spec.js', type: 'module', watched: true }
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'spec/helpers/**/*.js': ['webpack'],
      'spec/**/*_spec.js': ['webpack']
    },

    webpack: {
      // karma watches the test entry points
      // (you don't need to specify the entry option)
      // webpack watches dependencies

      // webpack configuration
      mode: webpackConfig.mode,
      module: webpackConfig.module,
      resolveLoader: webpackConfig.resolveLoader,
      resolve: webpackConfig.resolve,
      externals: webpackConfig.externals,
      plugins: webpackConfig.plugins
    },

    webpackServer: {
      noInfo: true // Suppress all webpack messages, except errors
    },

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only'
    },

    plugins: [
      require('karma-chai'),
      require('karma-chrome-launcher'),
      require('karma-jasmine'),
      require('karma-sinon'),
      require('karma-webpack')
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['dots'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['ChromeHeadless'],

    customLaunchers: {
      ChromeHeadless: {
        base: 'Chrome',
        flags: [
          '--disable-web-security',
          '--headless',
          '--disable-gpu',
          '--no-sandbox',
          '--remote-debugging-port=9222'
        ]
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneously
    concurrency: Infinity
  })
}
