$(document).on('click','.btn-5',function () {
    $(this).next('.open-5').slideToggle('slow').siblings('.open-5').slideUp('slow');
    $(this).siblings('.btn-5').removeClass('active');
    $(this).toggleClass('active');
});