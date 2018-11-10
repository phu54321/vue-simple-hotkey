var webpackConfig = require('./webpack/base.js')

module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    reporters: ['progress'],
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity,

    files: ['test/**/*.test.js'],
    preprocessors: {
      'test/**/*.test.js': ['webpack']
    },

    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
      stats: {
        chunks: false
      }
    }
  })
}
