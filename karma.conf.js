// Karma configuration
// Generated on Mon Mar 28 2022 16:59:05 GMT+0800 (中国标准时间)
const webpackConfig =  require('./webpack.test.config')

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: ['mocha', 'chai'],


    // list of files / patterns to load in the browser
    files: [
      'test/**/*.js'
    ],


    // list of files / patterns to exclude
    exclude: [
    ],
    webpack: webpackConfig,

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
    preprocessors: {
      'src/**/*.js': ['babel'],
      'test/**/*.js': ['babel'],
    },
    // babelPreprocessor: {
    //   options: {
    //     presets: ['@babel/preset-env'],
    //     sourceMap: 'inline'
    //   },
    //   filename: function (file) {
    //     return file.originalPath.replace(/\.js$/, '.js');
    //   },
    //   sourceFileName: function (file) {
    //     return file.originalPath;
    //   }
    // },
    plugins: [
      'karma-babel-preprocessor',
      'karma-mocha',
      'karma-chai',
      'karma-chrome-launcher'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ['progress'],


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
    // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser instances should be started simultaneously
    concurrency: Infinity
  })
}
