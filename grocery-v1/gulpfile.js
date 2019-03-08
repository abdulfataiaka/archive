const gulp = require('gulp');
const LiveServer = require('gulp-live-server');
const browserSync = require('browser-sync');
const browserify = require('browserify');
const reactify = require('reactify'); 
const source = require('vinyl-source-stream');

//++ create a new task runnable from terminal
gulp.task('live-server', function() {
  const server = new LiveServer('server/index.js');
  server.start(); 
});

//++ declare a task with depenndency on live-server task
gulp.task('serve', ['bundle', 'live-server'], function() {
  browserSync.init(null, {
    proxy: 'http://localhost:7777',
    open: false,
    port: 9001
  });
});

gulp.task('bundle', ['copy'], function() {
  return browserify({
    entries: 'client/main.jsx',
    debug: true
  })
    .transform(reactify)
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./.tmp'));
});

gulp.task('copy', function() {
  gulp.src('client/styles.css')
  .pipe(gulp.dest('./.tmp'));
});
