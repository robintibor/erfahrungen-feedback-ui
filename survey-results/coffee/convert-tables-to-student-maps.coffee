#date.getDate() + "." + (date.getMonth() + 1) + ".(" + date.getHours() + ":" + date.getMinutes() + ")"
# TDD - nada - PP
Group1 = ["Rechenzentrumskürzel", "mp208", "Alien", "R2D2", "Beratel", "sk163", "mk488", "mk211"]
# PP - TDD - nada
Group2 = ["fb165", "hj22", "sb404", "cs434", "mr252"]
# nada - PP - TDD
Group3 = ["Alien", "mz70", "js542", "bh102", "mp121"]

GroupAll = Group1.concat(Group2).concat(Group3)

Groups = [GroupAll, Group1, Group2, Group3]

@convertTablesToGroupLevels = (tables) ->
  studentsToTables = convertTablesToStudentMaps (tables)
  vertrauenLevels = getGroupLevels(studentsToTables, "programmierVertrauen", Groups)
  wohlfuehlLevels = getGroupLevels(studentsToTables, "wohlfuehlFaktor", Groups)
  return {programmierVertrauen: vertrauenLevels, wohlfuehlFaktor: wohlfuehlLevels}  
  
getGroupLevels = (studentsToTables, surveyName, groups) ->
  # go through all students sum up answers, at the end make average
  groupLevels = []
  for studentGroup, groupNr in groups
    groupLevels[groupNr] = []
    for student in studentGroup
      studentAnswers = studentsToTables[student][surveyName]
      for answer, week in studentAnswers
        if (not groupLevels[groupNr][week])
          groupLevels[groupNr][week] = {sum: 0, responses: 0, students: 0, averagesSum: 0}
        groupLevels[groupNr][week].sum += answer.sum
        groupLevels[groupNr][week].averagesSum += answer.average
        groupLevels[groupNr][week].responses += answer.responses
        groupLevels[groupNr][week].students++
  # compute averages
  for studentGroup, groupNr in groups
    for groupLevel, week in groupLevels[groupNr]
      groupLevel.average = groupLevel.averagesSum / groupLevel.students
  return groupLevels

@convertTablesToStudentMaps = (tables) ->
  studentsToTables = {}
  console.log(tables)
  addTableToStudentMap(tables.programmierVertrauen, "programmierVertrauen", studentsToTables)
  addTableToStudentMap(tables.wohlfuehlFaktor, "wohlfuehlFaktor", studentsToTables)
  console.log(studentsToTables)
  return studentsToTables
  
addTableToStudentMap = (table, surveyName, studentsToTables) ->
  for row in table.responses
    addRowToStudentMap(row, surveyName, studentsToTables)

addRowToStudentMap = (row, surveyName, studentsToTables) ->
  studentName = getStudentNameFromRow(row)
  date = getDateFromRow(row)
  sumOfAnswers = getSumFromRow(row)
  numberOfAnswers = getNumberOfAnswersFromRow(row)
  addStudentAnswerToStudentMap(studentName, date, sumOfAnswers, numberOfAnswers, surveyName, studentsToTables)
  
getStudentNameFromRow = (row) ->
  # student name should be at 7th position for all surveys ! :)
  return row[6]

getDateFromRow = (row) ->
  # completion date is always on field 2
  return row[1]
  
getSumFromRow = (row) ->
  # all answers before 8th are just time, name etc.
  # form 8th on answers are all numbers or symbols meaning "don't know"
  row[7..].reduce((numberA, numberB) -> (if typeof numberA == "number" then numberA else 0) + (if typeof numberB == "number" then numberB else 0))
  
getNumberOfAnswersFromRow = (row) ->
  return row[7..].filter((response) -> typeof response == "number").length

addStudentAnswerToStudentMap = (studentName, date, sumOfAnswers, numberOfAnswers, surveyName, studentsToTables) ->
  if (not studentsToTables[studentName]?)
    studentsToTables[studentName] = {}
  if (not studentsToTables[studentName][surveyName]?)
    studentsToTables[studentName][surveyName] = []
  studentAnswer = {date: date, sum: sumOfAnswers, responses: numberOfAnswers, average: sumOfAnswers / numberOfAnswers}
  studentsToTables[studentName][surveyName].push(studentAnswer)