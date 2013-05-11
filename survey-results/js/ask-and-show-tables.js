(function() {
  $.ajax({
    url: "http://zukunfts-management.de/c++-umfrage-ergebnisse/index.php",
    cache: false,
    dataType: 'jsonp',
    success: function(tables) {
      return console.log(tables);
    }
  });

}).call(this);
