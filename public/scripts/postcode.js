$("#postcode").on('change', function() {
    var postcode = $("#postcode").val();
    console.log(postcode);

    $.ajax({
        type: "POST",
        url: "/service/postcode",
        data: postcode,
        success: success,
        dataType: dataType
    })
    .done(function(data) {
      alert(data);
    })
    .fail(function() {
      alert( "error" );
    })
    .always(function() {
      alert( "finished" );
    });
});