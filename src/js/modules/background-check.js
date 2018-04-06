import BackgroundCheck from 'background-check/background-check.js'

export default () => {
  BackgroundCheck.init({
    targets: '.js-bgcheck-target',
    images: '.js-bgcheck-image'
  })
}
