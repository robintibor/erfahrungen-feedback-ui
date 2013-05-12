(function() {
  var addConfidenceHeaders, createTableBodyHTML, fillData, fillTableElement, getConfidenceTableElement, getGroupName, showConfidenceTable, showTable, visualizeTableElement;

  this.showTables = function(confidenceLevels, feelingLevels) {
    showConfidenceTable(confidenceLevels);
    return showFeelingTable(feelingLevels);
  };

  showConfidenceTable = function(confidenceLevels) {
    var confidenceTableElem;

    confidenceTableElem = getConfidenceTableElement();
    return showTable(confidenceTableElem, confidenceLevels);
  };

  showTable = function(tableElem, answerLevels) {
    fillTableElement(tableElem, answerLevels);
    return visualizeTableElement(tableElem);
  };

  getConfidenceTableElement = function() {
    return $('#confidenceTable');
  };

  fillTableElement = function(tableElem, answerLevels) {
    addConfidenceHeaders(tableElem);
    return fillData(tableElem, answerLevels);
  };

  addConfidenceHeaders = function(confidenceTableElem) {
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
    var confidenceLevel, groupNr, tableBodyHTML, weeks, _i, _j, _len, _len1;

    tableBodyHTML = '<tbody>';
    for (groupNr = _i = 0, _len = confidenceLevels.length; _i < _len; groupNr = ++_i) {
      weeks = confidenceLevels[groupNr];
      tableBodyHTML += "<tr><th scope='row'> " + (getGroupName(groupNr)) + "</th>";
      for (_j = 0, _len1 = weeks.length; _j < _len1; _j++) {
        confidenceLevel = weeks[_j];
        tableBodyHTML += "<td>" + (confidenceLevel.average.toFixed(2)) + "</td>";
      }
      tableBodyHTML += "</tr>";
    }
    tableBodyHTML += '</tbody>';
    return tableBodyHTML;
  };

  getGroupName = function(groupNr) {
    switch (groupNr) {
      case 0:
        return "Alle";
      case 1:
        return "1 (TDD, -, PP)";
      case 2:
        return "2 (PP, TDD, -)";
      case 3:
        return "3 (-, PP, TDD)";
    }
  };

  visualizeTableElement = function(tableElem) {
    return tableElem.visualize({
      type: 'line',
      width: '600px'
    });
  };

}).call(this);
