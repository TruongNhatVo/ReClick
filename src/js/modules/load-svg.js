export default () => {
  $.ajax({
    type: 'get',
    url: '/images/common/symbol-defs.svg'
  }).done(function(data) {
    var svg = $(data).find('svg')
    $('body').prepend(svg)
  })
}
