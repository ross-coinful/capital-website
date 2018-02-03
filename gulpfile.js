// general
var gulp = require('gulp');

var runSequence = require('run-sequence');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');
var filter = require('gulp-filter');
var concat = require('gulp-concat');
var path = require('path');
// var replace = require('gulp-replace');

// ejs
var removeEmptyRegex = />\s+</g;
var removeArrowEmptyBegin = />\s/g;
var removeArrowEmptyEnd = /\s</g;

// svg
// var svgSprite = require('gulp-svg-sprite');

// images
// var imagemin = require('gulp-imagemin');
// var imageminPngcrush = require('imagemin-pngcrush');

// reload
// var reload = browserSync.reload;

// postcss
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var precss = require('precss'); // like sass, have nested, mixin, extend
var calc = require('postcss-calc'); // reduce calc() references
var assets = require('postcss-assets'); // image-size, inline file
var comments = require('postcss-discard-comments');
var stripInlineComments = require('postcss-strip-inline-comments');
var postscss = require('postcss-scss');

// path
var rootPath = path.resolve(__dirname, 'design');
var destPath = path.resolve(__dirname, 'src/style');

var filefolder = {
  // img: {
  //   all: [rootPath + '/img/**/*'],
  //   compress: [
  //     rootPath + '/img/**/*.png',
  //     rootPath + '/img/**/*.jpg',
  //     rootPath + '/img/**/*.gif',
  //     rootPath + '/img/**/*.svg',
  //     '!' + rootPath + '/img/png-sprite/**/*',
  //     '!' + rootPath + '/img/png-sprite-2x/**/*',
  //     '!' + rootPath + '/img/svg-sprite/**/*',
  //   ],
  //   svg: {
  //     sprite: rootPath + '/img/svg-sprite/**/*.svg',
  //     temp: rootPath + '/svgSpriteTemp/',
  //   },
  //   move: [
  //     rootPath + '/img/**/*.svg',
  //     rootPath + '/img/**/*.ico',
  //     '!' + rootPath + '/img/svg-sprite',
  //   ],
  // },
  // css: {
  //   all: [rootPath + '/css/**/*.css'],
  //   move: [],
  //   bundle: [
  //     rootPath + '/css/global/normalize.css',
  //     rootPath + '/css/fonts.css',
  //     rootPath + '/main.css'
  //   ],
  // },
  postcss: rootPath + '/postcss/**/*.css',
  sass: rootPath + '/sass/**/*.{sass, scss}',
  font: rootPath + '/font/**/*',
};

// postcss
gulp.task('postcss', function() {
  var plugins = [
    precss({ nesting: { disable: true } }),
    calc(),
    assets({
      basePath: 'design',
      relative: 'css',
      loadPaths: ['img/'],
    }),
    autoprefixer({
      browsers: [
        '> 2%',
        'last 2 versions',
        'ie >= 10',
      ],
    }),
    comments(),
    stripInlineComments(),
  ];

  return gulp.src(filefolder.postcss)
    .pipe(plumber())
    .pipe(filter(function(file) {
      return !/_.*\.css$/.test(file.path);
    }))
    .pipe(postcss(plugins, { syntax: postscss }))
    .pipe(gulp.dest(destPath))
});

gulp.task('postcss-watch-move', function(cb) {
  watch(filefolder.postcss, function(e) {
    gulp.run(['clean-css-folder']);
  });

  cb();
});

// css
gulp.task('clean-css-folder', ['postcss'], function() {

  return gulp.src(destPath)
    .pipe(plumber())
    .pipe(filter(['*', `!src/style/main.css`], {'restore': true}))
    .pipe(clean());
});

// fonts
gulp.task('move-font', function() {

  return gulp.src(filefolder.font)
    .pipe(plumber())
    .pipe(gulp.dest(destPath + '/font'));
});

// gulp task scripts
gulp.task('design', ['postcss-watch-move']);