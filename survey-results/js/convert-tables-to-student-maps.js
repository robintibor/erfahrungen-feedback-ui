(function() {
  var Group1, Group2, Group3, GroupAll, Groups, addRowToStudentMap, addStudentAnswerToStudentMap, addTableToStudentMap, getDateFromRow, getGroupLevels, getNumberOfAnswersFromRow, getStudentNameFromRow, getSumFromRow;

  Group1 = ["Alien", "lz33", "mk211", "mk488", "mp208", "R2D2", "Rechenzentrumskürzel"];

  Group2 = ["cs434", "fb165", "hj22", "mr252", "sb404"];

  Group3 = ["bh102", "ck76", "js542", "mp121", "mz70"];

  GroupAll = Group1.concat(Group2).concat(Group3);

  Groups = [GroupAll, Group1, Group2, Group3];

  this.convertTablesToGroupLevels = function(tables) {
    var studentsToTables, vertrauenLevels, wohlfuehlLevels;

    studentsToTables = convertTablesToStudentMaps(tables);
    vertrauenLevels = getGroupLevels(studentsToTables.programmierVertrauen, Groups);
    wohlfuehlLevels = getGroupLevels(studentsToTables.wohlfuehlFaktor, Groups);
    return {
      programmierVertrauen: vertrauenLevels,
      wohlfuehlFaktor: wohlfuehlLevels
    };
  };

  getGroupLevels = function(studentsToResponses, groups) {
    var answer, groupLevel, groupLevels, groupNr, student, studentAnswers, studentGroup, week, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref;

    groupLevels = [];
    for (groupNr = _i = 0, _len = groups.length; _i < _len; groupNr = ++_i) {
      studentGroup = groups[groupNr];
      groupLevels[groupNr] = [];
      for (_j = 0, _len1 = studentGroup.length; _j < _len1; _j++) {
        student = studentGroup[_j];
        studentAnswers = studentsToResponses[student];
        for (week = _k = 0, _len2 = studentAnswers.length; _k < _len2; week = ++_k) {
          answer = studentAnswers[week];
          if (!groupLevels[groupNr][week]) {
            groupLevels[groupNr][week] = {
              sum: 0,
              responses: 0,
              students: 0,
              averagesSum: 0
            };
          }
          groupLevels[groupNr][week].sum += answer.sum;
          groupLevels[groupNr][week].averagesSum += answer.average;
          groupLevels[groupNr][week].responses += answer.responses;
          groupLevels[groupNr][week].students++;
        }
      }
    }
    for (groupNr = _l = 0, _len3 = groups.length; _l < _len3; groupNr = ++_l) {
      studentGroup = groups[groupNr];
      _ref = groupLevels[groupNr];
      for (week = _m = 0, _len4 = _ref.length; _m < _len4; week = ++_m) {
        groupLevel = _ref[week];
        groupLevel.average = groupLevel.averagesSum / groupLevel.students;
      }
    }
    return groupLevels;
  };

  this.convertTablesToStudentMaps = function(tables) {
    var studentsToTables;

    studentsToTables = {};
    addTableToStudentMap(tables.programmierVertrauen, "programmierVertrauen", studentsToTables);
    addTableToStudentMap(tables.wohlfuehlFaktor, "wohlfuehlFaktor", studentsToTables);
    return studentsToTables;
  };

  addTableToStudentMap = function(table, surveyName, studentsToTables) {
    var row, _i, _len, _ref, _results;

    studentsToTables[surveyName] = {};
    _ref = table.responses;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      row = _ref[_i];
      _results.push(addRowToStudentMap(row, studentsToTables[surveyName]));
    }
    return _results;
  };

  addRowToStudentMap = function(row, studentsToResponsesThisSurvey) {
    var date, numberOfAnswers, studentName, sumOfAnswers;

    studentName = getStudentNameFromRow(row);
    date = getDateFromRow(row);
    sumOfAnswers = getSumFromRow(row);
    numberOfAnswers = getNumberOfAnswersFromRow(row);
    return addStudentAnswerToStudentMap(studentName, date, sumOfAnswers, numberOfAnswers, studentsToResponsesThisSurvey);
  };

  getStudentNameFromRow = function(row) {
    return row[6];
  };

  getDateFromRow = function(row) {
    return row[1];
  };

  getSumFromRow = function(row) {
    return row.slice(7).reduce(function(numberA, numberB) {
      return (typeof numberA === "number" ? numberA : 0) + (typeof numberB === "number" ? numberB : 0);
    });
  };

  getNumberOfAnswersFromRow = function(row) {
    return row.slice(7).filter(function(response) {
      return typeof response === "number";
    }).length;
  };

  addStudentAnswerToStudentMap = function(studentName, date, sumOfAnswers, numberOfAnswers, studentsToResponsesThisSurvey) {
    var studentAnswer;

    if (studentsToResponsesThisSurvey[studentName] == null) {
      studentsToResponsesThisSurvey[studentName] = [];
    }
    studentAnswer = {
      date: date,
      sum: sumOfAnswers,
      responses: numberOfAnswers,
      average: sumOfAnswers / numberOfAnswers
    };
    return studentsToResponsesThisSurvey[studentName].push(studentAnswer);
  };

}).call(this);
