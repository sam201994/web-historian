var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

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
        fs.appendFile(exports.paths.list,  url + '\n', (err) => callback(err));
      }
    });
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.exists(exports.paths.archivedSites + '/' + url, function(exists) {
    callback(null, exists); //err is not returned from fs.exists, so set to null to pass tests callback
  });


};

exports.downloadUrls = function(urls) {
  //creat a new file
  urls.forEach(function(url) {

    exports.isUrlArchived(url, function(err, exists) {
      if (!exists) {
        request('http://' + url, function(error, response, body) {
          if (!error) {
            fs.writeFile(exports.paths.archivedSites + '/' + url, body, function(err) {
              if (err) {
                console.log('error with writing file:', err);
              }
            });
          } else {
            console.log('error in http request:', error);
          }
        });
      }  
    });
  });

};
