$(document).ready(function() {
  allDisasters();
})
var disastersObject = new Object();
disastersObject.data = new Array();

function allDisasters() {
  $.ajax({
        method: "GET",
        url: "https://www.humanitarianresponse.info/api/v1.0/disasters?filter[status]=current",
        })
    .then(function( disasters ) {
      fetchDisasters(disasters);
  })
}

var disasterString = ""
function fetchDisasters(disasters) {
  disasters["data"].forEach (function(disaster) {
    disasterObject = {}
    disasterObject["disaster"] = disaster["label"]
    disasterObject["type"] =  disaster["primary_type"]
      if (disaster["operation"]) {
        fetchCoordinates(disaster["operation"], disaster, disasterObject)
      }
    disastersObject.data.push(disasterObject)
  })
}

function fetchCoordinates(operations, disaster, disasterObject) {
      operations.forEach (function(operation) {
        $.ajax({
        	method: "GET",
        	url: operation.self
        })
        .then(function(operation){
          operationObject = {}
          disasterObject["operations"] =   []
          operationObject["country"] =  operation.data[0]["label"];
          operationObject["lat"] =  operation.data[0]["country"]["geolocation"]["lat"];
          operationObject["long"] =  operation.data[0]["country"]["geolocation"]["lon"];

          disasterObject["operations"].push(operationObject)
        })
        .then(function(operation){
          initMarkers(disastersObject);
        })
      })
  }
var name = ""
var type = ""
  L.mapbox.accessToken = 'pk.eyJ1IjoiY21hY2F1bGF5IiwiYSI6ImNqMWxxeGw4ZDAwMmwycW5vbTBkdnFteW0ifQ.m3rKIq58Xw-9GYbyfEfyqw';
  var mapLeaflet = L.mapbox.map('map-leaflet', 'mapbox.light')
    .setView([7.295889, 30.308701], 2);

    function initMarkers(disastersObject) {
        disastersObject["data"].forEach (function(disaster){
          name = disaster.disaster
          type = disaster.type
          if (disaster.operations) {
            disaster.operations.forEach (function(operation){
              var marker = L.marker([parseFloat(operation.lat), parseFloat(operation.long)]).addTo(mapLeaflet);

              var popupContent = "<h6>Country: "
                                + operation.country
                                + "</h6><br /><p>"
                                + name
                                + "</p><br />"
                                + type
                                + "</p>"

              marker.bindPopup(popupContent);

            })
          }

          })

    }

  mapLeaflet.scrollWheelZoom.disable();
