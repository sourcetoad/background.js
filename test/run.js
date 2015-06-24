module.exports = function(config) {
    config.set({
        basePath: '../',
        frameworks: ['browserify', 'jasmine'],
        files: [
            'src/background.es6.js',
            'test/background.es6.spec.js'
        ],
        preprocessors: {
            'src/background.es6.js': ['browserify'],
            'test/background.es6.spec.js': ['browserify']
        },
        browserify: {
            debug: true,
            transform: [ 'babelify' ]
        },
        browsers: ['PhantomJS'],
        plugins: [
            require('karma-browserify'),
            require('karma-jasmine'),
            require('karma-phantomjs-launcher'),
            require('babelify')
        ]
    });
};