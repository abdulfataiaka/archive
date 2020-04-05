const gulp = require('gulp');
const exec = require('child_process').exec;

function build(cb) {
    exec('npm run build', function(err, stdout, stderr) {
        if (err) {
            console.log(stderr);
            cb(err); 
        } else {
            console.log(stdout);
            cb();
        }
    });
}

function watchAndbuild(cb) {
    build(cb);
    gulp.watch('src', build);
}

exports.default = watchAndbuild;
