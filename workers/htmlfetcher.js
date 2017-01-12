// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');

exports.fetchHTML = function() {
  archive.readListOfUrls(function(err, data) {
    if (err) {
      console.log('there was an error:', err);
    } else {
      console.log('data:', data);
      archive.downloadUrls(data);
    }
  });
};
//read list of urls


//check for each is archived
  //if not, download it


