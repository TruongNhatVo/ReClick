export default () => {
  const speed = 1000

  $('a[href^="#"]').on('click', function() {
    const target = $(this.hash)
    if (!target.length) return
    const targetY = target.offset().top
    $('html,body').animate({ scrollTop: targetY }, speed, 'easeOutExpo')
    return false
  })
}
