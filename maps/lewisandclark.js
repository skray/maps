(function(L, MQ, $) {

    L.Icon.Default.imagePath = 'images';

    var center = [38.804967,-90.113183];
    var initialZoom = 11;
    var layers = [];
    var map;
    var current = 0;
    var markers;

    init();

    function init() {

        buildMap();
        buildMarkersMap();  

        var nextBtn = document.getElementById('nextBtn');
        nextBtn.addEventListener('click', next);   
        var prevBtn = document.getElementById('prevBtn');
        prevBtn.addEventListener('click', prev);     

    }

    function buildMap(type) {
        switch(type) {
            case 'mapquest':
                map = L.map('map', {
                    layers: MQ.mapLayer(),
                    center: center.pos,
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
        return $.ajax({
            type: "GET",
            url: 'http://localhost:8080/maps/123/markers',
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        }).then(addMarkers);
    }

    function addMarkers(data) {
        markers = data;
        for(var i=0; i < markers.length; i++) {
            layers.push(new L.marker([markers[i].latitude, markers[i].longitude]));
            map.addLayer(layers[i]);
        }
        $('.nav').render(markers[current]); 
    }

    function next() {
        if(current + 1 < markers.length) {
            current++;
            map.panTo([markers[current].latitude, markers[current].longitude]);
        }

        $('.nav').render(markers[current]);
    }

    function prev() {
        if(current > 0) {
            current--;
            map.panTo([markers[current].latitude, markers[current].longitude]);
        }   
        $('.nav').render(markers[current]);
    }

}(L, MQ, $));