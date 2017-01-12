var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    callback(err, data.split('\n'));
  });
};

exports.isUrlInList = function(url, callback) {
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    var dataArray = data.split('\n');
    var exists = false;

    dataArray.forEach(function(dataURL) {
      if (dataURL === url) {
        exists = true;
      }
    });
    
    callback(err, exists);
  });
};

exports.addUrlToList = function(url, callback) {
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    exports.isUrlInList(url, function(err, exists) {
      if (!exists) {
        fs.appendFile(exports.paths.list, url, (err) => callback(err));
      }
    });
  });
};

exports.isUrlArchived = function() {
};

exports.downloadUrls = function() {
};
