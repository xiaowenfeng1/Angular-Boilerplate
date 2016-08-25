/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    /**
     * The `build_dir` folder is where our projects are compiled during
     * development and the `compile_dir` folder is where our app resides once it's
     * completely built.
     */
    appName: 'boilerplate-UI',
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
        js: ['src/app/app.js', '!src/**/*.spec.js', 'src/components/**/*.js'],
        tpl: ['src/components/directives/**/*.html'],
        views:['src/views/**/*.html'],
        html: ['src/index.html'],
        less: ['src/less/*.less'],
        assets: ['src/assets/**'],
        images: ['src/assets/images/**/*'],
        config: ['config/**/*']
    },
    vendor_files: {
        js: [
            'src/lib/jquery.min.js',
            'src/lib/bootstrap.min.js',
            'src/lib/angular.js',
            'src/lib/ui-bootstrap-tpls.js',
            'src/lib/angular-aria.js',
            'src/lib/angular-translate.min.js',
            'src/lib/angular-translate-loader-static-files.min.js',
            'src/lib/angular-sanitize.min.js',
            'src/lib/angular-ui-router.min.js'
        ]
    }
};
