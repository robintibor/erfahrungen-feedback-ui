(function() {
  var createExercisesHTML, createStudentAccordionHTML, fillFeedbackAccordionHTML, getStudentsSortedAlphabetically, showFeedbackAccordion, studentToExercises,
    __hasProp = {}.hasOwnProperty;

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
    var exerciseHTML, exerciseName, exerciseTexts;

    exerciseHTML = "<div>";
    for (exerciseName in studentExercises) {
      if (!__hasProp.call(studentExercises, exerciseName)) continue;
      exerciseTexts = studentExercises[exerciseName];
      exerciseHTML += "    <div class='uebungsblatt-header header'>" + exerciseName + " </div>      <div class='well well-small'>        <div class='well well-small'>          " + exerciseTexts.erfahrungen + "        </div>        <div class='alert alert-success'>          " + exerciseTexts.feedback + "        </div>      </div>";
    }
    exerciseHTML += "</div>";
    return exerciseHTML;
  };

  showFeedbackAccordion = function() {
    $("#feedback-accordion").show();
    return $("#feedback-accordion").accordion({
      active: false,
      collapsible: true
    });
  };

  window.fillFeedbackAccordionHTML = function(studentToExercises) {
    fillFeedbackAccordionHTML(studentToExercises);
    return showFeedbackAccordion();
  };

}).call(this);
