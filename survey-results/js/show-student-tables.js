(function() {
  var appendStudentTable, createTableHTML, padNumberString, showStudentTable,
    __hasProp = {}.hasOwnProperty;

  this.showStudentTables = function(studentsToTables) {
    var studentsToResponses, surveyName, _results;

    _results = [];
    for (surveyName in studentsToTables) {
      if (!__hasProp.call(studentsToTables, surveyName)) continue;
      studentsToResponses = studentsToTables[surveyName];
      _results.push(showStudentTable(surveyName, studentsToResponses));
    }
    return _results;
  };

  showStudentTable = function(surveyName, studentsToResponses) {
    var tableHTML;

    tableHTML = createTableHTML(surveyName, studentsToResponses);
    return appendStudentTable(tableHTML);
  };

  createTableHTML = function(surveyName, studentsToResponses) {
    var date, dateString, response, responses, student, tableHTML, _i, _j, _len, _len1, _ref;

    tableHTML = "<table>\n" + ("<caption> " + surveyName + "</caption>\n");
    _ref = Object.keys(studentsToResponses).sort();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      student = _ref[_i];
      responses = studentsToResponses[student];
      tableHTML += "<tr><td>" + student + "</td>";
      for (_j = 0, _len1 = responses.length; _j < _len1; _j++) {
        response = responses[_j];
        date = new Date(response.date);
        dateString = date.getDate() + "." + (date.getMonth() + 1) + ".(" + padNumberString(date.getHours(), 2) + ":" + padNumberString(date.getMinutes(), 2) + ")";
        tableHTML += "<td>" + dateString + "</td>";
      }
      tableHTML += "</tr>\n";
    }
    tableHTML += "</table>\n";
    return tableHTML;
  };

  padNumberString = function(n, width, z) {
    z = z || '0';
    n = n + '';
    if (n.length >= width) {
      return n;
    } else {
      return new Array(width - n.length + 1).join(z) + n;
    }
  };

  appendStudentTable = function(table) {
    return $('#studentTables').append(table);
  };

}).call(this);
