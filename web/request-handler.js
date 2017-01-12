var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var http = require('http');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {

    if (req.url === '/') {
      console.log(archive);
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

    req.on('data', function(data) {
      var data = ((data).toString()).slice(4);
      //check the archive
      archive.isUrlArchived(data, function(err, exists) {
        if (err) {
          console.log('there was an error:', err);
        }


        if (exists) {
         
          res.writeHead(302, {'Location': 'http://127.0.0.1:8080/' + data});
          res.end();

        } else {
          archive.addUrlToList(data, function(err) {
            if (err) {
              console.log(err);
            } else {
              httpHelpers.serveAssets(res, '/loading.html', function(data) {
                res.writeHead(302, httpHelpers.headers);
                res.end(data);
              });
            }
          });
          
        }
      });

      //we do have the page downloaded (its in archive)

      //we do not have the page downloaded:

    });


  }

};
