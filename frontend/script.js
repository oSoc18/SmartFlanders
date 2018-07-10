$( document ).ready(function() {
  console.log( "ready!" );
  $("#form-address").submit((event) => {
    event.preventDefault();
    var postcode = document.getElementById("postcode").value;
    var street = document.getElementById("street").value;
    var number = document.getElementById("number").value;

    $.ajax({
      // The URL for the request
      url: "http://localhost/transform",

      // The data to send (will be converted to a query string)
      data: {
        "postcode": postcode,
        "street": street,
        "number": number
      },

      // Whether this is a POST or GET request
      type: "POST",

      // The type of data we expect back
      dataType : "json",
    })
    // Code to run if the request succeeds (is done);
    // The response is passed to the function
    .done(function( json ) {
       $( "<h1>" ).text( json.title ).appendTo( "body" );
       $( "<div class=\"content\">").html( json.html ).appendTo( "body" );
    })
    // Code to run if the request fails; the raw request and
    // status codes are passed to the function
    .fail(function( xhr, status, errorThrown ) {
      alert( "Sorry, there was a problem!" );
      console.log( "Error: " + errorThrown );
      console.log( "Status: " + status );
      console.dir( xhr );
    })
    // Code to run regardless of success or failure;
    .always(function( xhr, status ) {
      alert( "The request is complete!" );
    });

  })
  var checkBuildingAddress = function() {

    // get building
  }

  // var checkBuildingUri = function() {
  //   var uri = document.getElementById("uri").value;
  //
  //   // check values
  //
  //   // get building
  //   document.getElementById("building").innerHTML = uri;
  // }
  //
  // var addInfo = function() {
  //
  // }
});
