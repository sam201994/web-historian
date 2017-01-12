var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    httpHelpers.serveAssets(res, '/index.html', function(data) {
      res.writeHead(200, httpHelpers.headers);
      res.end(data);
    });
  } else if (req.method === 'POST') {
    //check the archive
    //if not in archive, start process to add
    //render the loading 
    res.end(archive.paths.list);
  }

};
