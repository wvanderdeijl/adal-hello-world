const
    browserSync = require('browser-sync').create(),
    browserify = require('browserify'),
    historyApiFallback = require('connect-history-api-fallback'),
    exorcist = require('exorcist'),
    gulp = require('gulp'),
    ts = require('gulp-typescript'),
    gutil = require('gulp-util'),
    source = require('vinyl-source-stream'),
    wify = require('watchify');

// Static server that syncs user actions between browser clients and automatically reloads browser when any of the source files change.
gulp.task('browser-sync', () => {
    browserSync.init({
        files: ['*.html', '*.css', 'img/**/*', 'src/**/*.html'], // trigger browser reload (*.ts files are already monitored by watchify)
        // open: false, // do not start browser as that fails in docker container
        server: {
            baseDir: '.',
            middleware: [historyApiFallback()]
        }
    });
});

const watchBundler = wify(browserify('./src/app.ts', require('./browserify.conf.js')))
watchBundler.on('update', watchify);
function watchify() {
    return watchBundler.bundle()
        .on('error', function (err) {
            gutil.log(err.message);
            browserSync.notify("Browserify Error!");
            this.emit("end");
        })
        .pipe(exorcist('lib/app.js.map'))
        .pipe(source('app.js')) // target file
        .pipe(gulp.dest('lib'))
        .pipe(browserSync.stream({ once: true }));
}

gulp.task('default', gulp.series(watchify, 'browser-sync'));
