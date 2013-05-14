(function() {
  $.ajax({
    url: "http://zukunfts-management.de/c++-umfrage-ergebnisse/index.php",
    cache: false,
    dataType: 'jsonp',
    success: function(tables) {
      var groupLevels;

      groupLevels = convertTablesToGroupLevels(tables);
      return showTables(groupLevels);
    }
  });

}).call(this);
