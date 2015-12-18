var gulp = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('default', function(cb) {
    runSequence(
        'build_lib_js',
        'build_coffee_js',
        ['build_haml', 'build_templates'],
        ['build_engine_js', 'build_engine_css'],
        ['default_theme_less','minimal_theme_less', 'orange_theme_less'],
        'build_lib_css',
        'build_less',
        'webserver',
        'watch'
    );
});

gulp.task('pack', function(cb) {
    runSequence(
        'build_lib_js',
        'build_coffee_js',
        ['build_haml', 'build_templates'],
        ['build_engine_js', 'build_engine_css'],
        ['default_theme_less','minimal_theme_less', 'orange_theme_less'],
        'build_lib_css',
        'build_less'
    );
});
