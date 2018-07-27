const gulp = require("gulp")
const concat = require("gulp-concat")
const sass = require("gulp-sass")

/*
gulp.task('build', function () {
    return gulp
      .src('./src/index.js')
      .pipe(gulp.dest('./dist/'))
});
*/

gulp.task("concat", function() {
  return gulp
    .src([
      "./src/js/imports.js",
      "./src/js/libs/getViewport.js",
      "./src/js/libs/matrix-renderer.js",
      "./src/js/touch-scale.js"
    ])
    .pipe(concat("touch-scale.js"))
    .pipe(gulp.dest("./dist/"))
})

gulp.task("copy", function() {
  return gulp
    .src([
      "./src/css/_container.scss",
      "./src/css/_element.scss"
    ])
    .pipe(gulp.dest("./dist/"))
})

gulp.task("build", ["concat", "copy"])
