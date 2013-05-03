(function() {
  var createExercisesHTML, createStudentAccordionHTML, fillFeedbackAccordionHTML, getExercisesSortedAlphabetically, getStudentsSortedAlphabetically, showFeedbackAccordion, studentToExercises;

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
  };

  fillFeedbackAccordionHTML = function(studentToExercises) {
    var feedbackAccordionHTML, student, studentExercises, students, _i, _len;

    feedbackAccordionHTML = "";
    students = getStudentsSortedAlphabetically(studentToExercises);
    for (_i = 0, _len = students.length; _i < _len; _i++) {
      student = students[_i];
      studentExercises = studentToExercises[student];
      feedbackAccordionHTML += createStudentAccordionHTML(student, studentExercises);
    }
    return $('#feedback-accordion').html(feedbackAccordionHTML);
  };

  getStudentsSortedAlphabetically = function(studentToExercises) {
    var students;

    students = Object.keys(studentToExercises);
    students.sort();
    return students;
  };

  createStudentAccordionHTML = function(student, studentExercises) {
    var exercisesHTML;

    exercisesHTML = createExercisesHTML(studentExercises);
    return "<h3>" + student + "</h3>  " + exercisesHTML;
  };

  createExercisesHTML = function(studentExercises) {
    var exerciseHTML, exerciseName, exerciseTexts, studentExercisesSorted, _i, _len;

    exerciseHTML = "<div>";
    studentExercisesSorted = getExercisesSortedAlphabetically(studentExercises);
    for (_i = 0, _len = studentExercisesSorted.length; _i < _len; _i++) {
      exerciseName = studentExercisesSorted[_i];
      exerciseTexts = studentExercises[exerciseName];
      exerciseHTML += "    <div class='uebungsblatt-header header'>" + exerciseName + " </div>      <div class='well well-small'>        <pre class='well well-small'>" + exerciseTexts.erfahrungen + "</pre>        <pre class='alert alert-success'>" + exerciseTexts.feedback + "</pre>      </div>";
    }
    exerciseHTML += "</div>";
    return exerciseHTML;
  };

  getExercisesSortedAlphabetically = function(studentExercises) {
    var exercises;

    exercises = Object.keys(studentExercises);
    exercises.sort();
    return exercises;
  };

  showFeedbackAccordion = function() {
    $("#feedback-accordion").show();
    return $("#feedback-accordion").accordion({
      active: false,
      collapsible: true,
      heightStyle: "content"
    });
  };

  window.fillFeedbackAccordionHTML = function(studentToExercises) {
    console.log("filling feedback");
    console.log("filling feedback with", studentToExercises);
    fillFeedbackAccordionHTML(studentToExercises);
    return showFeedbackAccordion();
  };

}).call(this);
