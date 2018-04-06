import $ from 'jquery'

module.exports = (str) => {
  var pagetop = $(str)

  pagetop.on('click', () => {
    $('html,body').animate(
      {
        scrollTop: '0'
      },
      1000,
      'easeOutExpo'
    )
  })
}
