$.ajax({
  url: "http://zukunfts-management.de/c++-umfrage-ergebnisse/index.php",
  cache: false,
  dataType: 'jsonp',
  success: (tables) ->
    console.log("tables", tables)
    parseAndShowTables(tables)
});