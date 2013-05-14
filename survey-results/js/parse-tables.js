(function() {
  var Group1, Group2, Group3, GroupAll, Groups, countAnswers, createTableGroupSums, sumAnswers;

  Group1 = ["Rechenzentrumskürzel", "mp208", "Alien", "R2D2", "Beratel", "sk163", "mk488", "mk211"];

  Group2 = ["fb165", "hj22", "sb404", "cs434", "mr252"];

  Group3 = ["Alien", "mz70", "js542", "bh102", "mp121"];

  GroupAll = Group1.concat(Group2).concat(Group3);

  Groups = [GroupAll, Group1, Group2, Group3];

  createTableGroupSums = function(Groups, table, sumAnswersFunction, countAnswerFunction) {
    var groupLevel, groupLevels, groupNr, levelsThisStudent, numAnswers, responseRow, student, studentGroup, studentSum, tableThisGroup, week, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref;

    groupLevels = [];
    for (groupNr = _i = 0, _len = Groups.length; _i < _len; groupNr = ++_i) {
      studentGroup = Groups[groupNr];
      tableThisGroup = $.grep(table, function(row) {
        var pseudonym;

        pseudonym = row[6];
        return $.inArray(pseudonym, studentGroup) !== -1;
      });
      groupLevels[groupNr] = [];
      for (_j = 0, _len1 = studentGroup.length; _j < _len1; _j++) {
        student = studentGroup[_j];
        levelsThisStudent = $.grep(tableThisGroup, function(row) {
          var pseudonym;

          pseudonym = row[6];
          return student === pseudonym;
        });
        for (week = _k = 0, _len2 = levelsThisStudent.length; _k < _len2; week = ++_k) {
          responseRow = levelsThisStudent[week];
          if (groupLevels[groupNr][week] == null) {
            groupLevels[groupNr][week] = {
              sum: 0,
              responses: 0,
              students: 0
            };
          }
          studentSum = sumAnswersFunction(responseRow);
          numAnswers = countAnswerFunction(responseRow);
          groupLevels[groupNr][week].sum += studentSum;
          groupLevels[groupNr][week].responses += numAnswers;
          groupLevels[groupNr][week].students++;
        }
      }
    }
    for (groupNr = _l = 0, _len3 = Groups.length; _l < _len3; groupNr = ++_l) {
      studentGroup = Groups[groupNr];
      _ref = groupLevels[groupNr];
      for (week = _m = 0, _len4 = _ref.length; _m < _len4; week = ++_m) {
        groupLevel = _ref[week];
        groupLevel.average = groupLevel.sum / groupLevel.responses;
      }
    }
    return groupLevels;
  };

  countAnswers = function(responseRow) {
    return responseRow.slice(7).filter(function(response) {
      return typeof response === "number";
    }).length;
  };

  sumAnswers = function(responseRow) {
    return responseRow.slice(7).reduce(function(numberA, numberB) {
      return (typeof numberA === "number" ? numberA : 0) + (typeof numberB === "number" ? numberB : 0);
    });
  };

  this.parseAndShowTables = function(tables) {
    var confidenceLevels, feelingLevels;

    confidenceLevels = createTableGroupSums(Groups, tables['programmierVertrauen'].responses, sumAnswers, countAnswers);
    feelingLevels = createTableGroupSums(Groups, tables['wohlfuehlFaktor'].responses, sumAnswers, countAnswers);
    return showTables(confidenceLevels, feelingLevels);
  };

}).call(this);
