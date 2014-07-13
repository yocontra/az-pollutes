var gulp = require('gulp');
var lr = require('gulp-livereload');
var gif = require('gulp-if');
var lr = require('gulp-livereload');
var cached = require('gulp-cached');
var uglify = require('gulp-uglify');
var stylus = require('gulp-stylus');
var csso = require('gulp-csso');
var nib = require('nib');
var jeet = require('jeet');
var autoprefixer = require('autoprefixer-stylus');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var deploy = require('gulp-gh-pages');

var globs = {
  js: ['data/**/*', 'src/js/**/*.js'],
  css: 'src/css/**/*.styl',
  static: ['src/**/*', '!src/css/**/*.styl', '!src/js/script.js']
};

gulp.task('watch', function(){
  gulp.watch(globs.css, ['css']);
  gulp.watch(globs.js, ['js']);
  gulp.watch(globs.static, ['static']);
});

gulp.task('deploy', function () {
  return gulp.src('./dist/**/*')
    .pipe(deploy());
});

gulp.task('static', function(){
  return gulp.src(globs.static)
    .pipe(cached('build'))
    .pipe(gif('*.js', uglify()))
    .pipe(gif('*.css', csso()))
    .pipe(gulp.dest('dist'))
    .pipe(lr());
});

gulp.task('js', function(){
  return browserify('./src/js/script.js')
    .bundle()
    .pipe(source('script.js'))
    .pipe(buffer())
    .pipe(cached('js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(lr());
});

gulp.task('css', function(){
  return gulp.src('src/css/**/*.styl')
    .pipe(cached('css'))
    .pipe(stylus({
      use:[
        nib(),
        jeet(),
        autoprefixer()
      ]
    }))
    .pipe(csso())
    .pipe(gulp.dest('dist/css'))
    .pipe(lr());
});

gulp.task('default', ['css', 'js', 'static', 'watch']);