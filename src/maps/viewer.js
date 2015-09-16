var L = require('leaflet');
require('leaflet-draw');
var $ = require('jquery');

L.Icon.Default.imagePath = 'images';

var map;
init();

function init() {
	$.get('https://raw.githubusercontent.com/skray/maps-api/master/maps/' + getQueryParams().id + '.json')
		.then(JSON.parse)
		.then(buildMap);
}

function buildMap(currentMapData) {
    map = L.map('map').setView(currentMapData.center, currentMapData.zoom);

    L.tileLayer('http://{s}.tiles.mapbox.com/v3/seankennethray.map-zjkq5g6o/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    }).addTo(map);

    if(currentMapData.line) {
        map.addLayer(new L.polyline(currentMapData.line, {smoothFactor:1.0}));
    };
}

function getQueryParams() {
    var query_string = {};
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if (typeof query_string[pair[0]] === "undefined") {
          query_string[pair[0]] = pair[1];
        } else if (typeof query_string[pair[0]] === "string") {
          var arr = [ query_string[pair[0]], pair[1] ];
          query_string[pair[0]] = arr;
        } else {
          query_string[pair[0]].push(pair[1]);
        }
    }
    return query_string;
}