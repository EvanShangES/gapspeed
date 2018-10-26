angular.module('gap.about').controller('aboutController', function(APP_CONFIG, $scope, $rootScope, $state, $stateParams, $http){
    console.log('hellosss');
// Grid gallery
    // http://masonry.desandro.com/
    // Cascading grid layout library
    var clickEvent = 'click';


    var gridRow = $('.grid-row, .grid-gallery');
    var gridSort = $('[data-grid-sort]');
    var gridItem = $('.grid-gallery').find('.grid-item');
    gridItem.hide();

    gridRow.imagesLoaded(function() {
        gridItem.fadeIn();

        gridRow.masonry({
            columnWidth: '.grid-sizer',
            itemSelector: '.grid-item',
            percentPosition: true
        });

        var grid = gridSort.isotope({
            itemSelector: '.grid-item',
            resizable: false,
            percentPosition: true,
            masonry: {
                columnWidth: '.grid-sizer'
            }
        });

        $('.gallery-filter').on(clickEvent, 'a', function(event) {
            event.preventDefault();
            var filterValue = $(this).attr('data-filter');

            grid.isotope({filter: filterValue});
        });
    });

    // https://github.com/bfintal/Counter-Up
    // http://bfintal.github.io/Counter-Up/demo/demo.html
    $("[data-counter]").counterUp({
        delay: 10,
        time: 2000
    });

    $(window).resize().imagesLoaded().always(function(instance) {
        // JavaScript parallax scrolling
        // https://github.com/nk-o/jarallax
        $('.parallax').jarallax({
            speed: 0.74,
            type: 'scroll'
        });

        // Parallax function for pattern
        $('.parallax-repeat').each(function() {
            var $el = $(this);
            $(window).scroll(function() {
                updateBackground($el);
            });
            updateBackground($el);
        });

        var speed = 0.074;
        function updateBackground($el) {

            var diff = $(window).scrollTop() - $el.offset().top;
            var yPos = -(diff * speed);
            var coords = '50% ' + yPos + 'px';

            $el.css({
                backgroundPosition: coords
            });
        }

        // carouselOwl
        // jQuery Responsive Carousel.
        // http://owlcarousel2.github.io/OwlCarousel2/
        var carouselOwl = $('.owl-carousel');

        // Carousels
        var catalogCarousel = $(".main-product__carousel");
        var testimonials = $('.testimonials-carousel');
        var brandsCarousel = $(".brands-carousel");
        var aboutGallery = $(".section-about__carousel");

        catalogCarousel.owlCarousel({
            loop: true,
            items: 1,
            slideSpeed: 150,
            paginationSpeed: 150,
            mouseDrag: true,
            touchDrag: true,
            nav: false,
            dots: false
        });

        // Testimonials
        testimonials.owlCarousel({
            loop: true,
            slideSpeed: 300,
            paginationSpeed: 300,
            margin: 30,
            autoHeight: true,
            mouseDrag: true,
            touchDrag: true,
            nav: false,
            dots: true,
            dotsContainer: '[data-control-dots]',
            responsive: {
                0: {
                    items: 1
                },
                680: {
                    items: 2
                },
                992: {
                    items: 3
                }
            }
        });

        // Brands
        brandsCarousel.owlCarousel({
            loop: true,
            items: 2,
            autoHeight: false,
            margin: 2,
            slideSpeed: 300,
            paginationSpeed: 300,
            mouseDrag: true,
            touchDrag: true,
            nav: false,
            dots: false,
            lazyLoad: true,
            responsive: {
                480: {
                    items: 3
                },
                767: {
                    items: 4
                }
            }
        });

        // About gallery
        var flag = false;
        var duration = 300;
        var carouselTrack = $(".carousel-track");
        aboutGallery.owlCarousel({
            loop: true,
            items: 1,
            autoHeight: false,
            mouseDrag: true,
            touchDrag: true,
            nav: false,
            dots: false,
            lazyLoad: true
        })
            .on('changed.owl.carousel', function(e) {
                if (!flag) {
                    flag = true;
                    carouselTrack.trigger('to.owl.carousel', [e.item.index, duration, true]);
                    flag = false;
                }
            });

        // track sync
        carouselTrack.owlCarousel({
            loop: true,
            center: true,
            items: 3,
            margin: 10,
            nav: false,
            dots: false,
            responsive: {
                480: {
                    items: 4,
                    margin: 10
                },
                768: {
                    items: 5,
                    margin: 10
                },
                992: {
                    items: 6,
                    margin: 30
                }
            }
        })

            .on('mousewheel', '.owl-stage', function(e) {
                if (e.deltaY > 0) {
                    carouselTrack.trigger('next.owl');
                } else {
                    carouselTrack.trigger('prev.owl');
                }
                e.preventDefault();
            })

            .on(clickEvent, '.owl-item', function() {
                aboutGallery.trigger('to.owl.carousel', [$(this).index(), duration, true]);
            })

            .on('changed.owl.carousel', function(e) {
                if (!flag) {
                    flag = true;
                    aboutGallery.trigger('to.owl.carousel', [e.item.index, duration, true]);
                    flag = false;
                }
            });

        carouselOwl.each(function() {
            var $this = $(this);

            $this.parent().find('.next').on(clickEvent, function() {
                $this.trigger('next.owl.carousel');
            });

            $this.parent().find('.prev').on(clickEvent, function() {
                $this.trigger('prev.owl.carousel');
            });
        });

        // Blueimp lightbox
        // https://github.com/blueimp/Gallery
        // Add the following JavaScript code after including the Gallery script, to display the images in the Gallery lightbox on click of the links
        var galleryLinks = $(".grid-gallery .grid-gallery-link");
        galleryLinks.on(clickEvent, function(event) {
            event.preventDefault();
            var currentLink = galleryLinks.index(this);
            var galleryOptions = {
                index: currentLink,
                event: event,
                indicatorContainer: '.indicator',
                fullscreen: true,
                stretchImages: true,
                hidePageScrollbars: true,
                disableScroll: true,
                startSlideshow: true,
                slideshowInterval: 6000
            };

            blueimp.Gallery(galleryLinks, galleryOptions);
        });
    });

    // Sly navigation
    // http://darsa.in/sly/
    // JavaScript library for one-directional scrolling with item based navigation support
    var $galleryBox = $('#blueimp-gallery');
    var $slyTrack = $galleryBox.find('.gallery-controls__track');
    var $slyOptions = {
        horizontal: 1,
        itemNav: 'basic',
        smart: 1,
        activateOn: 'click',
        mouseDragging: 1,
        touchDragging: 1,
        releaseSwing: 1,
        scrollBar: $galleryBox.find('.scrollbar'),
        scrollBy: 1,
        speed: 600,
        elasticBounds: 1,
        easing: 'easeOutExpo',
        dragHandle: 1,
        dynamicHandle: 1,
        clickBar: 1,

        // Buttons
        prev: $galleryBox.find('.prev'),
        next: $galleryBox.find('.next'),
        prevPage: $galleryBox.find('.prevPage'),
        nextPage: $galleryBox.find('.nextPage')
    };

    $('.grid-gallery .grid-item').on(clickEvent, function() {
        if ($('#blueimp-gallery').hasClass('blueimp-gallery-display')) {
            $slyTrack.sly($slyOptions).init();
        }
    });

    // Panels horizontal scrolling
    var $slyPanels = $("[data-slide-panel]");
    var $slyPanelsTrack = $("[data-slide-track]");
    var $slyPanelsOptions = {
        horizontal: 1,
        itemNav: 'centered',
        smart: 1,
        startAt: 0,
        activateOn: 'click',
        mouseDragging: 1,
        touchDragging: 1,
        releaseSwing: 1,
        speed: 600,
        elasticBounds: 1,
        easing: 'easeOutExpo',
        dragHandle: 1,
        dynamicHandle: 1,

        // Buttons
        prev: $slyPanels.find('.prev'),
        next: $slyPanels.find('.next')
    };
    $slyPanelsTrack.sly($slyPanelsOptions).init();
});