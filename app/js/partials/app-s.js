(function() {


    //Response Menu
    $('.icon-menu').click(function() {
        var $menu = $('.header__menu');

        if($menu.hasClass('is-show')) {
            $menu.removeClass('is-show');
            $(this).find('.close').hide();
            $(this).find('.open').show();
        }else {
            $menu.addClass('is-show');
            $(this).find('.close').show();
            $(this).find('.open').hide();
        }

    });

    $('.header__menu-link').click(function() {
        if( $('.header__menu').hasClass('is-show')) {
            $('.header__menu').removeClass('is-show');
            $('.icon-menu').find('.close').hide();
            $('.icon-menu').find('.open').show();
        }
    });

    //Animate
    AOS.init();


    //Popups
    $('.open-popup').magnificPopup({
        removalDelay: 500, 
        callbacks: {
            beforeOpen: function() {
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        },
        midClick: true 
    });
 
})();


