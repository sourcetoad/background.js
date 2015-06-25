var gulp  = require("gulp"),
    babel = require("gulp-babel"),
    rename = require("gulp-rename"),
    karma = require('karma').server;



/**
 * Compile ES6 to ES5 with Babel.js
 */
gulp.task("babel", function () {
    return gulp.src("src/background.es6.js")
        .pipe(babel())
        .pipe(rename(function(path){
            path.basename = path.basename.replace(".es6", "");
            path.extname = ".es5.js"
        }))
        .pipe(gulp.dest("dist"));
});


/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  karma.start({
    configFile: __dirname + '/test/run.js',
    singleRun: true
  }, done);
});


/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
  karma.start({
    configFile: __dirname + '/test/run.js',
  }, done);
});
