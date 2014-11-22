(function(L, MQ) {

    var center = [51.505, -0.09];
    var initialZoom = 11;
    var markers = [];
    var map;
    var ranger;

    init();

    function init() {
        ranger = document.getElementById("ranger");
        map = mapFactory('mapquest');

        ranger.addEventListener("input", function(e) {
            addMarkers(e.target.value);
        });

        addMarkers(ranger.value);    
    }

    function mapFactory(type) {
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
                break;
        }
    }

    function addMarkers(num) {
        for(var i=0; i < markers.length; i++) {
            map.removeLayer(markers[i]);
        }

        markers = [];

        for(var i=0; i < num; i++) {
            markers.push(new L.marker([center[0]+(i*0.005), center[1]+(i*0.005)]));
            map.addLayer(markers[i]);
        }
    }

}(L, MQ));