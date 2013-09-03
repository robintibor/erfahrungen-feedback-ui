(function() {
  var addProperty, addPropertyFile, errorHandler, fillAccordionWhenFilesRead, filterDirectoriesWithRegExp, filterForExerciseDirectories, filterForStudentDirectories, getAllEntries, hideBlackBorderOnDragLeave, lastFileRead, preventPropagationOnDragOver, readCourseDirectory, readDirectoryOnDrop, readExerciseDirectories, readExerciseDirectory, readStudentDirectories, setLastFileReadTimeIfNecessary, showBlackBorderOnDragEnter, showYellowBorderOnDropDiv, studentsToExercises, toArray;

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
          showYellowBorderOnDropDiv();
          readCourseDirectory(courseDirectory);
          return fillAccordionWhenFilesRead();
        }
      }
    });
  };

  showYellowBorderOnDropDiv = function() {
    $('#courseFolderDrop').removeClass('activeCourseFolderDrop');
    return $('#courseFolderDrop').addClass('droppedCourseFolderDiv');
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
    return filterDirectoriesWithRegExp(possibleStudentDirectories, /^[a-z]{2}[0-9]{1,3}$/);
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
    return filterDirectoriesWithRegExp(possibleExerciseDirectories, /(bungsblatt-[0-9]{1,2}(-improved){0,1}$)|proje[ck]t/);
  };

  filterDirectoriesWithRegExp = function(directories, regexp) {
    return jQuery.grep(directories, function(directory) {
      return directory.name.match(regexp);
    });
  };

  readExerciseDirectory = function(studentName, exerciseName, entries) {
    var addErfahrungenForThisExercise, addFeedbackForThisExercise, entry, _i, _len, _results;

    addErfahrungenForThisExercise = addPropertyFile.bind(this, studentName, exerciseName, "erfahrungen");
    addFeedbackForThisExercise = addPropertyFile.bind(this, studentName, exerciseName, "feedback");
    _results = [];
    for (_i = 0, _len = entries.length; _i < _len; _i++) {
      entry = entries[_i];
      if (entry.name.match(/^[Ee]rfahrung(en){0,1}(sbericht){0,1}\.txt$/)) {
        _results.push(entry.file(addErfahrungenForThisExercise, errorHandler));
      } else if (entry.name.match(/^[fF]eedback-tutor\.txt$/)) {
        _results.push(entry.file(addFeedbackForThisExercise, errorHandler));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  addPropertyFile = function(studentName, exerciseName, property, file) {
    var addPropertyToThisExercise, onerror, onload, reader;

    reader = new FileReader();
    addPropertyToThisExercise = addProperty.bind(this, studentName, exerciseName, property);
    onload = function(event) {
      var propertyText;

      propertyText = event.target.result;
      return addPropertyToThisExercise(propertyText);
    };
    onerror = function(error) {
      return reader.readAsText(file);
    };
    reader.onload = onload.bind(this);
    reader.onerror = onerror.bind(this);
    return reader.readAsText(file);
  };

  addProperty = function(studentName, exerciseName, property, propertyText) {
    studentsToExercises[studentName][exerciseName][property] = propertyText;
    return this.lastFileRead = Date.now();
  };

  lastFileRead = null;

  fillAccordionWhenFilesRead = function() {
    var maximumTimeToReadFile;

    setLastFileReadTimeIfNecessary();
    maximumTimeToReadFile = 2500;
    if (Date.now() - this.lastFileRead > maximumTimeToReadFile) {
      console.log("now start fillling accordions");
      return window.fillAccordionHTMLs(studentsToExercises);
    } else {
      return setTimeout(fillAccordionWhenFilesRead, 250);
    }
  };

  setLastFileReadTimeIfNecessary = function() {
    if (this.lastFileRead == null) {
      return this.lastFileRead = Date.now() + 1000;
    }
  };

  showBlackBorderOnDragEnter = function() {
    return $('#courseFolderDrop').on('dragenter', function(event) {
      event.preventDefault();
      event.stopPropagation();
      return $('#courseFolderDrop').addClass('activeCourseFolderDrop');
    });
  };

  preventPropagationOnDragOver = function() {
    return $('#courseFolderDrop').on('dragover', function(event) {
      event.preventDefault();
      return event.stopPropagation();
    });
  };

  hideBlackBorderOnDragLeave = function() {
    return $('#courseFolderDrop').on('dragleave', function(event) {
      event.preventDefault();
      event.stopPropagation();
      return $('#courseFolderDrop').removeClass('activeCourseFolderDrop');
    });
  };

  jQuery(document).ready(function($) {
    readDirectoryOnDrop();
    showBlackBorderOnDragEnter();
    preventPropagationOnDragOver();
    return hideBlackBorderOnDragLeave();
  });

}).call(this);
