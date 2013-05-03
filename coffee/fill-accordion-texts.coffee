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
  for own exerciseName, exerciseTexts of studentExercises
    exerciseHTML += "
    <div class='uebungsblatt-header header'>#{exerciseName} </div>
      <div class='well well-small'>
        <div class='well well-small'>
          #{exerciseTexts.erfahrungen}
        </div>
        <div class='alert alert-success'>
          #{exerciseTexts.feedback}
        </div>
      </div>"
  exerciseHTML += "</div>"
  return exerciseHTML

showFeedbackAccordion = ->
  $("#feedback-accordion").show()
  $("#feedback-accordion").accordion({
    active: false,
    collapsible: true
  })

window.fillFeedbackAccordionHTML = (studentToExercises) ->
  fillFeedbackAccordionHTML(studentToExercises)
  showFeedbackAccordion()

