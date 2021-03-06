window.studentsToExercises = {}
studentsToExercises = window.studentsToExercises
readDirectoryOnDrop = ->
  $('#courseFolderDrop').on(
    'drop',
    (event) ->
      if (event.originalEvent.dataTransfer)
        if (event.originalEvent.dataTransfer.files.length) 
          event.preventDefault()
          event.stopPropagation()
          courseDirectory = event.originalEvent.dataTransfer.items[0].webkitGetAsEntry()
          showYellowBorderOnDropDiv()
          readCourseDirectory(courseDirectory)
          fillAccordionWhenFilesRead()
  )

showYellowBorderOnDropDiv = ->
  $('#courseFolderDrop').removeClass('activeCourseFolderDrop')
  $('#courseFolderDrop').addClass('droppedCourseFolderDiv')

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
  # studentdirectoryname should be rz-kuerzel like rs123
  return filterDirectoriesWithRegExp(possibleStudentDirectories, /^[a-z]{2}[0-9]{1,3}$/)

readExerciseDirectories = (studentName, possibleExerciseDirectories) ->
  exerciseDirectories = filterForExerciseDirectories(possibleExerciseDirectories)
  for exerciseDirectory in exerciseDirectories
    directoryReader = exerciseDirectory.createReader()
    exerciseName = exerciseDirectory.name
    studentsToExercises[studentName][exerciseName] = {}
    readExerciseDirectoryForThisStudent = readExerciseDirectory.bind(this, studentName, exerciseName)
    getAllEntries(directoryReader, readExerciseDirectoryForThisStudent)

filterForExerciseDirectories = (possibleExerciseDirectories) ->
  return filterDirectoriesWithRegExp(possibleExerciseDirectories, /(bungsblatt-[0-9]{1,2}(-improved){0,1}$)|proje[ck]t/)

filterDirectoriesWithRegExp = (directories, regexp) ->
  return jQuery.grep(directories,
    (directory) ->
      directory.name.match(regexp)
  )

readExerciseDirectory = (studentName, exerciseName, entries) ->
  addErfahrungenForThisExercise = addPropertyFile.bind(this, studentName, exerciseName, "erfahrungen")
  addFeedbackForThisExercise = addPropertyFile.bind(this, studentName, exerciseName, "feedback")
  for entry in entries
    if entry.name.match(/^[Ee]rfahrung(en){0,1}(sbericht){0,1}\.txt$/)
      entry.file(addErfahrungenForThisExercise, errorHandler)
    else if entry.name.match(/^[fF]eedback-tutor\.txt$/)
      entry.file(addFeedbackForThisExercise, errorHandler)

addPropertyFile = (studentName, exerciseName, property, file) ->
  reader = new FileReader()
  addPropertyToThisExercise = addProperty.bind(this, studentName, exerciseName, property)
  onload = (event) ->
    propertyText = event.target.result
    addPropertyToThisExercise(propertyText)
  onerror = (error) ->
    # try again!
    reader.readAsText(file)
    
  reader.onload = onload.bind(this)
  reader.onerror = onerror.bind(this)
  reader.readAsText(file)

addProperty = (studentName, exerciseName, property, propertyText) ->
  studentsToExercises[studentName][exerciseName][property] = propertyText
  @lastFileRead = Date.now()

lastFileRead = null

fillAccordionWhenFilesRead = ->
  setLastFileReadTimeIfNecessary()
  maximumTimeToReadFile = 2500
  if (Date.now() - @lastFileRead > maximumTimeToReadFile)
    console.log("now start fillling accordions")
    window.fillAccordionHTMLs(studentsToExercises)
  else setTimeout(
    fillAccordionWhenFilesRead
    250
  )

setLastFileReadTimeIfNecessary = ->
  if (not @lastFileRead?)
    @lastFileRead = Date.now() + 1000

showBlackBorderOnDragEnter = ->
  $('#courseFolderDrop').on(
    'dragenter',
    (event) ->
      event.preventDefault()
      event.stopPropagation()
      $('#courseFolderDrop').addClass('activeCourseFolderDrop')
  )

preventPropagationOnDragOver = ->
  $('#courseFolderDrop').on(
    'dragover',
    (event) ->
      event.preventDefault()
      event.stopPropagation()
  )
  

hideBlackBorderOnDragLeave = ->
  $('#courseFolderDrop').on(
    'dragleave',
    (event) ->
      event.preventDefault()
      event.stopPropagation()
      $('#courseFolderDrop').removeClass('activeCourseFolderDrop')
  )

jQuery(document).ready(($) ->
  readDirectoryOnDrop()
  showBlackBorderOnDragEnter()
  preventPropagationOnDragOver()
  hideBlackBorderOnDragLeave()
)