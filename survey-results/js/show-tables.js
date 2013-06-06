(function() {
  var addTableHeaders, createTableBodyHTML, fillData, fillTableElement, getConfidenceTableElement, getFeelingTableElem, getGroupName, getWeekLabel, showConfidenceTable, showFeelingTable, showTable, visualizeTableElement;

  this.showTables = function(groupLevels) {
    showConfidenceTable(groupLevels.programmierVertrauen);
    return showFeelingTable(groupLevels.wohlfuehlFaktor);
  };

  showConfidenceTable = function(confidenceLevels) {
    var confidenceTableElem, surveyWeeks, topValue;

    confidenceTableElem = getConfidenceTableElement();
    surveyWeeks = [0, 2, 3, 4, 5];
    topValue = 7;
    return showTable(confidenceTableElem, confidenceLevels, "C++-Programmier-Selbstwirksamkeitserwartungen", surveyWeeks, topValue);
  };

  showFeelingTable = function(feelingLevels) {
    var feelingTableElem, surveyWeeks, topValue;

    feelingTableElem = getFeelingTableElem();
    surveyWeeks = [2, 3, 4, 5];
    topValue = 5;
    return showTable(feelingTableElem, feelingLevels, "Wohlfühlfaktor", surveyWeeks, topValue);
  };

  getConfidenceTableElement = function() {
    return $('#confidenceTable');
  };

  getFeelingTableElem = function() {
    return $('#feelingTable');
  };

  showTable = function(tableElem, answerLevels, tableCaption, weeks, topValue) {
    fillTableElement(tableElem, answerLevels, tableCaption, weeks);
    return visualizeTableElement(tableElem, topValue);
  };

  fillTableElement = function(tableElem, answerLevels, tableCaption, weeks) {
    addTableHeaders(tableElem, tableCaption, weeks);
    return fillData(tableElem, answerLevels);
  };

  addTableHeaders = function(tableElem, tableCaption, weeks) {
    var tableHeaders, week, weekLabel, _i, _len;

    tableHeaders = "  <caption>" + tableCaption + "</caption>  <thead>  	<tr>  	<td>Ende von Woche / <br/> Gruppe</td>";
    for (_i = 0, _len = weeks.length; _i < _len; _i++) {
      week = weeks[_i];
      weekLabel = getWeekLabel(week);
      tableHeaders += "<th scope='col'>" + weekLabel + "</th>";
    }
    tableHeaders += "  	</tr>	</thead>";
    return tableElem.append(tableHeaders);
  };

  getWeekLabel = function(week) {
    switch (week) {
      case 3:
        return "3 (nach Übung 1)";
      case 4:
        return "4 (nach Übung 2)";
      case 5:
        return "5 (nach Übung 3)";
      default:
        return week;
    }
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
        tableBodyHTML += "<td>" + (answerLevel.average.toFixed(2)) + " (" + answerLevel.students + ")</td>";
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

  visualizeTableElement = function(tableElem, topValue) {
    return tableElem.visualize({
      type: 'line',
      width: '600px',
      bottomValue: 1,
      topValue: topValue
    });
  };

}).call(this);
