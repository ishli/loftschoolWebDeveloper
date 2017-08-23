const showYandexMap = function () {
    let myMap;

    const init = function () {
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
            .disable('drag')
    };

    ymaps.ready(init);
};

const showOwlCarousel = function () {
    $(".owl-carousel").owlCarousel({
        items: 1,
        dots: false,
        nav: true,
        loop: true,
        navText: []
    });
}
$(document).ready(function () {
    showOwlCarousel();
    showYandexMap();

});