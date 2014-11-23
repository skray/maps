(function(L, MQ) {

    var center = [51.505, -0.09];
    var initialZoom = 11;
    var layers = [];
    var map;
    var ranger;
    var updateLayers;

    init();

    function init() {
        buildMap('mapquest');

        ranger = document.getElementById("ranger");

        ranger.addEventListener("input", function(e) {
            updateLayers(e.target.value);
        });
        buildMenu();

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

    function addMarkers(num) {
        removeLayers();

        for(var i=0; i < num; i++) {
            layers.push(new L.marker([center[0]+(i*0.005), center[1]+(i*0.005)]));
            map.addLayer(layers[i]);
        }
    }

    function buildMenu() {
        var addMarkersMenuItem = document.getElementById("add-markers");
        var moveCirclesMenuItem = document.getElementById("move-circles");

        addMarkersMenuItem.addEventListener("click", function() {
            buildMarkersMap();
        });

        moveCirclesMenuItem.addEventListener("click", function() {
            buildCirclesMap();
        });
    }

    function buildMarkersMap() {        


        addMarkers(ranger.value); 
        updateLayers = addMarkers;   
    }

    function buildCirclesMap() {
        removeLayers();
        layers.push(L.circle([51.508, -0.11], 500, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
        }))
        map.addLayer(layers[0]);
        moveCircle(ranger.value);
        updateLayers = moveCircle;
    }

    function moveCircle(num) {
        layers[0].setLatLng([center[0]+(num*.005),center[1]+(num*.005)]);
    }

    function removeLayers() {
        for(var i=0; i < layers.length; i++) {
            map.removeLayer(layers[i]);
        }

        layers = [];
    }

}(L, MQ));