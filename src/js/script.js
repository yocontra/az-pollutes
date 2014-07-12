var geojsonFeature = require('../../data/businesses-geojson');

var map = L.map('map').setView([33.45, -112.0667], 10);

L.tileLayer('http://{s}.tiles.mapbox.com/v3/contracontra.iog333n8/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);

// add businesses data
L.geoJson(geojsonFeature, {
  onEachFeature: addPopups,
  pointToLayer: addCircleMarker
}).addTo(map);

function addPopups(feature, layer) {
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

function addCircleMarker(feature, latlng) {
  return L.circleMarker(latlng, {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  });
}