const gulp = require('gulp')
const zip = require('gulp-zip')

const fileList = ['./dist/*/*', './dist/index.html']
const VERSION = `${process.env.ZIP_NAME}.zip`
gulp.task('zip', () => {
    return gulp.src(fileList).pipe(zip(VERSION)).pipe(gulp.dest(`./dist`))
    // .pipe(gulp.dest(`./${config.outputDir}`))
})
