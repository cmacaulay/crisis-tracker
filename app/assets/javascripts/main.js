$(document).ready(function() {
  $.ajax({
    method: "GET",
    url: "https://www.humanitarianresponse.info/api/v1.0/disasters?filter[status]=current",
  })
  .done(function( disasters ) {
    console.log( disasters );
    console.log( disasters );
    console.log( disasters["data"].length );
    var disasterString = ""
    disasters["data"].forEach ( function(disaster){
      disasterString = disasterString + formatDisaster(disaster)
    } )
    $("#name").append( disasterString );
  });
})

function formatDisaster(disaster) {
  return "<li>Name: "
  + disaster["label"]
  + "</li>\n<ul><li>Description: "
  + disaster["body-html"]
  + "</li><li>Type: "
  + disaster["primary_type"]
  + "</li></ul>"
}
