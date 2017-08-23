let showYandexMap = function () {
    let myMap;

    let init = function () {
        myMap = new ymaps.Map("yandexMap", {
            center: [59.92606548, 30.32610869],
            zoom: 11
        });

        placemarkTov = new ymaps.Placemark([59.915038, 30.486096], {
            hintContent: 'Mr.Burger на Товарищеском',
            balloonContent: 'Товарищеский проспект, 20/27'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './img/icons/map-marker.svg',
            iconImageSize: [46, 57],
            iconImageOffset: [-15, -50]
        });

        placemarkTver = new ymaps.Placemark([59.94708381, 30.38481688], {
            hintContent: 'Mr.Burger на Тверской',
            balloonContent: 'Тверская улица, 16'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './img/icons/map-marker.svg',
            iconImageSize: [46, 57],
            iconImageOffset: [-15, -50]
        });

        placemarkMosk = new ymaps.Placemark([59.891295, 30.316907], {
            hintContent: 'Mr.Burger на Московском',
            balloonContent: 'Московский проспект, 103к2'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './img/icons/map-marker.svg',
            iconImageSize: [46, 57],
            iconImageOffset: [-15, -50]
        });

        placemarkChap = new ymaps.Placemark([59.973999, 30.311091], {
            hintContent: 'Mr.Burger на Чапыгина',
            balloonContent: 'улица Чапыгина, 13А'
        }, {
            iconLayout: 'default#image',
            iconImageHref: './img/icons/map-marker.svg',
            iconImageSize: [46, 57],
            iconImageOffset: [-15, -50]
        });

        myMap.geoObjects
            .add(placemarkTov)
            .add(placemarkTver)
            .add(placemarkMosk)
            .add(placemarkChap);

        myMap.behaviors
            .disable('scrollZoom')
            .disable('drag');
    };

    ymaps.ready(init);
};

let showOwlCarousel = function () {
    $(".owl-carousel").owlCarousel({
        items: 1,
        dots: false,
        nav: true,
        loop: true,
        navText: []
    });
};

let initTeam = function () {
    $('.team-acco__title').on('click', function (e) {
        let elem = $(e.target),
            item = elem.closest('.team-acco__item'),
            content = item.find('.team-acco__wrapper'),
            openHeight = item.find('.team-acco__content').outerHeight(true),
            otherItems = item.siblings(),
            otherItemsContent = otherItems.find('.team-acco__wrapper');

        if (item.hasClass('active')) {
            item.removeClass('active'),
                content.css('height', '0')
        } else {
            otherItems.removeClass('active'),
                item.addClass('active'),
                otherItemsContent.css('height', '0'),
                content.css('height', openHeight)
        }
    });
};

let initMenu = function () {
    $('.menu-acco__link').on('click', function (e) {
        e.preventDefault();
        let elem = $(e.target),
            item = elem.closest('.menu-acco__item'),
            content = item.find('.menu-acco__content'),
            otherItems = item.siblings(),
            otherItemsContent = otherItems.find('.menu__description-wrapper'),
            itemsWidth = $('.menu-acco__item').length * $('.menu-acco__link').width();

        $(window).width() < 769 ?
            openWidth = $(window).width() - itemsWidth :
            openWidth = $(window).width() * 0.65 - itemsWidth

        if (!item.hasClass('active')) {
            otherItems.removeClass('active'),
                item.addClass('active'),
                otherItemsContent.css('width', '0'),
                content.css('width', openWidth)
        } else {
            item.removeClass('active'),
                content.css('width', '0')
        }

    })
};

let initOnePageScroll = function () {
    let sections = $('.section'),
        visible = $('.mainContent');
    let inScroll = false;

    let md = new MobileDetect(window.navigator.userAgent),
        isMobile = md.mobile();

    let performTransition = function (sectionEq) {
        if (!inScroll) {
            inScroll = true;

            let position = (sectionEq * -100) + '%';

            visible.css({
                'transform': 'translateY(' + position + ')',
                '-webkit-transform': 'translateY(' + position + ')'
            });

            sections.eq(sectionEq).addClass('active')
                .siblings().removeClass('active');

            setTimeout(function () {
                inScroll = false;
                $('.fixed-menu__item').eq(sectionEq).addClass('active')
                    .siblings().removeClass('active');
            }, 300);
        }
    };

    let defineSections = function (sections) {
        let activeSection = sections.filter('.active');
        return {
            activeSection: activeSection,
            nextSection: activeSection.next(),
            prevSection: activeSection.prev()
        };
    };

    let scrollToSection = function (direction) {
        let section = defineSections(sections);

        if (direction == 'up' && section.nextSection.length) {
            performTransition(section.nextSection.index());
        }

        if (direction == 'down' && section.prevSection.length) {
            performTransition(section.prevSection.index());
        }
    };

    $('.wrapper').on({
        'wheel': function (e) {
            let deltaY = e.originalEvent.deltaY;

            let direction = deltaY > 0 ? 'up' : 'down';

            scrollToSection(direction);
        },
        touchmove: function (e) {
            e.preventDefault();
        }
    });


    $(document).on('keydown', function (e) {
        let section = defineSections(sections);

        switch (e.keyCode) {
            case 38:
                if (section.prevSection.length) {
                    performTransition(section.prevSection.index());
                }
                break;
            case 40:
                if (section.nextSection.length) {
                    performTransition(section.nextSection.index());
                }
                break;
        }
    });

    $('.fixed-menu__link').on('click', function (e) {
        e.preventDefault();

        let elem = $(e.target),
            items = $('.fixed-menu__item'),
            targets = elem.closest(items),
            index = targets.index();

        performTransition(index);
    });

    $('.nav__link').on('click', function (e) {
        e.preventDefault();

        let elem = $(e.target),
            elemId = elem.attr('href'),
            sectionEq = parseInt(sections.filter(elemId).index());

        performTransition(sectionEq);
    });

    $('.hero__arrow').on('click', function (e) {
        e.preventDefault();
        performTransition(1);
    });

    $('.order__btn').on('click', function (e) {
        e.preventDefault();
        performTransition(6);
    });

    if (isMobile) {
        $(window).swipe({
            swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
                scrollToSection(direction);
            }
        });
    }
};

$(document).ready(function () {
    initOnePageScroll();
    initTeam();
    initMenu();
    showOwlCarousel();
    showYandexMap();

});