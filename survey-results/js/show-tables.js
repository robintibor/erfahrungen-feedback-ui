(function() {
  var addConfidenceHeaders, createTableBodyHTML, fillConfidenceTableElement, fillData, getConfidenceTableElement, showConfidenceTable;

  this.showTables = function(confidenceLevels, feelingLevels) {
    return showConfidenceTable(confidenceLevels);
  };

  showConfidenceTable = function(confidenceLevels) {
    var confidenceTableElem;

    confidenceTableElem = getConfidenceTableElement();
    return fillConfidenceTableElement(confidenceTableElem, confidenceLevels);
  };

  getConfidenceTableElement = function() {
    return $('#confidenceTable');
  };

  fillConfidenceTableElement = function(confidenceTableElem, confidenceLevels) {
    addConfidenceHeaders(confidenceTableElem);
    return fillData(confidenceTableElem, confidenceLevels);
  };

  addConfidenceHeaders = function(confidenceTableElem) {
    console.log("add headers to ", confidenceTableElem);
    return confidenceTableElem.append('\
  <caption>C++-Programmier-Selbstwirksamkeitserwartungen</caption>\
  <thead>\
		<tr>\
			<td>Woche / <br/> Gruppe</td>\
			<th scope="col">0</th>\
			<th scope="col">2</th>\
			<th scope="col">3</th>\
			<th scope="col">4</th>\
		</tr>\
	</thead>\
  ');
  };

  fillData = function(confidenceTableElem, confidenceLevels) {
    var tableBodyHTML;

    tableBodyHTML = createTableBodyHTML(confidenceLevels);
    return confidenceTableElem.append(tableBodyHTML);
  };

  createTableBodyHTML = function(confidenceLevels) {
    var groupNr, tableBodyHTML, week, _i, _len;

    tableBodyHTML = '<tbody>';
    for (groupNr = _i = 0, _len = confidenceLevels.length; _i < _len; groupNr = ++_i) {
      week = confidenceLevels[groupNr];
      tableBodyHTML += "<tr><td> " + groupNr + "</td>";
      console.log("groupNr", groupNr);
      console.log("week", week);
      tableBodyHTML += "</tr>";
    }
    tableBodyHTML += '</tbody>';
    return tableBodyHTML;
  };

}).call(this);
