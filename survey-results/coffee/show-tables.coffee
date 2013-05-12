@showTables = (confidenceLevels, feelingLevels) ->
  showConfidenceTable(confidenceLevels)
  showFeelingTable(feelingLevels)
  
showConfidenceTable = (confidenceLevels) ->
  confidenceTableElem = getConfidenceTableElement()
  showTable(confidenceTableElem, confidenceLevels, "C++-Programmier-Selbstwirksamkeitserwartungen")

showFeelingTable = (feelingLevels) ->
  feelingTableElem = getFeelingTableElem()
  showTable(feelingTableElem, feelingLevels, "Wohlfühlfaktor")

getConfidenceTableElement = ->
  return $('#confidenceTable')
  
getFeelingTableElem = ->
  return $('#feelingTable')

showTable = (tableElem, answerLevels, tableCaption) ->  
  fillTableElement(tableElem, answerLevels, tableCaption)
  visualizeTableElement(tableElem)
  
fillTableElement = (tableElem, answerLevels, tableCaption) ->
  addTableHeaders(tableElem, tableCaption)
  fillData(tableElem, answerLevels)
  
addTableHeaders = (tableElem, tableCaption) ->
  tableElem.append("
  <caption>#{tableCaption}</caption>
  <thead>
		<tr>
			<td>Woche / <br/> Gruppe</td>
			<th scope='col'>0</th>
			<th scope='col'>2</th>
			<th scope='col'>3</th>
			<th scope='col'>4</th>
		</tr>
	</thead>
  ")

fillData = (tableElem, answerLevels) ->
  tableBodyHTML = createTableBodyHTML(answerLevels)
  tableElem.append(tableBodyHTML)
  
createTableBodyHTML = (answerLevels) ->
  tableBodyHTML = '<tbody>'
  for weeks, groupNr in answerLevels
    tableBodyHTML += "<tr><th scope='row'> #{getGroupName(groupNr)}</th>"
    for answerLevel in weeks
      tableBodyHTML += "<td>#{answerLevel.average.toFixed(2)}</td>"
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
  

