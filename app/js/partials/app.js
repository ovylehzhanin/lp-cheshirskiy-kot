(function() {

    //Scroll to section
    $(".header__menu-link").click(function() {

		var id  = $(this).attr('href');
		var top = $(id).offset().top;

		$('body,html').animate({scrollTop: top}, 1500);

		return false;
	});

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


    //Paralax Section Gallery
    $('.gallery__scene').parallax();


    // Slider Section Gallery
    $('.gallery__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        dots: true,
        infinite: false,
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-up" aria-hidden="true"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-down" aria-hidden="true"></i></button>'
    });


   $('.gallery__slider--response').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        infinite: false,
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-up" aria-hidden="true"></i></button>',
        nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-down" aria-hidden="true"></i></button>'
    });


    $('.reviews-slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '39px',
        asNavFor: ".reviews-slider-for",
        focusOnSelect: true,
        speed: 1200,
        prevArrow:'<button class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
        nextArrow:'<button class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
        responsive: [
            {
                breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: '0px',
                        centerMode: false
                    }
            }
        ]
    });

    $('.reviews-slider-for').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: ".reviews-slider",
        focusOnSelect: true,
        dots: true,
        speed: 1200
  });


    //jQuery UI 
    $('.datepicker').datepicker({dateFormat: 'dd/mm/yy'},
        $.datepicker.regional[ "ru" ]
    );

    $('.select').selectmenu();

    $('.select-popup').selectmenu();
    

    //Animate
    AOS.init();


    //Animate numbers
    var numAnim1 = new CountUp("num-one", 0, 600);
    var numAnim2 = new CountUp("num-two", 0, 5, 0, 4);
    var numAnim3 = new CountUp("num-three", 0, 230, 0, 4);
    var numAnim4 = new CountUp("num-four", 0, 9.6, 1, 4);


    
    $('.company-numbers').waypoint(function() {
        numAnim1.start();
        numAnim2.start();
        numAnim3.start();
        numAnim4.start();
    }, { offset: '50%' });


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


