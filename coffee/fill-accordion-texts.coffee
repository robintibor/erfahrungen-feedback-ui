fillStudentsAccordionHTML = (studentToExercises) ->
  studentsAccordionHTML = ""
  students = getStudentsSortedAlphabetically(studentToExercises)
  for student in students
    studentExercises = studentToExercises[student]
    studentsAccordionHTML += createStudentAccordionHTML(student, studentExercises)
  $('#students-accordion').html(studentsAccordionHTML)

getStudentsSortedAlphabetically = (studentToExercises) ->
  students = Object.keys(studentToExercises)
  students.sort()
  return students
  
createStudentAccordionHTML = (student, studentExercises) ->
  exercisesHTML = createExercisesHTML(studentExercises)
  fullStudentName = getFullStudentsName(student)
  return "<h3>#{fullStudentName} (#{student})</h3>
  #{exercisesHTML}"

createExercisesHTML = (studentExercises) ->
  exercisesHTML = "<div>"
  studentExercisesSorted = getExercisesSortedAlphabetically(studentExercises)
  for exerciseName in studentExercisesSorted
    exerciseTexts = studentExercises[exerciseName]
    erfahrungen = exerciseTexts.erfahrungen
    feedback = exerciseTexts.feedback
    exercisesHTML += createAccordionItem(exerciseName, erfahrungen, feedback)
  exercisesHTML += "</div>"
  return exercisesHTML

getExercisesSortedAlphabetically = (studentExercises) ->
  exercises = Object.keys(studentExercises)
  exercises.sort()
  return exercises

createAccordionItem = (header, erfahrungen, feedback) ->
  return "
      <div class='accordion-header'>#{header}</div>
      <div class='well well-small texts'>
        <pre class='well well-small'>#{erfahrungen}</pre>
        <pre class='alert alert-success'>#{feedback}</pre>
      </div>"

getFullStudentsName = (studentsRzKuerzel) ->
  if (rzKuerzelToFullName[studentsRzKuerzel])
    return rzKuerzelToFullName[studentsRzKuerzel]
  else 
    return ""

createStudentsAccordion = ->
  $("#students-accordion").accordion({
    active: false,
    collapsible: true,
    heightStyle: "content"
  })

fillExercisesAccordionHTML = (studentToExercises) ->
  exercisesToStudents = createExercisesToStudents(studentToExercises)
  exerciseAccordionHTML = ""
  exercises = getExercisesSortedAlphabetically(exercisesToStudents)
  for exercise in exercises
    exerciseStudents = exercisesToStudents[exercise]
    exerciseAccordionHTML += createExerciseAccordionHTML(exercise, exerciseStudents)
  $('#exercises-accordion').html(exerciseAccordionHTML)
  
createExercisesToStudents = (studentToExercises) ->
  exercisesToStudents = {}
  for own student, exercises of studentToExercises
    for own exercise, exerciseTexts of exercises
      # make sure object has exercise, if it had not been seen before
      exercisesToStudents[exercise] = if  exercisesToStudents[exercise]? then  exercisesToStudents[exercise] else {}
      exercisesToStudents[exercise][student] = exerciseTexts
  return exercisesToStudents

createExerciseAccordionHTML = (exercise, exerciseStudents) ->
  studentsHTML = createStudentsHTML(exerciseStudents)
  return "<h3>#{exercise}</h3>
  #{studentsHTML}"
  
createStudentsHTML = (exerciseStudents) ->
  studentsHTML = "<div>"
  studentsSorted = getStudentsSortedAlphabetically(exerciseStudents)
  for studentKuerzel in studentsSorted
    studentFullNameAndKuerzel = "#{getFullStudentsName(studentKuerzel)} (#{studentKuerzel})"
    studentTexts = exerciseStudents[studentKuerzel]
    erfahrungen = studentTexts.erfahrungen
    feedback = studentTexts.feedback
    studentsHTML += createAccordionItem(studentFullNameAndKuerzel, erfahrungen, feedback)
  studentsHTML += "</div>"
  return studentsHTML
  
createExercisesAccordion = ->
  $("#exercises-accordion").accordion({
    active: false,
    collapsible: true,
    heightStyle: "content"
  })

showFeedbackAndErfahrungen = ->
  $('#feedbackAndErfahrungenContainer').show()

removeFolderDropDiv = ->
  $('#courseFolderDrop').remove()

window.fillAccordionHTMLs = (studentToExercises) ->
  fillStudentsAccordionHTML(studentToExercises)
  fillExercisesAccordionHTML(studentToExercises)
  createStudentsAccordion()
  createExercisesAccordion()
  showFeedbackAndErfahrungen()
  removeFolderDropDiv()

rzKuerzelToFullName = {
  ab308: "Anja Blickensdoerfer",
  ak346: "Alexander Kozhinov",
  bh102: "Bjoern Hagemeister",
  ck1024: "Christine Ketterer",
  ck76: "Christopher Krolla",
  cs434: "Colin Seibel",
  df42: "Dominik Froehlich",
  dk124: "Danijela Krpic",
  er56: "Elias Rosch",
  fb165: "Felix Baessgen",
  hb1003: "Hannah Bast",
  hi3: "Hendrik Intveen",
  hj22: "Hannes Jeworowsky",
  is118: "Iradj Solouk",
  jd126: "Joel Henrique Danker",
  jg225: "Juergen Gutt",
  js542: "Jens Schindler",
  jr76: "Julian Reimer",
  kl92: "Karl-Robert Lappe",
  ls305: "Lars Sipos",
  lz33: "Lukas Zimmermann",
  mf220: "Marlene Fiedler",
  mk211: "Martin Killian",
  mk488: "Michael Kotzjan",
  mp121: "Michael Petretti",
  mp208: "Meik Pilot",
  mr252: "Moritz Rauch",
  mt146: "Marius Tetard",
  mz70: "Mathias Zink",
  ok13: "Oemer Keskin",
  sb404: "Sebastian Buchfink",
  sk163: "Stefan Koeck",
  sw127: "Samuel Weishaupt",
  tm122: "Tano Valentin Mueller",
  vw47: "Vivica Wirth",
}


# for tests :))
studentToExercises = {
  jg252: {
    "uebungsblatt-01": {
      erfahrungen: "Das war spannend und interessant!",
      feedback: "Stimmt, hast super gemacht!"
    },
    "uebungsblatt-02": {
      erfahrungen: "Schwerer, gerade deswegen toll",
      feedback: "Und immer besser!"
    }
  },
  hb1003: {
    "uebungsblatt-01": {
      erfahrungen: "Das war aber was!",
      feedback: "Aber geklappt hat es!"
    },
    "uebungsblatt-02": {
      erfahrungen: "Nagut, hätte man aber auch mit schöneren Farben machen können",
      feedback: "Vielleicht"
    }
  }
}

# for tests window.fillAccordionHTMLs(studentToExercises)