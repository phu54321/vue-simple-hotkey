var webpackConfig = require('./webpack/base.js')

module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    reporters: ['progress'],
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    concurrency: Infinity,

    files: [
      'node_modules/@babel/polyfill/dist/polyfill.js',
      'test/**/*.test.js'
    ],
    preprocessors: {
      'test/**/*.test.js': ['webpack', 'sourcemap']
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
