$(document).ready(function() {
  ajaxCall1();
})

function ajaxCall1() {
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
    disasterString = disasterString + formatDisaster(disaster)
    if (disaster["operation"]) {
      fetchCoordinates(disaster["operation"])
    }
  })
}

function formatDisaster(disaster) {
  return "<li>Name: "
  + disaster["label"]
  + "</li>\n<ul><li>Description: "
  + disaster["body-html"]
  + "</li><li>Type: "
  + disaster["primary_type"]
  + "</li></ul>"
}

function fetchCoordinates(operations) {
      operations.forEach (function(operation) {
        console.log( operation );
        $.ajax({
        	method: "GET",
        	url: operation.self
        })
        .then(function(coordinates){
          console.log(coordinates["data"][0]["country"]["geolocation"])
          debugger
        })
      })
  }
