# TDD - nada - PP
Group1 = ["Rechenzentrumskürzel", "mp208", "Alien", "R2D2", "Beratel", "sk163", "mk488", "mk211"]
# PP - TDD - nada
Group2 = ["fb165", "hj22", "sb404", "cs434", "mr252"]
# nada - PP - TDD
Group3 = ["Alien", "mz70", "lz33", "js542", "bh102"]

GroupAll = Group1.concat(Group2).concat(Group3)

Groups = [GroupAll, Group1, Group2, Group3]

createTableGroupSums = (Groups, table, sumAnswersFunction, countAnswerFunction) ->
  groupLevels = []
  for studentGroup, groupNr in Groups
    tableThisGroup = $.grep(table,
      (row) ->
        pseudonym = row[6]
        console.log("pseudonym", pseudonym)
        return $.inArray(pseudonym, studentGroup) != -1
    )
    groupLevels[groupNr] = []
    for student in studentGroup
      levelsThisStudent = $.grep(tableThisGroup,
        (row) ->
          pseudonym = row[6]
          return student == pseudonym
      )
      for responseRow, week in levelsThisStudent
        if (not groupLevels[groupNr][week]?)
          groupLevels[groupNr][week] = {sum: 0, responses: 0, students: 0}
        # replace with callback the recude thingy
        studentSum = sumAnswersFunction(responseRow)
        numAnswers = countAnswerFunction(responseRow)
        groupLevels[groupNr][week].sum += studentSum
        groupLevels[groupNr][week].responses += numAnswers
        groupLevels[groupNr][week].students++
  
  for studentGroup, groupNr in Groups
    for groupLevel, week in groupLevels[groupNr]
      groupLevel.average = groupLevel.sum / groupLevel.responses
      console.log("grouplevel for week #{week}:", groupLevel)
  
  return groupLevels

countAnswers = (responseRow) ->
  return responseRow[7..].filter((response) -> typeof response == "number").length

sumAnswers = (responseRow) ->
  return responseRow[7..].reduce((numberA, numberB) -> (if typeof numberA == "number" then numberA else 0) + (if typeof numberB == "number" then numberB else 0))

@parseAndShowTables = (tables) ->
  confidenceLevels = createTableGroupSums(Groups, tables['programmierVertrauen'].responses,
    sumAnswers,
    countAnswers
  )


  feelingLevels = createTableGroupSums(Groups, tables['wohlfuehlFaktor'].responses,
    sumAnswers,
    countAnswers
  )

  showTables(confidenceLevels, feelingLevels)