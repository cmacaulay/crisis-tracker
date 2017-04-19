$(document).ready(function() {
  allDisasters();
  mapboxgl.accessToken = 'pk.eyJ1IjoiY21hY2F1bGF5IiwiYSI6ImNqMWxxeGw4ZDAwMmwycW5vbTBkdnFteW0ifQ.m3rKIq58Xw-9GYbyfEfyqw';
  var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/dark-v9', //hosted style id
      center: [-77.38, 39], // starting position
      zoom: 3 // starting zoom
  });
})

function allDisasters() {
  $.ajax({
        method: "GET",
        url: "https://www.humanitarianresponse.info/api/v1.0/disasters?filter[status]=current",
        })
    .then(function( disasters ) {
      console.log( disasters );
      fetchDisasters(disasters);
      $("#name").append( disasterString );
  })
}
var disasterString = ""

function fetchDisasters(disasters) {
  disasters["data"].forEach (function(disaster) {
    if (disaster["operation"]) {
      fetchCoordinates(disaster["operation"])
    }
    disasterString = disasterString + formatDisaster(disaster)
  })
}

function fetchCoordinates(operations) {
      operations.forEach (function(operation) {
        $.ajax({
        	method: "GET",
        	url: operation.self
        })
        .then(function(operation){
          console.log(formatCoordinates(operation.data[0]));
          test(formatCoordinates(operation.data[0]));
        })
      })
  }

function test(data){
  disasterString = disasterString + data
}

function formatDisaster(disaster) {
  return "<li>Name: "
  + disaster["label"]
  + "<ul></li>\n<li>Type: "
  + disaster["primary_type"]
  + "</li></ul>"
}

function formatCoordinates(data) {
  return "<ul><li>Country: "
  + data["label"]
  + "</li><li>Latitude: "
  + data["country"]["geolocation"]["lat"]
  + "</li><li>Longitute: "
  + data["country"]["geolocation"]["lon"]
  + "</li></ul>"
}
