const gulp = require("gulp")
const concat = require("gulp-concat")

/*
gulp.task('build', function () {
    return gulp
      .src('./src/index.js')
      .pipe(gulp.dest('./dist/'))
});
*/

gulp.task("build", function() {
  return gulp
    .src([
      "./src/imports.js",
      "./src/libs/getViewport.js",
      // "./node_modules/touch-scale_core/dist/_container.scss",
      // "./node_modules/touch-scale_core/dist/_element.scss",
      // "./src/libs/getViewport.js",
      // "./src/private.js",
      "./src/touch-scale.js"
    ])
    .pipe(concat("touch-scale.js"))
    .pipe(gulp.dest("./dist/"))
})
