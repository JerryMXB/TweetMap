export default {
    zoom: 2,
    center: {
        lat: 40.695204,
        lng: -73.984523
    },
    mapTypeControl: true,
    scaleControl: true,
    maxZoom: 18,
    minZoom: 2,
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
        mapTypeIds: ['Standard', 'Silver', 'Retro', 'Dark', 'Night', 'Aubergine']
    }
};
