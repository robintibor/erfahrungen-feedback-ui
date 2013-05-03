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
  return "<h3>#{student}</h3>
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
      <div class='.accordion-header'>#{header}</div>
      <div class='well well-small'>
        <pre class='well well-small'>#{erfahrungen}</pre>
        <pre class='alert alert-success'>#{feedback}</pre>
      </div>"

showStudentsAccordion = ->
  $("#students-accordion").show()
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
      console.log(exercisesToStudents)
  return exercisesToStudents

createExerciseAccordionHTML = (exercise, exerciseStudents) ->
  studentsHTML = createStudentsHTML(exerciseStudents)
  return "<h3>#{exercise}</h3>
  #{studentsHTML}"
  
createStudentsHTML = (exerciseStudents) ->
  studentsHTML = "<div>"
  studentsSorted = getStudentsSortedAlphabetically(exerciseStudents)
  for studentName in studentsSorted
    studentTexts = exerciseStudents[studentName]
    erfahrungen = studentTexts.erfahrungen
    feedback = studentTexts.feedback
    studentsHTML += createAccordionItem(studentName, erfahrungen, feedback)
  studentsHTML += "</div>"
  return studentsHTML
  
showExercisesAccordion = ->
  $("#exercises-accordion").show()
  $("#exercises-accordion").accordion({
    active: false,
    collapsible: true,
    heightStyle: "content"
  })

window.fillAccordionHTMLs = (studentToExercises) ->
  console.log("filling feedback")
  console.log("filling feedback with", studentToExercises)
  fillStudentsAccordionHTML(studentToExercises)
  showStudentsAccordion()
  fillExercisesAccordionHTML(studentToExercises)
  showExercisesAccordion()


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

#fillStudentsAccordionHTML(studentToExercises)
#showStudentsAccordion()
#fillExercisesAccordionHTML(studentToExercises)
#showExercisesAccordion()