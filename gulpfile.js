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
      "./src/scale-wrapper.js",
    ])
    .pipe(concat("scale-wrapper.js"))
    .pipe(gulp.dest("./dist/"))
})
