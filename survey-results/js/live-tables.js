(function() {
  $.ajax({
    url: "http://zukunfts-management.de/c++-umfrage-ergebnisse/index.php",
    cache: false,
    dataType: 'jsonp',
    success: function(tables) {
      console.log("tables", tables);
      return parseAndShowTables(tables);
    }
  });

}).call(this);
