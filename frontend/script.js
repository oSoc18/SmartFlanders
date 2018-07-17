$(document).ready(function () {
  // Get building by address
  $("#form-address").submit((event) => {
    event.preventDefault();
    var postcode = document.getElementById("postcode").value;
    var street = document.getElementById("street").value;
    var number = document.getElementById("number").value;

    $.ajax({
        // The URL for the request
        url: "http://localhost:3000/transform",
        beforeSend: function (request) {
          request.setRequestHeader("Access-Control-Allow-Origin", "*");
        },

        // The data to send (will be converted to a query string)
        data: {
          "postcode": postcode,
          "street": street,
          "number": number
        },

        // Whether this is a POST or GET request
        type: "POST",

        // The type of data we expect back
        dataType: "json",
      })
      // Code to run if the request succeeds (is done);
      // The response is passed to the function
      .done(function (json) {
        $.each(json.adressen, (key, value) => {
        $("<h1>").text(json.title).appendTo("body");
          $("#building").append('<option value=' + value.identificator.id + '>' + value.volledigAdres.geografischeNaam.spelling + '</option>');
        })
      })
    
    // Code to run if the request fails; the raw request and
    // status codes are passed to the function
    .fail(function (xhr, status, errorThrown) {
        alert("Geen gebouwen gevonden");
        console.log("Error: " + errorThrown);
        console.log("Status: " + status);
        console.dir(xhr);
      })
      // Code to run regardless of success or failure;
      .always(function (xhr, status) {
        $("#buildings").text("building");
      });
  })

  // Get building by uri
  $("#form-uri").submit((event) => {
    event.preventDefault();
    var uri = document.getElementById("uri").value;

    $.ajax({
        // The URL for the request
        url: "http://localhost/transform",

        // The data to send (will be converted to a query string)
        data: {
          "uri": uri
        },

        // Whether this is a POST or GET request
        type: "POST",

        // The type of data we expect back
        dataType: "json",
      })
      // Code to run if the request succeeds (is done);
      // The response is passed to the function
      .done(function (json) {
        $("<h1>").text(json.title).appendTo("body");
        $("<div class=\"content\">").html(json.html).appendTo("body");
      })
      // Code to run if the request fails; the raw request and
      // status codes are passed to the function
      .fail(function (xhr, status, errorThrown) {
        alert("Geen gebouw gevonden");
        console.log("Error: " + errorThrown);
        console.log("Status: " + status);
        console.dir(xhr);
      })
      // Code to run regardless of success or failure;
      .always(function (xhr, status) {
        alert("The request is complete!");
        $("#buildings").text("building");
      });
  })

  // Add info to building
  $("#form-info").submit((event) => {
    event.preventDefault();
   // var test = moment().minute($("#mo-start-am").val());
   // console.log(test);

    var type = $("#type").val();
    var category = $("select#category option:checked").val();
    var openinghours = {
      "monday": [$("#mo-start-am").val(), $("#mo-start-am").val(), $("#mo-start-pm").val(), $("#mo-start-pm").val()],
      "tuesday": [$("#tu-start-am").val(), $("#tu-start-am").val(), $("#tu-start-pm").val(), $("#tu-start-pm").val()],
      "wednesday": [$("#we-start-am").val(), $("#we-start-am").val(), $("#we-start-pm").val(), $("#we-start-pm").val()],
      "thursday": [$("#th-start-am").val(), $("#th-start-am").val(), $("#th-start-pm").val(), $("#th-start-pm").val()],
      "friday": [$("#fr-start-am").val(), $("#fr-start-am").val(), $("#fr-start-pm").val(), $("#fr-start-pm").val()],
      "saturday": [$("#sa-start-am").val(), $("#sa-start-am").val(), $("#sa-start-pm").val(), $("#sa-start-pm").val()],
      "sunday": [$("#su-start-am").val(), $("#su-start-am").val(), $("#su-start-pm").val(), $("#su-start-pm").val()]
    }

    $.ajax({
        // The URL for the request
        url: "http://localhost:3000/transform",

        // The data to send (will be converted to a query string)
        data: {
          "type": type,
          "category": category,
          "openinghours": openinghours
        },

        // Whether this is a POST or GET request
        type: "POST",

        // The type of data we expect back
        dataType: "json",
      })
      // Code to run if the request succeeds (is done);
      // The response is passed to the function
      .done(function (json) {
        $("<h1>").text(json.title).appendTo("body");
        $("<div class=\"content\">").html(json.html).appendTo("body");
      })
      // Code to run if the request fails; the raw request and
      // status codes are passed to the function
      .fail(function (xhr, status, errorThrown) {
        alert("Geen gebouw gevonden");
        console.log("Error: " + errorThrown);
        console.log("Status: " + status);
        console.dir(xhr);
      })
      // Code to run regardless of success or failure;
      .always(function (xhr, status) {
        alert("The request is complete!");
      });
  })
});