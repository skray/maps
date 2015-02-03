(function(L, MQ) {

    var locations = [
        { pos: [38.804967,-90.113183], content: 'Lewis and Clark (Illinois) State Memorial Park at the confluence of the Mississippi and Missouri Rivers.'},
        { pos: [38.775967,-90.4841], content: 'Lewis and Clark Center - 701 Riverside Drive, St. Charles, MO'},
        { pos: [39.086767,-94.41935], content: 'Independence City, National Frontier Trails Center, 318 West Pacific, Independence, MO'},
        { pos: [40.264483,-95.57735], content: 'Indian Cave State Park, Schubert, NE'},
        { pos: [41.456267,-96.021683], content: 'Fort Atkinson State Historical Park, Ft Calhoun, Nebraska'},
        { pos: [42.042133,-96.1628], content: 'Lewis and Clark State Park, Onawa, Iowa'},
        { pos: [42.488733,-96.4085], content: 'Larsen Park, Sgt Floyd Museum, Sioux City'},
        { pos: [42.599983,-96.711133], content: 'Ponca State Park, Ponca, NE'},
        { pos: [42.857367,-97.550467], content: 'Lewis and Clark Recreation Area - Gavins Point - Yankton, South Dakota'},
        { pos: [44.373767,-100.339767], content: 'Cultural Heritage Center, Pierre, SD'},
        { pos: [46.81895,-100.780917], content: 'Statue of Sakajawea and Heritage Center, Bismarck, North Dakota'},
        { pos: [47.30245,-101.0374], content: 'Lewis and Clark Interpretive Center, Fort Mandan, North Dakota'},
        { pos: [47.982167,-102.5453], content: 'Crow Flies High Butte Historic Site, near Four Bears State Park, New Town, North Dakota'},
        { pos: [45.99525,-108.005383], content: 'Pompey\'s Pillar National Historic Landmark, Montana'},
        { pos: [47.529125,-111.235334], content: 'Lewis and Clark Interpretive Center, Great Falls, Montana'},
        { pos: [45.924,-111.498], content: 'Missouri River Headwaters State Park, Bozeman (Three Forks), Montana'},
        { pos: [46.635133,-114.579767], content: 'Lolo Pass Visitors Center, Missoula, Montana'},
        { pos: [46.422283,-117.029517], content: 'Nez Perce County Museum, Lewiston, Idaho'},
        { pos: [46.4075,-117.2203], content: 'Alpowai Interpretive Center, Clarkston, WA'},
        { pos: [46.20015,-119.04055], content: 'Sacajawea State Park, Pasco, Washington'},
        { pos: [45.613667,-121.119333], content: 'Viewpoint, The Dalles, Oregon'},
        { pos: [45.69225,-121.8942], content: 'Columbia Gorge Interpretive Center, Stevenson, Washington'},
        { pos: [45.816117,-122.758617], content: 'Ridgefield National Wildlife Refuge, Rigefield, Washington'},
        { pos: [46.1346,-123.880367], content: 'Fort Clatsop National Memorial, Astoria, Oregon'},
        { pos: [46.283617,-124.053733], content: 'Fort Canby State Park, Ilwaco, Washington'}
    ];
    var center = locations[0];
    var initialZoom = 11;
    var layers = [];
    var map;
    var current = 0;

    init();

    function init() {

        buildMap('mapquest');
        buildMarkersMap();  

        var nextBtn = document.getElementById('nextBtn');
        nextBtn.addEventListener('click', next);   
        var prevBtn = document.getElementById('prevBtn');
        prevBtn.addEventListener('click', prev);     

        $('.nav').render(locations[current]); 

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
        addMarkers(); 
    }

    function addMarkers() {
        removeLayers();

        for(var i=0; i < locations.length; i++) {
            layers.push(new L.marker(locations[i].pos));
            map.addLayer(layers[i]);
        }
    }

    function next() {
        if(current + 1 < locations.length) {
            current++;
            map.panTo(locations[current].pos);
        }

        $('.nav').render(locations[current]);
    }

    function prev() {
        if(current > 0) {
            current--;
            map.panTo(locations[current].pos);
        }   
        $('.nav').render(locations[current]);
    }

    function removeLayers() {
        for(var i=0; i < layers.length; i++) {
            map.removeLayer(layers[i]);
        }

        layers = [];
    }

}(L, MQ));