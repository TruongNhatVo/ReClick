import throttle from 'lodash.throttle'

export default () => {
  const floatingArea = document.getElementById('js-floating-area')

  const bodyHeight = document.body.clientHeight
  const windowHeight = window.innerHeight
  const h = bodyHeight - windowHeight

  window.addEventListener(
    'scroll',
    throttle(function() {
      let y = window.pageYOffset

      if (y > 50 && h > y) {
        floatingArea.classList.add('is-show')
      } else {
        floatingArea.classList.remove('is-show')
      }
    }, 50)
  )
}
