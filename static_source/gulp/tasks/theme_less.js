var gulp = require('gulp'),
    conf = require('../config').theme_less,
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    gutil = require('gulp-util');

gulp.task('default_theme_less', function() {
    return gulp.src(conf.default.source)
        .pipe(concat(conf.filename))
        .pipe(less())
        .on('error', function(err){
            gutil.log(err);
            this.emit('end');
        })
        .pipe(gulp.dest(conf.default.dest));
});

gulp.task('minimal_theme_less', function() {
    return gulp.src(conf.minimal.source)
        .pipe(concat(conf.filename))
        .pipe(less())
        .on('error', function(err){
            gutil.log(err);
            this.emit('end');
        })
        .pipe(gulp.dest(conf.minimal.dest));
});