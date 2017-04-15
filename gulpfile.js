'use strict';

const   gulp = require('gulp');
const	watch = require('gulp-watch');
const	prefixer = require('gulp-autoprefixer');
const	uglify = require('gulp-uglify');
const	sass = require('gulp-sass');
const	sourcemaps = require('gulp-sourcemaps');
const	rigger = require('gulp-rigger');
const	cssmin = require('gulp-minify-css');
const	imagemin = require('gulp-imagemin');
const	spritesmith = require("gulp.spritesmith");
const	rimraf = require('rimraf');
const	browserSync = require("browser-sync");
const	reload = browserSync.reload;
const	stripCssComments = require('gulp-strip-css-comments');
const   gulpUtil = require('gulp-util');
const   babel = require('gulp-babel');
const   plumber = require('gulp-plumber');
const   pug = require('gulp-pug');
const   ftp = require('gulp-ftp');

let path = {

	build: {
		html:    'dist/',
		js:      'dist/js/',
		css:     'dist/css/',
		img:     'dist/img/',
		fonts:   'dist/fonts/'
	},

	src: {
		html:    'app/*.pug',
		js:      ['app/js/main.js','app/js/main-s.js' ],
		style:   'app/sass/main.sass',
		img:     ['app/img/**/*.*', '!app/img/icons/**/*.*'],
		icons:   'app/img/icons/*.*',
		fonts:   'app/fonts/**/*.*'
	},

	watch: {
		html:    'app/**/*.pug',
		js:      'app/js/**/*.js',
		style:   'app/sass/**/*.sass',
		img:     'app/img/**/*.*',
		fonts:   'app/fonts/**/*.*'
	},

	clean: './dist'
}

var config = {
	server: {
		baseDir: "./dist"
	},
	tunnel: false,
	host: 'localhost',
	port: 9000,
	logPrefix: "Front-End"
}

gulp.task('html:build', function buildHTML() {
  gulp.src(path.src.html)
		.pipe(pug({
      pretty: true
    }))
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({stream: true}));

});

gulp.task('js:build', () => {
    gulp.src(path.src.js)
				.pipe(plumber(function(error){
		        console.log("ERROR HAPPEND JS!", error.message);
		        this.emit('end');
		    }))
        .pipe(rigger())
        // .pipe(babel({
    	// 		presets: ['es2015']
    	// 	}))
        //.pipe(sourcemaps.init())
        .pipe(uglify().on('error', gulpUtil.log))
        //.pipe(sourcemaps.write())
		.pipe(plumber.stop())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', () => {
    gulp.src(path.src.style)
        //.pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(prefixer())
        .pipe(cssmin())
        //.pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', () => {
    gulp.src(path.src.img)
        // .pipe(imagemin())
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('images:copy', () => {
    gulp.src('./app/images/**/**.*')
        .pipe(gulp.dest('./dist/css/images'))
});

gulp.task('image:sprite', () => {
    var spriteData =
        gulp.src(path.src.icons)
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: '_sprite.sass',
                imgPath: '../img/sprite.png',
                padding: 5
            }));


    spriteData.img.pipe(gulp.dest('dist/img/'));
    spriteData.css.pipe(gulp.dest('app/sass/partials/global'))
    spriteData.css.pipe(stripCssComments());
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});


gulp.task('ftp', function () {
    return gulp.src('dist/**/**.*')
        .pipe(ftp({
            host: '185.20.227.132',
            user: 'studio',
            pass: '7S0a4Q4u',
            remotePath: '/www/project.dimbrowsky.com/kot'
        }))
        .pipe(gulpUtil.noop());
});


gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build',
    'image:sprite',
    'images:copy'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
     watch([path.watch.img], function(event, cb) {
        gulp.start('image:sprite');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);
