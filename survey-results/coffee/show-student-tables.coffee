@showStudentTables = (studentsToTables) ->
  for own surveyName, studentsToResponses of studentsToTables
    showStudentTable(surveyName, studentsToResponses)
    
showStudentTable = (surveyName, studentsToResponses) ->
  tableHTML = createTableHTML(surveyName, studentsToResponses)
  appendStudentTable(tableHTML)
  
createTableHTML = (surveyName, studentsToResponses) ->
  tableHTML = 
    "<table>\n" +
    "<caption> #{surveyName}</caption>\n"
  # sort students alphabetically and display each students responses
  for student in Object.keys(studentsToResponses).sort()
    responses = studentsToResponses[student]
    tableHTML += "<tr><td>#{student}</td>"
    for response in responses
      date = new Date(response.date)
      dateString = date.getDate() + "." + (date.getMonth() + 1) + ".(" + padNumberString(date.getHours(), 2) + ":" + padNumberString(date.getMinutes(), 2) + ")"
      tableHTML += "<td>#{dateString}</td>"
    tableHTML += "</tr>\n"
  tableHTML += "</table>\n"
  return tableHTML
  
# from http://stackoverflow.com/a/10073788/1469195
padNumberString = (n, width, z) -> 
  z = z or '0';
  n = n + ''
  return if n.length >= width then n else new Array(width - n.length + 1).join(z) + n

appendStudentTable = (table) ->
  $('#studentTables').append(table)