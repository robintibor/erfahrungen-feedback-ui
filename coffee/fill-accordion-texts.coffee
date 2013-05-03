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

fillFeedbackAccordionHTML = (studentToExercises) ->
  feedbackAccordionHTML = ""
  students = getStudentsSortedAlphabetically(studentToExercises)
  for student in students
    studentExercises = studentToExercises[student]
    feedbackAccordionHTML += createStudentAccordionHTML(student, studentExercises)
  $('#feedback-accordion').html(feedbackAccordionHTML)

getStudentsSortedAlphabetically = (studentToExercises) ->
  students = Object.keys(studentToExercises)
  students.sort()
  return students
  
createStudentAccordionHTML = (student, studentExercises) ->
  exercisesHTML = createExercisesHTML(studentExercises)
  return "<h3>#{student}</h3>
  #{exercisesHTML}"

createExercisesHTML = (studentExercises) ->
  exerciseHTML = "<div>"
  studentExercisesSorted = getExercisesSortedAlphabetically(studentExercises)
  for exerciseName in studentExercisesSorted
    exerciseTexts = studentExercises[exerciseName]
    exerciseHTML += "
    <div class='uebungsblatt-header header'>#{exerciseName} </div>
      <div class='well well-small'>
        <pre class='well well-small'>#{exerciseTexts.erfahrungen}</pre>
        <pre class='alert alert-success'>#{exerciseTexts.feedback}</pre>
      </div>"
  exerciseHTML += "</div>"
  return exerciseHTML
  
getExercisesSortedAlphabetically = (studentExercises) ->
  exercises = Object.keys(studentExercises)
  exercises.sort()
  return exercises


showFeedbackAccordion = ->
  $("#feedback-accordion").show()
  $("#feedback-accordion").accordion({
    active: false,
    collapsible: true,
    heightStyle: "content"
  })

window.fillFeedbackAccordionHTML = (studentToExercises) ->
  console.log("filling feedback")
  console.log("filling feedback with", studentToExercises)
  fillFeedbackAccordionHTML(studentToExercises)
  showFeedbackAccordion()

