var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "text/html"
};

exports.serveAsset = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  fs.readFile(asset, 'utf8', function(err, data) {
    if (err) throw err;

    if (callback) {
      callback(res, data);
    } else {
      var contentType = null;
      var extension = path.extname(asset);
      if (extension === '.html') {
        contentType = 'text/html';
      } else if (extension === '.css') {
        contentType = 'text/css';
      }

      var headers = {
        "Content-Type": contentType
      }

      res.writeHead(200, headers);
      res.end(data);
    }
  });
};

exports.sendResponse = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(data);
}
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

// As you progress, keep thinking about what helper functions you can put here!
