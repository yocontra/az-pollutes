var businesses = require('../../data/businesses-geojson');
//var plumes = require('../../data/plumes-geojson');
//var kmlJoined = require('../../data/kml-joined-all-geojson');

var geoserver = 'http://geoload.terradex.com/geoserver/wms';
var map = L.map('map', {
  scrollWheelZoom: false,
  touchZoom: false,
  attributionControl: false,
  doubleClickZoom: false
}).setView([33.45, -112.0667], 10);

L.tileLayer('http://{s}.tiles.mapbox.com/v3/contracontra.iog333n8/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);

// add businesses data
L.geoJson(businesses, {
  onEachFeature: addBusinessPopups,
  pointToLayer: circleMarker
}).addTo(map);

// add businesses data
/*
L.geoJson(kmlJoined, {
  pointToLayer: circleMarker
}).addTo(map);
*/

/*
// add plume data
L.geoJson(plumes, {
  style: function(feature) {
      return {color: '#ff0000'};
  }
}).addTo(map);
*/

function addBusinessPopups(feature, layer) {
  var popupContent = '<div class="map-item">';
  popupContent += '<p><b>Company:</b>&nbsp;'+feature.properties.company+'</p>';
  popupContent += '<p><b>Address:</b>&nbsp;'+feature.properties.address+'</p>';
  popupContent += '<p><b>Polluting:</b></p>';
  feature.properties.pollutants.forEach(function(pollutant){
    var date = moment(pollutant.since).fromNow();
    popupContent += '<p>"'+pollutant.pollutant+'" since '+date;
  });
  popupContent += '</div>';
  layer.bindPopup(popupContent);
}

function circleMarker(feature, latlng) {
  return L.circleMarker(latlng, {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  });
}