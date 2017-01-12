var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {

    if (req.url === '/') {
      httpHelpers.serveAssets(res, '/index.html', function(data) {
        res.writeHead(200, httpHelpers.headers);
        res.end(data);
      });
    } else {

      archive.isUrlArchived(req.url, function(err, exists) {

        if (exists) {
          httpHelpers.serveArchivedAssets(res, req.url, function(data) {
            res.writeHead(200, httpHelpers.headers);
            res.end(data);
          });
        } else {

          res.writeHead(404);
          res.end();

        }


      });

    }

    //check if endpoints exists, if not set 404
  

  } else if (req.method === 'POST') {
    //check the archive

      archive.addUrlToList(req.url, function(err) {
        if (err) {
          console.log(err);
        } else {
          res.writeHead(302);
          res.end();
        }
      });
  }

};
