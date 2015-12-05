var source = "static_source";
var pub = "public";
var tmp = "tmp";

module.exports = {
    build_lib_js: {
        filename: 'lib.min.js',
        paths: {
            bowerDirectory: source + '/bower_components',
            bowerrc: source + '/.bowerrc',
            bowerJson: source + '/bower.json'
        },
        dest: source + '/js'
    },
    build_coffee_js: {
        filename: 'app.min.js',
        source: [
            source + "/app/app_bpmn.coffee",
            source + "/app/app.coffee",
            source + "/app/services/**/*.coffee",
            source + "/app/directives/**/*.coffee",
            source + "/app/controllers/**/*.coffee"
        ],
        watch: source + "/app/**/*.coffee",
        dest: source + '/js'
    },
    build_lib_css: {
        filename: 'lib.min.css',
        paths: {
            bowerDirectory: source + '/bower_components',
            bowerrc: '/.bowerrc',
            bowerJson: source + '/bower.json'
        },
        dest: source + '/css'
    },
    build_less: {
        filename: 'app.min.css',
        source: [
            source + '/less/bootstrap.less',
            source + '/less/bootstrap-theme.less',
            source + '/less/app.less',
            source + '/less/app_bpmn.less'
        ],
        dest: source + '/css',
        watch: source + '/less/**/*.less'
    },
    webserver: {
        root: [ source + '/templates', source],
        livereload: true,
        port: 8088,
        fallback: 'static_source/index.html',
        watch: [
            'static_source/js/*.js',
            'static_source/css/*.css'
        ]
    },
    build_haml: {
        source: 'static_source/templates/**/*.haml',
        tmp: 'static_source/tmp/templates',
        watch: [
            "static_source/templates/**/*.haml"
        ]
    },
    build_templates: {
        filename: "templates.min.js",
        prefix: '/templates/',
        source: 'static_source/tmp/templates/**/*',
        watch: [
            'static_source/tmp/templates/**/*'
        ],
        dest: 'static_source/js'
    },
    build_engine_js: {
        filename: 'angular-bpmn.js',
        source: [
            source + "/app/app_bpmn.coffee",
            source + "/app/directives/**/*.coffee",
            source + "/app/services/**/*.coffee",
            "!" + source + "/app/services/prevent_selection.coffee",
            "!" + source + "/app/services/scheme_service.coffee"
        ],
        dest: './dist/'
    },
    build_engine_css: {
        filename: 'angular-bpmn.css',
        source: [
            source + '/less/app_bpmn.less'
        ],
        dest: './dist/'
    },
    theme_less: {
        filename: 'style.css',
        watch: source + '/themes/**/*.less',
        default: {
            source: [
                source + '/themes/default/**/*.less'
            ],
            dest: source + '/themes/default'
        },
        minimal: {
            source: [
                source + '/themes/minimal/**/*.less'
            ],
            dest: source + '/themes/minimal'
        }
    }
};
