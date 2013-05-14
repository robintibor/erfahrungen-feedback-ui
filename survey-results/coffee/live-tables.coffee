$.ajax({
  url: "http://zukunfts-management.de/c++-umfrage-ergebnisse/index.php",
  cache: false,
  dataType: 'jsonp',
  success: (tables) ->
    studentTables = convertTablesToStudentMaps(tables)
    groupLevels = convertTablesToGroupLevels(tables)
    showStudentTables(studentTables)
    showTables(groupLevels)
});