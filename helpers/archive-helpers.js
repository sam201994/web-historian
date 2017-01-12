var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    callback(err, data.split('\n'));
  });
};

exports.isUrlInList = function(url, callback) {
   var exists = false;
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    var dataArray = data.split('\n');
   
    for (var i = 0; i < dataArray.length; i++) {
      if (dataArray[i] === url) {
        exists = true;
        break;
      }
    }
    callback(err, exists);
  });
  return exists;
};

exports.addUrlToList = function(url, callback) {
  // exports.isUrlInList(url, function(err, exists){
  //   if (!exists) {
  //     //add to list
  //     fs.appendFile(exports.paths.list, '\n'+ url, function(err) {
  //       if (err) {
  //         console.log(err);
  //       } 
  //       console.log(exports.paths.list);
  //       console.log('successfully added to file!');
  //     });
  //   }

  // });

  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    // var dataArray = data.split('\n');
    // var exists = false;
    // for (var i = 0; i < dataArray.length; i++) {
    //   if (dataArray[i] === url) {
    //     exists = true;
    //     break;
    //   }
    // }
    //callback(err, exists);
    if (exports.isUrlInList(url, callback) === false) {
      fs.appendFile(exports.paths.list, url, function(err) {
        if (err) {
          console.log('Error: ', err);
        }
        callback(err);
      });
    }
  });

};

exports.isUrlArchived = function() {
};

exports.downloadUrls = function() {
};
