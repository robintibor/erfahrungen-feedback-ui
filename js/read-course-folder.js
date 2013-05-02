(function() {
  var addErfahrungenFile, addTutorFeedbackFile, filterForExerciseDirectories, filterForStudentDirectories, getAllEntries, readCourseDirectory, readDirectoryOnDrop, readExerciseDirectories, readExerciseDirectory, readStudentDirectories, studentsToExercises, toArray;

  studentsToExercises = {};

  readDirectoryOnDrop = function() {
    return $('#courseFolderDrop').on('drop', function(event) {
      var courseDirectory;

      if (event.originalEvent.dataTransfer) {
        if (event.originalEvent.dataTransfer.files.length) {
          event.preventDefault();
          event.stopPropagation();
          courseDirectory = event.originalEvent.dataTransfer.items[0].webkitGetAsEntry();
          return readCourseDirectory(courseDirectory);
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
    var entries, errorHandler, readEntries;

    entries = [];
    errorHandler = function(e) {
      return console.log('FileSystem API error code: ' + e.code);
    };
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

  toArray = function(list) {
    return Array.prototype.slice.call(list || [], 0);
  };

  readStudentDirectories = function(studentDirectories) {
    var directoryReader, studentDirectory, studentName, _i, _len, _results;

    studentDirectories = filterForStudentDirectories(studentDirectories);
    _results = [];
    for (_i = 0, _len = studentDirectories.length; _i < _len; _i++) {
      studentDirectory = studentDirectories[_i];
      studentName = studentDirectory.name;
      studentsToExercises[studentName] = {};
      directoryReader = studentDirectory.createReader();
      _results.push(getAllEntries(directoryReader, function(results) {
        return readExerciseDirectories(studentName, results);
      }));
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
    var directoryReader, exerciseDirectories, exerciseDirectory, exerciseName, _i, _len, _results;

    exerciseDirectories = filterForExerciseDirectories(possibleExerciseDirectories);
    _results = [];
    for (_i = 0, _len = exerciseDirectories.length; _i < _len; _i++) {
      exerciseDirectory = exerciseDirectories[_i];
      directoryReader = exerciseDirectory.createReader();
      studentsToExercises[studentName][exerciseName] = {};
      exerciseName = exerciseDirectory.name;
      _results.push(getAllEntries(directoryReader, function(results) {
        return readExerciseDirectory(studentName, exerciseName, results);
      }));
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

  readExerciseDirectory = function(studentName, exerciseName, files) {
    var file, _i, _len, _results;

    _results = [];
    for (_i = 0, _len = files.length; _i < _len; _i++) {
      file = files[_i];
      if (file.name.match(/^[eE]rfahrungen\.txt$/)) {
        _results.push(addErfahrungenFile(studentName, exerciseName, file));
      } else if (file.name.match(/^[fF]eedback-tutor\.txt$/)) {
        _results.push(addTutorFeedbackFile(studentName, exerciseName, file));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  addErfahrungenFile = function(studentName, exerciseName, file) {
    var reader;

    reader = new FileReader();
    reader.onload = function(event) {
      return console.log(event.target.result);
    };
    return reader.readAsText(file);
  };

  addTutorFeedbackFile = function() {};

  jQuery(document).ready(function($) {
    readDirectoryOnDrop();
    return $('#courseFolderDrop').on('dragover', function(e) {
      e.preventDefault();
      console.log("dragover new!");
      return e.stopPropagation();
    });
  }, $('#courseFolderDrop').on('dragenter', function(e) {
    e.preventDefault();
    return e.stopPropagation();
  }));

}).call(this);
