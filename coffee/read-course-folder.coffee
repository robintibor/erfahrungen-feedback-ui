studentsToExercises = {}
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
  )

readCourseDirectory = (courseDirectory) ->
  courseDirectoryReader = courseDirectory.createReader()
  getAllEntries(courseDirectoryReader, readStudentDirectories)

getAllEntries = (directoryReader, callback) ->
  entries = []
  errorHandler = (e) ->
    console.log('FileSystem API error code: ' + e.code)
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
    
toArray = (list) ->
  return Array.prototype.slice.call(list || [], 0)

readStudentDirectories = (studentDirectories) ->
  studentDirectories = filterForStudentDirectories(studentDirectories)
  for studentDirectory in studentDirectories
    studentName = studentDirectory.name
    studentsToExercises[studentName] = {}
    directoryReader = studentDirectory.createReader()
    getAllEntries(directoryReader, 
      (results) ->
        readExerciseDirectories(studentName, results)
    )

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
    studentsToExercises[studentName][exerciseName] = {}
    exerciseName = exerciseDirectory.name
    getAllEntries(directoryReader,
      (results) ->
        readExerciseDirectory(studentName, exerciseName, results)
    )

filterForExerciseDirectories = (possibleExerciseDirectories) ->
  exerciseDirectories = jQuery.grep(possibleExerciseDirectories,
    (possibleDirectory) ->
      possibleDirectory.name.match(/bungsblatt-[0-9]{1,2}$/)
  )
  return exerciseDirectories

readExerciseDirectory = (studentName, exerciseName, files) ->
  for file in files
    if file.name.match(/^[eE]rfahrungen\.txt$/)
      addErfahrungenFile(studentName, exerciseName, file)
    else if file.name.match(/^[fF]eedback-tutor\.txt$/)
      addTutorFeedbackFile(studentName, exerciseName, file)

addErfahrungenFile = (studentName, exerciseName, file) ->
  reader = new FileReader()
  reader.onload = (event) ->
    console.log(event.target.result)
  reader.readAsText(file)
  
addTutorFeedbackFile = ->
  
  
jQuery(document).ready(($) ->
    readDirectoryOnDrop()
    $('#courseFolderDrop').on(
      'dragover',
      (e) ->
          e.preventDefault();
          console.log("dragover new!");
          e.stopPropagation();
    )
  
  $('#courseFolderDrop').on(
      'dragenter',
      (e) ->
          e.preventDefault();
          e.stopPropagation();
  )
)
