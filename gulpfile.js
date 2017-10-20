var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var wiredep = require('wiredep').stream;
var notify = require("gulp-notify");
var browserSync = require('browser-sync');
var htmlmin = require('gulp-htmlmin');
var inlinesource = require('gulp-inline-source');
var uncss = require('gulp-uncss');
var sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
var del = require('del');

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
  .pipe(sourcemaps.init())
    .pipe(wiredep())
    .pipe(inject(injectGlobalFiles, injectGlobalOptions))
    .pipe(inject(injectAppFiles, injectAppOptions))
    .pipe(sass())
    .pipe(uncss({
            html: ['src/*.html'],
            ignore : [  // These support basic bootstrap functions
                        /\.affix/,
                        // /\.alert/,
                        /\.close/,
                        /\.collapse/,
                        /\.fade/,
                        /\.has/,
                        // /\.help/,
                        /\.in/,
                        /\.modal/,
                        /\.open/,
                        // /\.popover/,
                        // /\.tooltip/,
                        // These support tab-collapse.js
                        /\.visible-xs/,
                        /\.hidden-xs/,
                        /.panel.*/
                        ],
            }))
    .pipe(autoprefixer('last 5 versions', 'ie >= 8'))
    // When inline injection is turned on, you'll want to switcht this back on
    // .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/compiled-css'));
    // .pipe(gulp.dest('dist/styles'));
});

gulp.task('html', ['styles', 'copy-images', 'copy-favicons', 'copy-javascript'], function(){
 
  return gulp.src('src/index.html')
   
    
    //This minifies html output. 
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      //removeComments: true,
      //useShortDoctype: true
    }))
     // This inlines the css
    .pipe(inlinesource())
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

//copies images from sourc to dist
gulp.task('copy-images', function () {
    gulp.src('src/assets/images/*')
        .pipe(gulp.dest('dist/images'));
});

//copies favicons from sourc to dist
gulp.task('copy-favicons', function () {
    gulp.src('src/assets/favicons/*')
        .pipe(gulp.dest('dist'));
});

//copies js from sourc to dist
gulp.task('copy-javascript', function () {
    gulp.src('src/assets/javascript/*')
        .pipe(gulp.dest('dist/js'));
});

//deletes everything in the dist folder before rebuilding
gulp.task('clean', function(cb){
  del(['dist'], cb);
});