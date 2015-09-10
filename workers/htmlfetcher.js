// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var path = require('path');
var fs = require('fs');
var request = require('request');
var archive = require('../helpers/archive-helpers.js');

archive.readListOfUrls(function(url) {
  request.get("http://" + url, function(err, resp, body){
    if (err) console.log(err);
    fs.writeFile(path.join(__dirname, '..', 'archives', 'sites', url + '.html'), body, function(err) {
      if (err) console.log(err);
    });
  });
});

console.log('child done');
  
