(function ($) {
    "use strict";

    // Preloader
    $(window).on("load", function () {
        $("body").addClass("loaded");
    });

    $(document).ready(function () {
        // Sticky Header
        function stickyHeader() {
            var primaryHeader = $(".nav-menu-wrapper"),
                headerClone = primaryHeader.clone();
            $(".main-header").after('<div class="sticky-header"></div>');
            $(".sticky-header").html(headerClone);

            var headerSelector = document.querySelector(".sticky-header"),
                triggerPoint = $(".main-header").height(),
                yOffset = 0;

            $(window).on("scroll", function () {
                yOffset = $(window).scrollTop();
                if (yOffset >= triggerPoint) {
                    $(".sticky-header").addClass("sticky-fixed-top");
                    $("body.open-sidebox").removeClass("open-sidebox");
                } else {
                    $(".sticky-header").removeClass("sticky-fixed-top");
                }
            });
        }

        if ($(window).width() > 992) {
            stickyHeader();
        }

        // Mobile Menu
        function mobileMenu() {
            if ($(".header-menu-wrap").length) {
                $(".nav-menu-inner .burger-menu").on("click", function () {
                    $(this).toggleClass("menu-open");
                    $(".header-menu-wrap").slideToggle(300);
                });
            }

            $(".header-menu-wrap ul li:has(ul)").each(function () {
                $(this).append('<span class="dropdown-plus"></span>');
                $(this).addClass("dropdown_menu");
            });

            $(".header-menu-wrap .dropdown-plus").on("click", function () {
                $(this).prev("ul").slideToggle(300);
                $(this).toggleClass("dropdown-open");
                $(".header-menu-wrap ul li:has(ul)").toggleClass("dropdown-open");
            });

            $(".header-menu-wrap .dropdown_menu a").append("<span></span>");
        }

        mobileMenu();

        // Responsive Classes
        function responsiveClasses() {
            var body = $("body");
            if ($(window).width() < 992) {
                body.removeClass("viewport-lg");
                body.addClass("viewport-sm");
            } else {
                body.removeClass("viewport-sm");
                body.addClass("viewport-lg");
            }
        }

        // Window Resize
        $(window).on("resize", function () {
            responsiveClasses();
        }).resize();

        // Popup Search Box
        $(function () {
            $("#popup-search-box").removeClass("toggled");
            $("body").removeClass("open-search-box");
            $(".dl-search-icon").on("click", function (e) {
                e.stopPropagation();
                $("body").toggleClass("open-search-box");
                $("#popup-search").focus();
            });

            $("#popup-search-box input").on("click", function (e) {
                e.stopPropagation();
            });
            $(document).on(
                "click",
                ".search-close, #searchbox-overlay",
                function (e) {
                    e.preventDefault();
                    $("body.open-search-box").removeClass("open-search-box");
                }
            );
        });

        // Popup Sidebox
        function sideBox() {
            $("body").removeClass("open-sidebox");
            $(document).on("click", ".dl-sidebox-icon", function (e) {
                e.preventDefault();
                $("body").toggleClass("open-sidebox");
            });
            $(document).on("click", "#sidebox-overlay", function (e) {
                e.preventDefault();
                $("body.open-sidebox").removeClass("open-sidebox");
            });
        }

        sideBox();

        function doAnimations(elements) {
            var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            elements.each(function () {
                var $this = $(this);
                var $animationDelay = $this.data('delay');
                var $animationDuration = $this.data('duration');
                var $animationType = 'animated ' + $this.data('animation');
                $this.css({
                    'animation-delay': $animationDelay,
                    '-webkit-animation-delay': $animationDelay,
                    'animation-duration': $animationDuration
                });
                $this.addClass($animationType).one(animationEndEvents, function () {
                    $this.removeClass($animationType);
                });
            });
        }

        // Main Slider
        var mainSlider;
        var sliderOptions = {
            speed: 1000,
            autoplay: false,
            parallax: false,
            mousewheel: false,
            loop: true,
            effect: 'fade',
            a11y: false,
            pagination: {
                el: '.main-slider .slider-pagination',
                clickable: true,
                type: 'fraction', //fraction
            },
            navigation: {
                nextEl: '.main-slider .slider-button-next',
                prevEl: '.main-slider .slider-button-prev'
            }
        };

        sliderOptions.on = {
            slideChangeTransitionStart: function () {
                var swiper = this;
                var animatingElements = $(swiper.slides[swiper.activeIndex]).find('[data-animation]');
                doAnimations(animatingElements);
            },
            resize: function () {
                this.update();
            }
        };

        mainSlider = new Swiper('.main-slider', sliderOptions);

        // Main Slider 2
        var mainSlider2;
        var sliderOptions2 = {
            speed: 1000,
            autoplay: false,
            parallax: false,
            mousewheel: false,
            loop: true,
            effect: 'fade',
            a11y: false,
            pagination: false,
            navigation: {
                nextEl: '.main-slider-2 .swiper-next',
                prevEl: '.main-slider-2 .swiper-prev'
            }
        };

        sliderOptions2.on = {
            slideChangeTransitionStart: function () {
                var swiper = this;
                var animatingElements = $(swiper.slides[swiper.activeIndex]).find('[data-animation]');
                doAnimations(animatingElements);
            },
            resize: function () {
                this.update();
            }
        };

        mainSlider2 = new Swiper('.main-slider-2', sliderOptions2);

        //Service Carousel  
        var swiperService = new Swiper(".service-carousel", {
            slidesPerView: "3",
            spaceBetween: 30,
            slidesPerGroup: 1,
            loop: true,
            autoplay: false,
            speed: 400,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-outside .swiper-next",
                prevEl: ".swiper-outside .swiper-prev",
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 25
                },
                // when window width is >= 767px
                767: {
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                    spaceBetween: 30
                },
                // when window width is >= 1024px
                1024: {
                    slidesPerView: 3,
                    slidesPerGroup: 1
                }
            }
        });

        //Testimonial Carousel  
        var swiperTestimonial = new Swiper(".testimonial-carousel", {
            slidesPerView: 1,
            spaceBetween: 30,
            slidesPerGroup: 1,
            loop: true,
            autoplay: false,
            speed: 400,
            pagination: {
                el: ".testi-pagination .swiper-pagination",
                clickable: true,
            },
            navigation: false,
        });

        //Testimonial Carousel 2 
        var swiperTestimonial2 = new Swiper(".testimonial-carousel-2", {
            slidesPerView: 2,
            spaceBetween: 30,
            slidesPerGroup: 1,
            loop: true,
            autoplay: false,
            speed: 400,
            pagination: {
                el: ".testi-pagination .swiper-pagination",
                clickable: true,
            },
            navigation: false,
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 25
                },
                // when window width is >= 767px
                767: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 30
                },
                // when window width is >= 1024px
                1024: {
                    slidesPerView: 2,
                    slidesPerGroup: 1
                }
            }
        });

        // Custom Cursor
        var cursor = $(".dl-cursor"),
            linksCursor = $("a, .swiper-nav, .cursor-effect, .swiper-pagination > span, button, .menu-right-item > div"),
            crossCursor = $("#sidebox-overlay, #searchbox-overlay");

        $(window).on("mousemove", function (e) {
            cursor.css({
                transform: "translate(" + (e.clientX - 15) + "px," + (e.clientY - 15) + "px)",
                visibility: "inherit",
            });
        });

        $(window).on("mouseout", function () {
            cursor.css("visibility", "hidden");
        });

        linksCursor.each(function () {
            $(this).on("mouseleave", function () {
                cursor.removeClass("cursor-grow");
            });
            $(this).on("mouseover", function () {
                cursor.addClass("cursor-grow");
            });
        });

        crossCursor.each(function () {
            $(this).on("mouseleave", function () {
                cursor.removeClass("cross");
            });
            $(this).on("mouseover", function () {
                cursor.addClass("cross");
            });
        });


        //Related Taxi Carousel  
        var swiperTaxi = new Swiper(".taxi-carousel", {
            slidesPerView: "3",
            spaceBetween: 30,
            slidesPerGroup: 1,
            loop: true,
            autoplay: false,
            speed: 400,
            pagination: false,
            navigation: {
                nextEl: ".swiper-outside .swiper-next",
                prevEl: ".swiper-outside .swiper-prev",
            },
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 25
                },
                // when window width is >= 767px
                767: {
                    slidesPerView: 2,
                    slidesPerGroup: 1,
                    spaceBetween: 30
                },
                // when window width is >= 1024px
                1024: {
                    slidesPerView: 3,
                    slidesPerGroup: 1
                }
            }
        });

        // Venobox Active
        new VenoBox({
            selector: '.dl-video-popup, .dl-img-popup',
            bgcolor: 'transparent',
            numeration: true,
            infinigall: true,
            spinner: 'plane',
        });


        // Date Time Picker
        $('.date-picker').datetimepicker({
            timepicker: false,
            format:'d/m/Y'
        });

        $('.time-picker').datetimepicker({
            datepicker: false,
            format: 'H:i',
            step: 5
        });

        // Nice Select
        $('select').niceSelect();

        // Current Year
        var currentYear = new Date().getFullYear();
        $('#currentYear').append(currentYear);


        // Scroll To Top
        var scrollTop = $("#scroll-top");
        $(window).on("scroll", function () {
            var topPos = $(this).scrollTop();
            if (topPos > 100) {
                $("#scrollup").removeClass("hide");
                $("#scrollup").addClass("show");
            } else {
                $("#scrollup").removeClass("show");
                $("#scrollup").addClass("hide");
            }
        });

        $(scrollTop).on("click", function () {
            $("html, body").animate({
                    scrollTop: 0,
                },
                200
            );
            return false;
        });

        // MailChimp
        if ($('.subscribe-form').length>0) {
            $('.subscribe-form').ajaxChimp({
                language: 'en',
                callback: mailchimpCallback,
                url: "https://gmail.us4.list-manage.com/subscribe/post?u=540c52965f5180ae846e5e5a8&amp;id=4dbe9a9245&amp;f_id=0027a5ebf0"
            });
        }
        
        // Wow JS Active
        new WOW().init();

        $(scrollTop).on("click", function() {
            $('html, body').animate({
                scrollTop: 0
            }, 800);
            return false;
        });

        function mailchimpCallback(resp) {
            if (resp.result === 'success') {
                $('#subscribe-result').addClass('subs-result');
                $('.subscription-success').text(resp.msg).fadeIn();
                $('.subscription-error').fadeOut();
                setTimeout(function(){
                    $('#subscribe-result').removeClass('subs-result');
                    $('.subscription-success').fadeOut();
                }, 5000);
            } else if(resp.result === 'error') {
                $('#subscribe-result').addClass('subs-result');
                $('.subscription-error').text(resp.msg).fadeIn();
            }
        }
        $.ajaxChimp.translations.en = {
            'submit': 'Submitting...',
            0: 'We have sent you a confirmation email',
            1: 'Please enter your email',
            2: 'An email address must contain a single @',
            3: 'The domain portion of the email address is invalid (the portion after the @: )',
            4: 'The username portion of the email address is invalid (the portion before the @: )',
            5: 'This email address looks fake or invalid. Please enter a real email address'
        };

    });
})(jQuery);
