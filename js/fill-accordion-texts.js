(function() {
  var createAccordionItem, createExerciseAccordionHTML, createExercisesAccordion, createExercisesHTML, createExercisesToStudents, createStudentAccordionHTML, createStudentsAccordion, createStudentsHTML, fillExercisesAccordionHTML, fillStudentsAccordionHTML, getExercisesSortedAlphabetically, getFullStudentsName, getStudentsSortedAlphabetically, removeFolderDropDiv, rzKuerzelToFullName, showFeedbackAndErfahrungen, studentToExercises,
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
    var exercisesHTML, fullStudentName;

    exercisesHTML = createExercisesHTML(studentExercises);
    fullStudentName = getFullStudentsName(student);
    return "<h3>" + fullStudentName + " (" + student + ")</h3>  " + exercisesHTML;
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
    exercises.sort().reverse();
    return exercises;
  };

  createAccordionItem = function(header, erfahrungen, feedback) {
    return "      <div class='accordion-header'>" + header + "</div>      <div class='well well-small texts'>        <pre class='well well-small'>" + erfahrungen + "</pre>        <pre class='alert alert-success'>" + feedback + "</pre>      </div>";
  };

  getFullStudentsName = function(studentsRzKuerzel) {
    if (rzKuerzelToFullName[studentsRzKuerzel]) {
      return rzKuerzelToFullName[studentsRzKuerzel];
    } else {
      return "";
    }
  };

  createStudentsAccordion = function() {
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
    var erfahrungen, feedback, studentFullNameAndKuerzel, studentKuerzel, studentTexts, studentsHTML, studentsSorted, _i, _len;

    studentsHTML = "<div>";
    studentsSorted = getStudentsSortedAlphabetically(exerciseStudents);
    for (_i = 0, _len = studentsSorted.length; _i < _len; _i++) {
      studentKuerzel = studentsSorted[_i];
      studentFullNameAndKuerzel = "" + (getFullStudentsName(studentKuerzel)) + " (" + studentKuerzel + ")";
      studentTexts = exerciseStudents[studentKuerzel];
      erfahrungen = studentTexts.erfahrungen;
      feedback = studentTexts.feedback;
      studentsHTML += createAccordionItem(studentFullNameAndKuerzel, erfahrungen, feedback);
    }
    studentsHTML += "</div>";
    return studentsHTML;
  };

  createExercisesAccordion = function() {
    return $("#exercises-accordion").accordion({
      active: false,
      collapsible: true,
      heightStyle: "content"
    });
  };

  showFeedbackAndErfahrungen = function() {
    return $('#feedbackAndErfahrungenContainer').show();
  };

  removeFolderDropDiv = function() {
    return $('#courseFolderDrop').remove();
  };

  window.fillAccordionHTMLs = function(studentToExercises) {
    fillStudentsAccordionHTML(studentToExercises);
    fillExercisesAccordionHTML(studentToExercises);
    createStudentsAccordion();
    createExercisesAccordion();
    showFeedbackAndErfahrungen();
    return removeFolderDropDiv();
  };

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
    jr187: "Jan Reisacher",
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
    vw47: "Vivica Wirth"
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
