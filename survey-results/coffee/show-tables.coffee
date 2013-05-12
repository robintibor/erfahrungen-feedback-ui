@showTables = (confidenceLevels, feelingLevels) ->
  showConfidenceTable(confidenceLevels)
  showFeelingTable(feelingLevels)
  
showConfidenceTable = (confidenceLevels) ->
  confidenceTableElem = getConfidenceTableElement()
  showTable(confidenceTableElem, confidenceLevels)

showTable = (tableElem, answerLevels) ->  
  fillTableElement(tableElem, answerLevels)
  visualizeTableElement(tableElem)

getConfidenceTableElement = ->
  return $('#confidenceTable')
  
fillTableElement = (tableElem, answerLevels) ->
  addConfidenceHeaders(tableElem)
  fillData(tableElem, answerLevels)
  
addConfidenceHeaders = (confidenceTableElem) ->
  confidenceTableElem.append('
  <caption>C++-Programmier-Selbstwirksamkeitserwartungen</caption>
  <thead>
		<tr>
			<td>Woche / <br/> Gruppe</td>
			<th scope="col">0</th>
			<th scope="col">2</th>
			<th scope="col">3</th>
			<th scope="col">4</th>
		</tr>
	</thead>
  ')

fillData = (confidenceTableElem, confidenceLevels) ->
  tableBodyHTML = createTableBodyHTML(confidenceLevels)
  confidenceTableElem.append(tableBodyHTML)
  
createTableBodyHTML = (confidenceLevels) ->
  tableBodyHTML = '<tbody>'
  for weeks, groupNr in confidenceLevels
    tableBodyHTML += "<tr><th scope='row'> #{getGroupName(groupNr)}</th>"
    for confidenceLevel in weeks
      tableBodyHTML += "<td>#{confidenceLevel.average.toFixed(2)}</td>"
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
  

