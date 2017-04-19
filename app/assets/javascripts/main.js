$(document).ready(function() {
  // Call functions

  fetchDisasters();
  createDisasterList();

function fetchDisasters() {
  $.ajax({
    method: "GET",
    url: "https://www.humanitarianresponse.info/api/v1.0/disasters?filter[status]=current",
  }).then(function( disasters ))  
}

  .done(function( disasters ) {
    console.log( disasters );
    console.log( disasters );
    console.log( disasters["data"].length );
    var disasterString = ""
    disasters["data"].forEach ( function(disaster){
      disasterString = disasterString + formatDisaster(disaster)
      disaster["operation"].forEach ( function(operation){
        debugger
        $.ajax({
          method: "GET",
          url: operation["self"],
        })
      })
    } )
    $("#name").append( disasterString );
  });
})

function formatDisaster(disaster) {
  return "<li>Name: " + disaster["label"] + "</li>\n<ul><li>Description: " + disaster["body-html"] + "</li><li>Type: " + disaster["primary_type"] + "</li></ul>"
}