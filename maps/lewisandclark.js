(function(L, MQ) {

    var locations = [
        [38.804967,-90.113183],
        [38.775967,-90.4841],
        [39.086767,-94.41935],
        [40.264483,-95.57735],
        [41.456267,-96.021683],
        [42.042133,-96.1628],
        [42.488733,-96.4085],
        [42.599983,-96.711133],
        [42.857367,-97.550467],
        [44.373767,-100.339767],
        [46.81895,-100.780917],
        [47.30245,-101.0374],
        [47.982167,-102.5453],
        [45.99525,-108.005383],
        [47.529125,-111.235334],
        [45.924,-111.498],
        [46.635133,-114.579767],
        [46.422283,-117.029517],
        [46.4075,-117.2203],
        [46.20015,-119.04055],
        [45.613667,-121.119333],
        [45.69225,-121.8942],
        [45.816117,-122.758617],
        [46.1346,-123.880367],
        [46.283617,-124.053733]
    ];
    var center = locations[0];
    var initialZoom = 11;
    var layers = [];
    var map;

    init();

    function init() {

        buildMap('mapquest');
        buildMarkersMap();        

    }

    function buildMap(type) {
        switch(type) {
            case 'mapquest':
                map = L.map('map', {
                    layers: MQ.mapLayer(),
                    center: center,
                    zoom: initialZoom
                });
                break;
            default:
                map = L.map('map').setView(center, initialZoom);

                L.tileLayer('http://{s}.tiles.mapbox.com/v3/seankennethray.map-zjkq5g6o/{z}/{x}/{y}.png', {
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                    maxZoom: 18
                }).addTo(map);
        }
    }

    function buildMarkersMap() {
        addMarkers(); 
    }

    function addMarkers() {
        removeLayers();

        for(var i=0; i < locations.length; i++) {
            layers.push(new L.marker(locations[i]));
            map.addLayer(layers[i]);
        }
        // map.panTo(layers[layers.length-1].getLatLng());
    }

    function removeLayers() {
        for(var i=0; i < layers.length; i++) {
            map.removeLayer(layers[i]);
        }

        layers = [];
    }

}(L, MQ));