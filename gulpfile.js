// grab our packages
var gulp   = require('gulp'),
    eslint = require('gulp-eslint'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    cleanCss = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    wiredep = require('wiredep').stream;

// define the default task and add the watch task to it
gulp.task('default', ['tasks', 'watch', 'bower']);

gulp.task('tasks', ['lintTask', 'scripts', 'stylesheets', 'bower']);

gulp.task('bower', function() {
    gulp.src('./views/index.html')
        .pipe(wiredep({}))
        .pipe(gulp.dest('./public'));
    gulp.src('./bower_components/**/*')
        .pipe(gulp.dest('./public/bower_components'));
});

gulp.task('lint', () => {
    return gulp.src('src/js/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('watch', function() {
    gulp.watch('src/js/**/*.js', ['lintTask']);
    gulp.watch('src/scss/**/*.scss', ['stylesheets']);
});

gulp.task('lintTask', ['lint', 'scripts'], function(){
    gutil.log('Success!');
});

// gulp.task('scripts', function() {
//     gulp.src('src/**/*.js')
//       .pipe(concat('script.js'))
//       .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
//       .pipe(gulp.dest('dist/'));
// });

gulp.task('scripts', function() {
    gutil.log(gutil.env.env);
    return gulp.src('src/js/**/*.js')
      .pipe(concat('main.js'))
      .pipe(gutil.env.env === 'production' ? rename({suffix: '.min'}) : gutil.noop())
      .pipe(gutil.env.env === 'production' ? uglify() : gutil.noop())
      .pipe(gulp.dest('public/javascripts'))
      .pipe(gutil.env.env === 'local' ? notify({ message: 'Scripts Task Done' }) : gutil.noop());
});

gulp.task('stylesheets', function() {
    return gulp.src('src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write())
    .pipe(gutil.env.env === 'production' ? cleanCss() : gutil.noop())
    .pipe(gulp.dest('public/stylesheets'))
    .pipe(gutil.env.env === 'local' ? notify({ message: 'Stylesheets Task Done' }) : gutil.noop());
});
