export default () => {
  const $btn = $('.js-megamenu-toggle')

  const openMenu = function() {
    $(this)
      .children('.js-megamenu-body')
      .addClass('is-show')
  }
  const closeMenu = function() {
    $(this)
      .children('.js-megamenu-body')
      .removeClass('is-show')
  }
  $btn.hover(openMenu, closeMenu)

  var scrollbar_width = window.innerWidth - document.body.scrollWidth

  // 固定スクロールバーのとき（オーバーレイでない）
  // if (scrollbar_width > 0) {
  // $('.js-scrollbar').addClass('is-scrollbar')

  // スクロールバーの幅が17pxでないとき
  // if (scrollbar_width !== 17) {
  //   $('.p-gnavi__body').css('margin-right', '-' + scrollbar_width + 'px')
  // }
  // }
}
