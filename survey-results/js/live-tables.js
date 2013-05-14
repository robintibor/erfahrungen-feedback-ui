(function() {
  $.ajax({
    url: "http://zukunfts-management.de/c++-umfrage-ergebnisse/index.php",
    cache: false,
    dataType: 'jsonp',
    success: function(tables) {
      var groupLevels, studentTables;

      studentTables = convertTablesToStudentMaps(tables);
      groupLevels = convertTablesToGroupLevels(tables);
      showStudentTables(studentTables);
      return showTables(groupLevels);
    }
  });

}).call(this);
