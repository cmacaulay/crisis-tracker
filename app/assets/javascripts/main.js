$(document).ready(function() {
  allDisasters();
})
var disastersObject = new Object();

function allDisasters() {
  $.ajax({
        method: "GET",
        url: "https://www.humanitarianresponse.info/api/v1.0/disasters?filter[status]=current",
        })
    .then(function( disasters ) {
      console.log( disasters );
      fetchDisasters(disasters);
  })
  .done(function(disasters) {
    console.log(disastersObject);
  })
}
var disasterString = ""
var test = ""
function fetchDisasters(disasters) {
  disasters["data"].forEach (function(disaster) {
  disastersObject[disaster["label"]] = {}
  disastersObject[disaster["label"]]["type"] =  disaster["primary_type"]
    if (disaster["operation"]) {
      fetchCoordinates(disaster["operation"], disaster)
    }
  })
}

function fetchCoordinates(operations, disaster) {
      operations.forEach (function(operation) {
        $.ajax({
        	method: "GET",
        	url: operation.self
        })
        .then(function(operation){
          disastersObject[disaster["label"]][operation.data[0]["label"]] =   {};
          disastersObject[disaster["label"]][operation.data[0]["label"]]["operation id"] =   operation.data[0]["id"];
          disastersObject[disaster["label"]][operation.data[0]["label"]]["latitude"] =  operation.data[0]["country"]["geolocation"]["lat"];
          disastersObject[disaster["label"]][operation.data[0]["label"]]["longitute"] =  operation.data[0]["country"]["geolocation"]["lon"];
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
