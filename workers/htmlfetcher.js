// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var path = require('path');
var fs = require('fs');
var request = require('request');
var archive = require('../helpers/archive-helpers.js');

fs.readFile(archive.paths.list, function(err, data){
  if (err) throw err;
  var sites = (data+'').split('\n');
  // console.log(sites);
  for (var i = 0; i < sites.length; i++) {
    //console.log("site " + i + ": " + sites[i]);
    if (sites[i].length !== 0){
      //console.log(sites[i]);
      request.get("http://" + sites[i], function(err, resp, body) {
        //console.log(sites[i]);
        //console.log(body);
        if (err) throw err;
        fs.writeFile(path.join(__dirname, '../', 'archives/', 'sites/') + 'example' + '.html', body);

      });
    }
  }

  console.log('child done');
  
});



