const gulp = require('gulp')
const sass = require('gulp-ruby-sass')

gulp.task('sass', function () {
    return sass('./assets/resources/scss/style.scss')//compile scss file
        .on('error', sass.logError)//error info
        .pipe(gulp.dest('./assets/resources/css'))////target path
})

gulp.task('dist',function(){
    gulp.watch('./assets/resources/scss/*.scss',['sass']);// listen file
});