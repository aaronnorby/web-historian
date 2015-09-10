var path = require('path');
var url = require('url');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  // res.end(archive.paths.list);
  var pathName = url.parse(req.url).path;
  console.log(pathName)
  if (req.method === "GET" && pathName === '/') {
    httpHelper.serveAsset(res, path.join(__dirname, 'public', 'index.html'));
  } else if (req.method === 'GET' && pathName === '/styles.css'){
    httpHelper.serveAsset(res, path.join(__dirname, 'public', 'styles.css'));
  } else if (req.method === 'POST') {
    req.addListener('data', function(data) {
      // if (archive.isUrlInList(data + '') && (archive.isUrlArchived(data + '')) {
      //   httpHelper.serveAsset(res, path.join(__dirname, '..', 'archives', 'sites' + data + '.html'))
      // }
      archive.addUrlToList(data);
    }); 

    httpHelper.serveAsset(res, path.join(__dirname, 'public', 'loading.html'), function(res, data) {
      httpHelper.sendResponse(res, data, 302)
    });
    archive.downloadUrls();
  }
};
