const fs = require('fs');
const rimraf = require('rimraf');
const gulp = require('gulp');
const sass = require('gulp-sass');
const bourbon = require('bourbon');
const zip = require('gulp-zip');

const package = JSON.parse(fs.readFileSync('./package.json'));

gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass({
			includePaths: bourbon.includePaths
		}).on('error', sass.logError))
        .pipe(gulp.dest('./css/'));
});

gulp.task('build', function() {
	if(package.buildFiles == null) {
		console.error('Build files not declared in package.json');
		return;
	}
	// Removing build folder first
	rimraf('build', function () { 
		gulp.src(package.buildFiles, {base: '.'})
			.pipe(gulp.dest('build/'));					
	});
});

gulp.task('zip', function () {
    return gulp.src(['build/**'])
        .pipe(zip('tile.zip'))
        .pipe(gulp.dest('./'));
});

//Watch task
gulp.task('default',function() {
    gulp.watch('sass/**/*.scss',['styles']);
});
