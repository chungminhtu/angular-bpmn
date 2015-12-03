var gulp = require('gulp'),
    conf_js = require('../config').build_engine_js,
    concat = require('gulp-concat'),
    inject = require('gulp-inject'),
    coffee = require('gulp-coffee'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util');

gulp.task('build_engine_js', function(done) {
    return gulp.src(conf_js.source)
        .pipe(coffee({bare: true})
            .on('error', done))
        .pipe(concat(conf_js.filename))
        .pipe(gulp.dest(conf_js.dest));

});

var conf_css = require('../config').build_engine_css,
    less = require('gulp-less');

gulp.task('build_engine_css', function() {
    return gulp.src(conf_css.source)
        .pipe(concat(conf_css.filename))
        .pipe(less())
        .on('error', function(err){
            gutil.log(err);
            this.emit('end');
        })
        .pipe(gulp.dest(conf_css.dest));
});