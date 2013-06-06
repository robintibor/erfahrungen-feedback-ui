@showTables = (groupLevels) ->
  showConfidenceTable(groupLevels.programmierVertrauen)
  showFeelingTable(groupLevels.wohlfuehlFaktor)
  
showConfidenceTable = (confidenceLevels) ->
  confidenceTableElem = getConfidenceTableElement()
  surveyWeeks = [0, 2, 3, 4, 5]
  topValue = 7
  showTable(confidenceTableElem, confidenceLevels, "C++-Programmier-Selbstwirksamkeitserwartungen", surveyWeeks, topValue)

showFeelingTable = (feelingLevels) ->
  feelingTableElem = getFeelingTableElem()
  surveyWeeks = [2, 3, 4, 5]
  topValue = 5
  showTable(feelingTableElem, feelingLevels, "Wohlfühlfaktor", surveyWeeks, topValue)

getConfidenceTableElement = ->
  return $('#confidenceTable')
  
getFeelingTableElem = ->
  return $('#feelingTable')

showTable = (tableElem, answerLevels, tableCaption, weeks, topValue) ->  
  fillTableElement(tableElem, answerLevels, tableCaption, weeks)
  visualizeTableElement(tableElem, topValue)
  
fillTableElement = (tableElem, answerLevels, tableCaption, weeks) ->
  addTableHeaders(tableElem, tableCaption, weeks)
  fillData(tableElem, answerLevels)
  
addTableHeaders = (tableElem, tableCaption, weeks) ->
  tableHeaders = "
  <caption>#{tableCaption}</caption>
  <thead>
  	<tr>
  	<td>Ende von Woche / <br/> Gruppe</td>"
  for week in weeks
    weekLabel = getWeekLabel(week)
    tableHeaders += "<th scope='col'>#{weekLabel}</th>"
  tableHeaders +="
  	</tr>
	</thead>"
  tableElem.append(tableHeaders)

getWeekLabel = (week) ->
  switch week
    when 3 then return "3 (nach Übung 1)"
    when 4 then return "4 (nach Übung 2)"
    when 5 then return "5 (nach Übung 3)"
    else return week

fillData = (tableElem, answerLevels) ->
  tableBodyHTML = createTableBodyHTML(answerLevels)
  tableElem.append(tableBodyHTML)
  
createTableBodyHTML = (answerLevels) ->
  tableBodyHTML = '<tbody>'
  for weeks, groupNr in answerLevels
    tableBodyHTML += "<tr><th scope='row'> #{getGroupName(groupNr)}</th>"
    for answerLevel in weeks
      tableBodyHTML += "<td>#{answerLevel.average.toFixed(2)} (#{answerLevel.students})</td>"
    tableBodyHTML += "</tr>"
  tableBodyHTML += '</tbody>'
  return tableBodyHTML

getGroupName = (groupNr) ->
  switch groupNr
    when 0 then "Alle"
    when 1 then "1 (TDD, -, PP)"
    when 2 then "2 (PP, TDD, -)"
    when 3 then "3 (-, PP, TDD)"

visualizeTableElement = (tableElem, topValue) ->
  tableElem.visualize(
    {
      type: 'line', 
      width: '600px',
      bottomValue: 1,
      topValue: topValue
    }
  )
  

