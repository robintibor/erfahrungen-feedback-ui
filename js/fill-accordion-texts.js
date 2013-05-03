(function() {
  var createAccordionItem, createExerciseAccordionHTML, createExercisesHTML, createExercisesToStudents, createStudentAccordionHTML, createStudentsHTML, fillExercisesAccordionHTML, fillStudentsAccordionHTML, getExercisesSortedAlphabetically, getStudentsSortedAlphabetically, showExercisesAccordion, showStudentsAccordion, studentToExercises,
    __hasProp = {}.hasOwnProperty;

  fillStudentsAccordionHTML = function(studentToExercises) {
    var student, studentExercises, students, studentsAccordionHTML, _i, _len;

    studentsAccordionHTML = "";
    students = getStudentsSortedAlphabetically(studentToExercises);
    for (_i = 0, _len = students.length; _i < _len; _i++) {
      student = students[_i];
      studentExercises = studentToExercises[student];
      studentsAccordionHTML += createStudentAccordionHTML(student, studentExercises);
    }
    return $('#students-accordion').html(studentsAccordionHTML);
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
    var erfahrungen, exerciseName, exerciseTexts, exercisesHTML, feedback, studentExercisesSorted, _i, _len;

    exercisesHTML = "<div>";
    studentExercisesSorted = getExercisesSortedAlphabetically(studentExercises);
    for (_i = 0, _len = studentExercisesSorted.length; _i < _len; _i++) {
      exerciseName = studentExercisesSorted[_i];
      exerciseTexts = studentExercises[exerciseName];
      erfahrungen = exerciseTexts.erfahrungen;
      feedback = exerciseTexts.feedback;
      exercisesHTML += createAccordionItem(exerciseName, erfahrungen, feedback);
    }
    exercisesHTML += "</div>";
    return exercisesHTML;
  };

  getExercisesSortedAlphabetically = function(studentExercises) {
    var exercises;

    exercises = Object.keys(studentExercises);
    exercises.sort();
    return exercises;
  };

  createAccordionItem = function(header, erfahrungen, feedback) {
    return "      <div class='.accordion-header'>" + header + "</div>      <div class='well well-small'>        <pre class='well well-small'>" + erfahrungen + "</pre>        <pre class='alert alert-success'>" + feedback + "</pre>      </div>";
  };

  showStudentsAccordion = function() {
    $("#students-accordion").show();
    return $("#students-accordion").accordion({
      active: false,
      collapsible: true,
      heightStyle: "content"
    });
  };

  fillExercisesAccordionHTML = function(studentToExercises) {
    var exercise, exerciseAccordionHTML, exerciseStudents, exercises, exercisesToStudents, _i, _len;

    exercisesToStudents = createExercisesToStudents(studentToExercises);
    exerciseAccordionHTML = "";
    exercises = getExercisesSortedAlphabetically(exercisesToStudents);
    for (_i = 0, _len = exercises.length; _i < _len; _i++) {
      exercise = exercises[_i];
      exerciseStudents = exercisesToStudents[exercise];
      exerciseAccordionHTML += createExerciseAccordionHTML(exercise, exerciseStudents);
    }
    return $('#exercises-accordion').html(exerciseAccordionHTML);
  };

  createExercisesToStudents = function(studentToExercises) {
    var exercise, exerciseTexts, exercises, exercisesToStudents, student;

    exercisesToStudents = {};
    for (student in studentToExercises) {
      if (!__hasProp.call(studentToExercises, student)) continue;
      exercises = studentToExercises[student];
      for (exercise in exercises) {
        if (!__hasProp.call(exercises, exercise)) continue;
        exerciseTexts = exercises[exercise];
        exercisesToStudents[exercise] = exercisesToStudents[exercise] != null ? exercisesToStudents[exercise] : {};
        exercisesToStudents[exercise][student] = exerciseTexts;
        console.log(exercisesToStudents);
      }
    }
    return exercisesToStudents;
  };

  createExerciseAccordionHTML = function(exercise, exerciseStudents) {
    var studentsHTML;

    studentsHTML = createStudentsHTML(exerciseStudents);
    return "<h3>" + exercise + "</h3>  " + studentsHTML;
  };

  createStudentsHTML = function(exerciseStudents) {
    var erfahrungen, feedback, studentName, studentTexts, studentsHTML, studentsSorted, _i, _len;

    studentsHTML = "<div>";
    studentsSorted = getStudentsSortedAlphabetically(exerciseStudents);
    for (_i = 0, _len = studentsSorted.length; _i < _len; _i++) {
      studentName = studentsSorted[_i];
      studentTexts = exerciseStudents[studentName];
      erfahrungen = studentTexts.erfahrungen;
      feedback = studentTexts.feedback;
      studentsHTML += createAccordionItem(studentName, erfahrungen, feedback);
    }
    studentsHTML += "</div>";
    return studentsHTML;
  };

  showExercisesAccordion = function() {
    $("#exercises-accordion").show();
    return $("#exercises-accordion").accordion({
      active: false,
      collapsible: true,
      heightStyle: "content"
    });
  };

  window.fillAccordionHTMLs = function(studentToExercises) {
    console.log("filling feedback");
    console.log("filling feedback with", studentToExercises);
    fillStudentsAccordionHTML(studentToExercises);
    showStudentsAccordion();
    fillExercisesAccordionHTML(studentToExercises);
    return showExercisesAccordion();
  };

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

}).call(this);
