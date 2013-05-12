@showTables = (confidenceLevels, feelingLevels) ->
  showConfidenceTable(confidenceLevels)
  #showFeelingTable(feelingLevels)
  
showConfidenceTable = (confidenceLevels) ->
  confidenceTableElem = getConfidenceTableElement()
  fillConfidenceTableElement(confidenceTableElem, confidenceLevels)

getConfidenceTableElement = ->
  return $('#confidenceTable')
  
fillConfidenceTableElement = (confidenceTableElem, confidenceLevels) ->
  addConfidenceHeaders(confidenceTableElem)
  fillData(confidenceTableElem, confidenceLevels)
  
addConfidenceHeaders = (confidenceTableElem) ->
  console.log("add headers to ", confidenceTableElem)
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
  for week, groupNr in confidenceLevels
    tableBodyHTML += "<tr><td> #{groupNr}</td>"
    console.log("groupNr", groupNr)
    console.log("week", week)
    tableBodyHTML += "</tr>"
  tableBodyHTML += '</tbody>'
  return tableBodyHTML


