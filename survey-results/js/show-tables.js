(function() {
  var addTableHeaders, createTableBodyHTML, fillData, fillTableElement, getConfidenceTableElement, getFeelingTableElem, getGroupName, showConfidenceTable, showFeelingTable, showTable, visualizeTableElement;

  this.showTables = function(confidenceLevels, feelingLevels) {
    showConfidenceTable(confidenceLevels);
    return showFeelingTable(feelingLevels);
  };

  showConfidenceTable = function(confidenceLevels) {
    var confidenceTableElem;

    confidenceTableElem = getConfidenceTableElement();
    return showTable(confidenceTableElem, confidenceLevels, "C++-Programmier-Selbstwirksamkeitserwartungen");
  };

  showFeelingTable = function(feelingLevels) {
    var feelingTableElem;

    feelingTableElem = getFeelingTableElem();
    return showTable(feelingTableElem, feelingLevels, "Wohlfühlfaktor");
  };

  getConfidenceTableElement = function() {
    return $('#confidenceTable');
  };

  getFeelingTableElem = function() {
    return $('#feelingTable');
  };

  showTable = function(tableElem, answerLevels, tableCaption) {
    fillTableElement(tableElem, answerLevels, tableCaption);
    return visualizeTableElement(tableElem);
  };

  fillTableElement = function(tableElem, answerLevels, tableCaption) {
    addTableHeaders(tableElem, tableCaption);
    return fillData(tableElem, answerLevels);
  };

  addTableHeaders = function(tableElem, tableCaption) {
    return tableElem.append("  <caption>" + tableCaption + "</caption>  <thead>		<tr>			<td>Woche / <br/> Gruppe</td>			<th scope='col'>0</th>			<th scope='col'>2</th>			<th scope='col'>3</th>			<th scope='col'>4</th>		</tr>	</thead>  ");
  };

  fillData = function(tableElem, answerLevels) {
    var tableBodyHTML;

    tableBodyHTML = createTableBodyHTML(answerLevels);
    return tableElem.append(tableBodyHTML);
  };

  createTableBodyHTML = function(answerLevels) {
    var answerLevel, groupNr, tableBodyHTML, weeks, _i, _j, _len, _len1;

    tableBodyHTML = '<tbody>';
    for (groupNr = _i = 0, _len = answerLevels.length; _i < _len; groupNr = ++_i) {
      weeks = answerLevels[groupNr];
      tableBodyHTML += "<tr><th scope='row'> " + (getGroupName(groupNr)) + "</th>";
      for (_j = 0, _len1 = weeks.length; _j < _len1; _j++) {
        answerLevel = weeks[_j];
        tableBodyHTML += "<td>" + (answerLevel.average.toFixed(2)) + "</td>";
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
