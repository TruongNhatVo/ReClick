export default () => {
    $(window).on('resize ready', function() {
        var viewportWidth = $(window).width();

        if (viewportWidth < 960 && viewportWidth > 320) {
            $('.p-box-thumbs-inner').each(function() {
                $(this).find('.name').css('width', $(this).find('img').width());
            })
        }
    });
}