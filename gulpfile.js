var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var wiredep = require('wiredep').stream;
var notify = require("gulp-notify");
var browserSync = require('browser-sync');
var htmlmin = require('gulp-htmlmin');
var inlinesource = require('gulp-inline-source');
var uncss = require('gulp-uncss');

gulp.task('styles', function(){
  var injectAppFiles = gulp.src('src/styles/*.scss', {read: false});
  var injectGlobalFiles = gulp.src('src/global/*.scss', {read: false});

  function transformFilepath(filepath) {
    return '@import "' + filepath + '";';
  }

  var injectAppOptions = {
    transform: transformFilepath,
    starttag: '// inject:app',
    endtag: '// endinject',
    addRootSlash: false
  };

  var injectGlobalOptions = {
    transform: transformFilepath,
    starttag: '// inject:global',
    endtag: '// endinject',
    addRootSlash: false
  };

  return gulp.src('src/main.scss')
    .pipe(wiredep())
    .pipe(inject(injectGlobalFiles, injectGlobalOptions))
    .pipe(inject(injectAppFiles, injectAppOptions))
    .pipe(sass())
//     .pipe(uncss({
//             html: ['src/*.html'],
//             ignore : [ /\.affix/,
//                       /\.alert/,
//                       /\.close/,
//                       /\.collapse/,
//                       /\.collapse\.in/,
//                       /\.collapsing/,
//                       /\.fade/,
//                       /\.fade\.in/,
//                       /\.has/,
//                       /\.help/,
//                       /\.in/,
//                       /\.modal/,
//                       /\.open/,
//                       /\.popover/,
//                       /\.tooltip/,
//                       /\.tab-pane/,
//                       /\.tab-pane\.active/,
//                       /\.active/,
//                       /\.js-tabcollapse-panel-body/,
//                       /\.on/,
//                       /\.shown/,
//                       /\.bs/,
//                       /\.panel-body/,
//                       /\.show-tabs/,
//                       /\.tabcollapse/,
//                       /\.parentLi/,
//                       /\.dropdown-menu/,
//                       /\.collapsed/,
//                       /\.tabpane/,
//                       /\.tab-content/,
//                       /\.panel-collapse/,
//                       /\.hidden-xs/,
//                       /\.accordion/,
//                       /\.shown-accordion/,
// /\.js-tabcollapse-panel-heading/],
//             }))

    // When inline injection is turned on, you'll want to switcht this back on
    //.pipe(gulp.dest('src/compiled-css'));
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('html', ['styles'], function(){
 
  return gulp.src('src/index.html')
    // This inlines the css
    // .pipe(inlinesource())
    
    // This minifies html output. Comment it out to switch it off.
    // .pipe(htmlmin({
    //   collapseWhitespace: true,
    //   minifyCSS: true,
    //   minifyJS: true,
    //   removeComments: true,
    //   useShortDoctype: true
    // }))
    
    .pipe(gulp.dest('dist'))
    .pipe(notify({
      title: "SASS Compiled",
      message: "All SASS files have been recompiled to CSS and you are a rockstar!.",
      sound: 'Submarine',
      onLast: true
    }))
});

gulp.task('html-watch', ['html'], browserSync.reload);
gulp.task('sass-watch', ['styles'], browserSync.reload);

gulp.task('default', function () {
  browserSync({
      server: {
        baseDir: 'dist/'
      }
  });
  gulp.watch('src/styles/*.scss', ['sass-watch']);
  gulp.watch('src/*.html', ['html-watch']);
});