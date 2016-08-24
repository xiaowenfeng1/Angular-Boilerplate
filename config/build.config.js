/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    /**
     * The `build_dir` folder is where our projects are compiled during
     * development and the `compile_dir` folder is where our app resides once it's
     * completely built.
     */
    appName: 'starter-project',
    build_dir: 'build',
    compile_dir: 'bin',
    now: new Date().getTime(),

    /**
     * This is a collection of file patterns that refer to our app code (the
     * stuff in `src/`). These file paths are used in the configuration of
     * build tasks. `js` is all project javascript. `tpl` contains
     * our directives template HTML files
     *  `html` is just our main HTML file, `less` is our stylesheet dir
     */

    app_files: {
        all_files: ['src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js'],
        js: ['app.js', '!src/**/*.spec.js', 'src/**/*.js'],
        tpl: ['src/directives/**/*.html'],
        html: ['src/index.html'],
        less: ['src/assets/less/*.less'],
        assets: ['src/assets/**', '!assets/less/'],
        images: ['src/assets/images/**/*'],
        config: ['config/**/*']
    },
    vendor_files: {
        js: [
            'lib/jquery.min.js',
            'lib/bootstrap.min.js',
            'lib/angular.js',
            'lib/ui-bootstrap-tpls.js',
            'lib/angular-aria.js',
            'lib/angular-translate.min.js',
            'lib/angular-translate-loader-static-files.min.js',
            'lib/angular-sanitize.min.js'
        ]
    }
};
