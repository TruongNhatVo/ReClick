import throttle from 'lodash.throttle'

export default () => {
  const $btn = $('#js-gnavi-hamburger')
  const $body = $('#js-gnavi-body')

  $btn.on('click', function() {
    if ($body.hasClass('is-show')) {
      $(this).removeClass('is-active')
      $body.removeClass('is-show')
    } else {
      $(this).addClass('is-active')
      $body.addClass('is-show')
    }
  })
  // const bodyOffset = $body.offset().top
  // console.log(bodyOffset)
  // window.addEventListener(
  //   'scroll',
  //   throttle(
  //     function() {
  //       if (window.innerWidth > 960) {
  //         let y = window.pageYOffset
  //         if (y > bodyOffset) {
  //           $body.addClass('is-fixed')
  //         } else {
  //           $body.removeClass('is-fixed')
  //         }
  //       }
  //     },
  //     50,
  //     { leading: true, trailing: false }
  //   )
  // )
}
