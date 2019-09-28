"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var copy = require("gulp-copy");
var rimraf = require("rimraf");

gulp.task("style", function() {
  gulp.src("sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: [
        "last 1 version",
        "last 2 Chrome versions",
        "last 2 Firefox versions",
        "last 2 Opera versions",
        "last 2 Edge versions"
      ]})
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(server.reload({stream: true}));
});

gulp.task("images", function() {
  return gulp.src("img/**/*.{png,jpg,gif}")
    .pipe(plumber())
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true
    }))
    .pipe(gulp.dest("build/img"));
});

gulp.task("copies:build", function() {
  return gulp.src(["fonts/**/*.ttf","font-awesome/**/*.{css,otf,eot,svg,ttf,woff,woff2}" , "img/**/*.{jpg,svg}", "js/**/*.js", "*.html"])
  .pipe(copy("build/"));
});

gulp.task("copies:html", function() {
  return gulp.src(["*.html"])
  .pipe(copy("build/"))
  .pipe(server.reload({stream: true}));
});

gulp.task("delete", function(cb){
  rimraf("./build", cb);
});

gulp.task("build", ["delete"], function() {
  gulp.start(
    "copies:build",
    "style",
    "images"
  );
});

gulp.task("serve", function() {
  server.init({
    server: "./build",
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html", ["copies:html"]);
});