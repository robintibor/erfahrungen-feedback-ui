@showTables = (confidenceLevels, feelingLevels) ->
  showConfidenceTable(confidenceLevels)
  showFeelingTable(feelingLevels)
  
showConfidenceTable = (confidenceLevels) ->
  confidenceTableElem = getConfidenceTableElement()
  surveyWeeks = [0, 2, 3, 4]
  showTable(confidenceTableElem, confidenceLevels, "C++-Programmier-Selbstwirksamkeitserwartungen", surveyWeeks)

showFeelingTable = (feelingLevels) ->
  feelingTableElem = getFeelingTableElem()
  surveyWeeks = [2, 3, 4]
  showTable(feelingTableElem, feelingLevels, "Wohlfühlfaktor", surveyWeeks)

getConfidenceTableElement = ->
  return $('#confidenceTable')
  
getFeelingTableElem = ->
  return $('#feelingTable')

showTable = (tableElem, answerLevels, tableCaption, weeks) ->  
  fillTableElement(tableElem, answerLevels, tableCaption, weeks)
  visualizeTableElement(tableElem)
  
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
    tableHeaders += "<th scope='col'>#{week}</th>"
  tableHeaders +="
  	</tr>
	</thead>"
  tableElem.append(tableHeaders)

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

visualizeTableElement = (tableElem) ->
  tableElem.visualize({type: 'line', width: '600px'})
  

