$("#search-submit").submit(function(e) {
    window.localStorage.setItem("postcode", $("#postcode").val())
})
$("#gebouweenheden").submit((e) => {
    $('<input />').attr('type', 'hidden')
           .attr('name', "postcode")
           .attr('value', window.localStorage.getItem("postcode"))
           .appendTo('#gebouweenheden');
})