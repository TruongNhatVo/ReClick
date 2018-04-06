const gulp = require('gulp')
;(browser = require('browser-sync')),
  (plumber = require('gulp-plumber')),
  (notify = require('gulp-notify')),
  (cache = require('gulp-cached')),
  (rename = require('gulp-rename')),
  (cache = require('gulp-cached')),
  (fs = require('fs')),
  (sass = require('gulp-sass')),
  (postcss = require('gulp-postcss')),
  (autoprefixer = require('autoprefixer')),
  (mqpacker = require('css-mqpacker')),
  (sortCSSmq = require('sort-css-media-queries')),
  (webpack = require('webpack')),
  (webpackStream = require('webpack-stream')),
  (imagemin = require('gulp-imagemin')),
  (pngquant = require('imagemin-pngquant')),
  (mozjpeg = require('imagemin-mozjpeg')),
  (svgmin = require('gulp-svgmin')),
  (newer = require('gulp-newer')),
  (pug = require('gulp-pug')),
  (path = require('path')),
  (data = require('gulp-data'))

const paths = {
  src: 'src',
  pug: ['src/pug/**/*.pug', '!src/pug/**/_*.pug'],
  pugAll: ['src/pug/**/*.pug'],
  scss: 'src/sass/**/*.scss',
  js: 'src/js/**/*.js',
  images: 'src/images/**/*.+(jpg|jpeg|png|gif)',
  svg: 'src/images/**/*.svg',
  fonts: 'src/fonts/**/*',
  dist: 'dist'
}

/////////////////////////////////////////////////////////
// pugの処理
/////////////////////////////////////////////////////////

gulp.task('pug', () => {
  const local = {
    site: JSON.parse(fs.readFileSync('src/pug/_data/site.json'))
  }
  gulp
    .src(paths.pug)
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
      })
    )
    .pipe(
      data((file) => {
        // 各ページのルート相対パスを格納します。
        local.pageAbsolutePath =
          '/' +
          path
            .relative(file.base, file.path.replace(/.pug$/, '.html'))
            .replace('\\', '/')
            .replace(/index\.html$/, '')
        return local
      })
    )
    .pipe(cache('pug'))
    .pipe(
      pug({
        local: local,
        basedir: 'src/pug',
        pretty: true
      })
    )
    .pipe(gulp.dest(paths.dist))
    .pipe(
      browser.reload({
        stream: true
      })
    )
})

gulp.task('pug-compile', () => {
  const local = {
    site: JSON.parse(fs.readFileSync('src/pug/_data/site.json'))
  }
  gulp
    .src(paths.pug)
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
      })
    )
    .pipe(
      data((file) => {
        // 各ページのルート相対パスを格納します。
        local.pageAbsolutePath =
          '/' +
          path
            .relative(file.base, file.path.replace(/.pug$/, '.html'))
            .replace('\\', '/')
            .replace(/index\.html$/, '')
        return local
      })
    )
    .pipe(
      pug({
        local: local,
        basedir: 'src/pug',
        pretty: true
      })
    )
    .pipe(gulp.dest(paths.dist))
})

/////////////////////////////////////////////////////////
// sassの処理
/////////////////////////////////////////////////////////

gulp.task('sass', () => {
  gulp
    .src(paths.scss)
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
      })
    )
    .pipe(
      sass({
        outputStyle: 'compressed'
      })
    )
    .pipe(
      postcss([
        autoprefixer({
          browsers: ['last 2 versions', 'ie >= 9', 'Android >= 4', 'iOS >= 7'],
          grid: true
        }),
        mqpacker({
          sort: sortCSSmq
        })
      ])
    )
    .pipe(gulp.dest(paths.dist + '/css'))
    .pipe(
      browser.reload({
        stream: true
      })
    )
})

/////////////////////////////////////////////////////////
// jsの処理
/////////////////////////////////////////////////////////
const webpackConfig = require('./webpack.config')

gulp.task('webpack', () => {
  gulp
    .src(['src/js/main.js'])
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
      })
    )
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest(paths.dist + '/js'))
    .pipe(
      browser.reload({
        stream: true
      })
    )
})

/////////////////////////////////////////////////////////
// fontsの処理
/////////////////////////////////////////////////////////

gulp.task('fonts', () => {
  gulp
    .src(paths.fonts)
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
      })
    )
    .pipe(gulp.dest(paths.dist + '/fonts'))
})

/////////////////////////////////////////////////////////
// browser-sync, watchの処理
/////////////////////////////////////////////////////////

gulp.task('server', () => {
  browser({
    server: {
      baseDir: paths.dist
    }
  })
})

// ファイルを監視
gulp.task('watch', () => {
  gulp.watch(paths.pug, ['pug'])
  gulp.watch(paths.scss, ['sass'])
  gulp.watch(paths.js, ['webpack'])
})

/////////////////////////////////////////////////////////
// 画像圧縮の処理
/////////////////////////////////////////////////////////

gulp.task('images', () => {
  const out = paths.dist + '/images'
  gulp
    .src(paths.images)
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
      })
    )
    .pipe(newer(out))
    .pipe(
      imagemin([
        pngquant({
          quality: '70-95',
          speed: 1
        }),
        mozjpeg({
          quality: 95,
          progressive: true
        })
      ])
    )
    .pipe(gulp.dest(paths.dist + '/images'))
})

gulp.task('svg', () => {
  gulp
    .src([paths.svg], {
      base: paths.src
    })
    .pipe(
      plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')
      })
    )
    .pipe(svgmin())
    .pipe(gulp.dest(paths.dist))
})

/////////////////////////////////////////////////////////
// コマンド
/////////////////////////////////////////////////////////

// "gulp" で起動
gulp.task('default', ['watch', 'server'])

// "gulp imagemin" で画像の圧縮
gulp.task('imagemin', ['images', 'svg'])

gulp.task('compile', [
  'images',
  'svg',
  'pug-compile',
  'webpack',
  'sass',
  'fonts'
])
