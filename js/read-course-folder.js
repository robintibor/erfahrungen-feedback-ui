(function() {
  var addErfahrungen, addErfahrungenFile, addFeedback, addTutorFeedbackFile, errorHandler, fillAccordionWhenFilesRead, filterForExerciseDirectories, filterForStudentDirectories, getAllEntries, readCourseDirectory, readDirectoryOnDrop, readExerciseDirectories, readExerciseDirectory, readStudentDirectories, studentsToExercises, toArray;

  window.studentsToExercises = {};

  studentsToExercises = window.studentsToExercises;

  readDirectoryOnDrop = function() {
    return $('#courseFolderDrop').on('drop', function(event) {
      var courseDirectory;

      if (event.originalEvent.dataTransfer) {
        if (event.originalEvent.dataTransfer.files.length) {
          event.preventDefault();
          event.stopPropagation();
          courseDirectory = event.originalEvent.dataTransfer.items[0].webkitGetAsEntry();
          readCourseDirectory(courseDirectory);
          return fillAccordionWhenFilesRead();
        }
      }
    });
  };

  readCourseDirectory = function(courseDirectory) {
    var courseDirectoryReader;

    courseDirectoryReader = courseDirectory.createReader();
    return getAllEntries(courseDirectoryReader, readStudentDirectories);
  };

  getAllEntries = function(directoryReader, callback) {
    var entries, readEntries;

    entries = [];
    readEntries = function() {
      return directoryReader.readEntries(function(results) {
        if (!results.length) {
          entries.sort();
          return callback(entries);
        } else {
          entries = entries.concat(toArray(results));
          return readEntries();
        }
      }, errorHandler);
    };
    return readEntries();
  };

  errorHandler = function(e) {
    return console.log('FileSystem API Error Code: ' + e.code);
  };

  toArray = function(list) {
    return Array.prototype.slice.call(list || [], 0);
  };

  readStudentDirectories = function(studentDirectories) {
    var directoryReader, readExerciseDirectoriesForThisStudent, studentDirectory, studentName, _i, _len, _results;

    studentDirectories = filterForStudentDirectories(studentDirectories);
    _results = [];
    for (_i = 0, _len = studentDirectories.length; _i < _len; _i++) {
      studentDirectory = studentDirectories[_i];
      studentName = studentDirectory.name;
      studentsToExercises[studentName] = {};
      directoryReader = studentDirectory.createReader();
      readExerciseDirectoriesForThisStudent = readExerciseDirectories.bind(this, studentName);
      _results.push(getAllEntries(directoryReader, readExerciseDirectoriesForThisStudent));
    }
    return _results;
  };

  filterForStudentDirectories = function(possibleStudentDirectories) {
    var studentDirectories;

    studentDirectories = jQuery.grep(possibleStudentDirectories, function(possibleDirectory) {
      return possibleDirectory.name !== "musterloesungen" && possibleDirectory.name !== "vorlesungen" && possibleDirectory.name !== "uebungen" && possibleDirectory.name !== ".svn";
    });
    return studentDirectories;
  };

  readExerciseDirectories = function(studentName, possibleExerciseDirectories) {
    var directoryReader, exerciseDirectories, exerciseDirectory, exerciseName, readExerciseDirectoryForThisStudent, _i, _len, _results;

    exerciseDirectories = filterForExerciseDirectories(possibleExerciseDirectories);
    _results = [];
    for (_i = 0, _len = exerciseDirectories.length; _i < _len; _i++) {
      exerciseDirectory = exerciseDirectories[_i];
      directoryReader = exerciseDirectory.createReader();
      exerciseName = exerciseDirectory.name;
      studentsToExercises[studentName][exerciseName] = {};
      readExerciseDirectoryForThisStudent = readExerciseDirectory.bind(this, studentName, exerciseName);
      _results.push(getAllEntries(directoryReader, readExerciseDirectoryForThisStudent));
    }
    return _results;
  };

  filterForExerciseDirectories = function(possibleExerciseDirectories) {
    var exerciseDirectories;

    exerciseDirectories = jQuery.grep(possibleExerciseDirectories, function(possibleDirectory) {
      return possibleDirectory.name.match(/bungsblatt-[0-9]{1,2}$/);
    });
    return exerciseDirectories;
  };

  readExerciseDirectory = function(studentName, exerciseName, entries) {
    var addErfahrungenForThisExercise, addFeedbackForThisExercise, entry, _i, _len, _results;

    addErfahrungenForThisExercise = addErfahrungenFile.bind(this, studentName, exerciseName);
    addFeedbackForThisExercise = addTutorFeedbackFile.bind(this, studentName, exerciseName);
    _results = [];
    for (_i = 0, _len = entries.length; _i < _len; _i++) {
      entry = entries[_i];
      if (entry.name.match(/^[eE]rfahrungen\.txt$/)) {
        _results.push(entry.file(addErfahrungenForThisExercise, errorHandler));
      } else if (entry.name.match(/^[fF]eedback-tutor\.txt$/)) {
        _results.push(entry.file(addFeedbackForThisExercise, errorHandler));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  addErfahrungenFile = function(studentName, exerciseName, file) {
    var addErfahrungenForThisExercise, reader;

    reader = new FileReader();
    addErfahrungenForThisExercise = addErfahrungen.bind(this, studentName, exerciseName);
    reader.onload = function(event) {
      var erfahrungenText;

      erfahrungenText = event.target.result;
      return addErfahrungenForThisExercise(erfahrungenText);
    };
    return reader.readAsText(file);
  };

  addErfahrungen = function(studentName, exerciseName, erfahrungenText) {
    return studentsToExercises[studentName][exerciseName].erfahrungen = erfahrungenText;
  };

  addTutorFeedbackFile = function(studentName, exerciseName, file) {
    var addFeedbackForThisExercise, reader;

    reader = new FileReader();
    addFeedbackForThisExercise = addFeedback.bind(this, studentName, exerciseName);
    reader.onload = function(event) {
      var feedbackText;

      feedbackText = event.target.result;
      return addFeedbackForThisExercise(feedbackText);
    };
    return reader.readAsText(file);
  };

  addFeedback = function(studentName, exerciseName, feedbackText) {
    return studentsToExercises[studentName][exerciseName].feedback = feedbackText;
  };

  fillAccordionWhenFilesRead = function() {
    return setTimeout(function() {
      return window.fillFeedbackAccordionHTML(studentsToExercises);
    }, 5000);
  };

  jQuery(document).ready(function($) {
    readDirectoryOnDrop();
    $('#courseFolderDrop').on('dragover', function(e) {
      e.preventDefault();
      console.log("dragover new!2!");
      return e.stopPropagation();
    });
    return $('#courseFolderDrop').on('dragenter', function(e) {
      e.preventDefault();
      return e.stopPropagation();
    });
  });

}).call(this);
