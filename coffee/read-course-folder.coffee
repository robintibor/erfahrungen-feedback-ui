window.studentsToExercises = {}
studentsToExercises = window.studentsToExercises
readDirectoryOnDrop = ->
  $('#courseFolderDrop').on(
    'drop',
    (event) ->
        if (event.originalEvent.dataTransfer)
          if (event.originalEvent.dataTransfer.files.length) 
            event.preventDefault();
            event.stopPropagation();
            courseDirectory = event.originalEvent.dataTransfer.items[0].webkitGetAsEntry()
            readCourseDirectory(courseDirectory)
            fillAccordionWhenFilesRead()
  )

readCourseDirectory = (courseDirectory) ->
  courseDirectoryReader = courseDirectory.createReader()
  getAllEntries(courseDirectoryReader, readStudentDirectories)

getAllEntries = (directoryReader, callback) ->
  entries = []
  readEntries = () ->
    directoryReader.readEntries(
      (results) ->
        if (!results.length)
          entries.sort()
          callback(entries)
        else
          entries = entries.concat(toArray(results))
          readEntries()
      errorHandler
    )
  readEntries()

errorHandler = (e) ->
  console.log('FileSystem API Error Code: ' + e.code)

toArray = (list) ->
  return Array.prototype.slice.call(list || [], 0)

readStudentDirectories = (studentDirectories) ->
  studentDirectories = filterForStudentDirectories(studentDirectories)
  for studentDirectory in studentDirectories
    studentName = studentDirectory.name
    studentsToExercises[studentName] = {}
    directoryReader = studentDirectory.createReader()
    readExerciseDirectoriesForThisStudent = readExerciseDirectories.bind(this, studentName)
    getAllEntries(directoryReader, readExerciseDirectoriesForThisStudent)

filterForStudentDirectories = (possibleStudentDirectories) ->
  studentDirectories = jQuery.grep(possibleStudentDirectories,
    (possibleDirectory) ->
      return (possibleDirectory.name != "musterloesungen" and 
        possibleDirectory.name != "vorlesungen" and
        possibleDirectory.name != "uebungen" and
        possibleDirectory.name != ".svn")
  )
  return studentDirectories

readExerciseDirectories = (studentName, possibleExerciseDirectories) ->
  exerciseDirectories = filterForExerciseDirectories(possibleExerciseDirectories)
  for exerciseDirectory in exerciseDirectories
    directoryReader = exerciseDirectory.createReader()
    exerciseName = exerciseDirectory.name
    studentsToExercises[studentName][exerciseName] = {}
    readExerciseDirectoryForThisStudent = readExerciseDirectory.bind(this, studentName, exerciseName)
    getAllEntries(directoryReader, readExerciseDirectoryForThisStudent)

filterForExerciseDirectories = (possibleExerciseDirectories) ->
  exerciseDirectories = jQuery.grep(possibleExerciseDirectories,
    (possibleDirectory) ->
      possibleDirectory.name.match(/bungsblatt-[0-9]{1,2}$/)
  )
  return exerciseDirectories

readExerciseDirectory = (studentName, exerciseName, entries) ->
  addErfahrungenForThisExercise = addErfahrungenFile.bind(this, studentName, exerciseName)
  addFeedbackForThisExercise = addTutorFeedbackFile.bind(this, studentName, exerciseName)
  for entry in entries
    if entry.name.match(/^[eE]rfahrungen\.txt$/)
      entry.file(addErfahrungenForThisExercise, errorHandler)
    else if entry.name.match(/^[fF]eedback-tutor\.txt$/)
      entry.file(addFeedbackForThisExercise, errorHandler)

addErfahrungenFile = (studentName, exerciseName, file) ->
  reader = new FileReader()
  addErfahrungenForThisExercise = addErfahrungen.bind(this, studentName, exerciseName)
  reader.onload = (event) ->
    erfahrungenText = event.target.result
    addErfahrungenForThisExercise(erfahrungenText)
  reader.readAsText(file)

addErfahrungen = (studentName, exerciseName, erfahrungenText) ->
  studentsToExercises[studentName][exerciseName].erfahrungen = erfahrungenText

addTutorFeedbackFile =  (studentName, exerciseName, file) ->
  reader = new FileReader()
  addFeedbackForThisExercise = addFeedback.bind(this, studentName, exerciseName)
  reader.onload = (event) ->
    feedbackText = event.target.result
    addFeedbackForThisExercise(feedbackText)
  reader.readAsText(file)

addFeedback = (studentName, exerciseName, feedbackText) ->
  studentsToExercises[studentName][exerciseName].feedback = feedbackText

fillAccordionWhenFilesRead = ->
  setTimeout(
    () ->
      window.fillFeedbackAccordionHTML(studentsToExercises)
    5000
  )

jQuery(document).ready(($) ->
  readDirectoryOnDrop()
  $('#courseFolderDrop').on(
      'dragover',
      (e) ->
          e.preventDefault();
          console.log("dragover new!2!");
          e.stopPropagation();
    )
  
  $('#courseFolderDrop').on(
      'dragenter',
      (e) ->
          e.preventDefault();
          e.stopPropagation();
  )
)
