export default () => {
	let windowWidth = $(window).width();

	if (windowWidth < 960) {
		$('.p-plan-news .group-top').each(function() {
			$(this).find('.js-ins-sp ').addClass('contentSp').insertAfter($(this));
		})
	}
}