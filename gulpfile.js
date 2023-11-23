const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const pug = require("gulp-pug");
const browserSync = require("browser-sync").create();
const sourcemaps = require("gulp-sourcemaps");

gulp.task("styles", () => {
  return gulp
    .src("./src/styles/style.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./dist"));
});

gulp.task("views", () => {
  return gulp
    .src("./src/pages/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("./dist"));
});

gulp.task("watchFiles", function () {
  gulp.watch("./src/styles/**/*.scss", gulp.series("styles", "reloadBrowser"));
  gulp.watch("./src/pages/*.pug", gulp.series("views", "reloadBrowser"));
});

gulp.task("reloadBrowser", function (done) {
  browserSync.reload();
  done();
});

gulp.task("serve", function (done) {
  browserSync.init({
    server: {
      baseDir: "./dist",
      index: "index.html",
    },
  });
  done();
});

gulp.task("default", gulp.parallel("styles", "views", "watchFiles", "serve"));
