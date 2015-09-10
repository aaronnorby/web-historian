var path = require('path');
var url = require('url');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  // res.end(archive.paths.list);
  var pathName = url.parse(req.url).path;
  if (req.method === "GET" && pathName === '/') {
    httpHelper.serveAssets(res, path.join(__dirname, './', 'public/', 'index.html'), httpHelper.sendResponse);
  } else if (req.method === 'GET' && pathName === '/styles.css'){
    httpHelper.serveAssets(res, path.join(__dirname, './', 'public/', 'styles.css'), httpHelper.sendResponse);
  } else if (req.method === 'POST') {
    req.addListener('data', function(data){
      if (archive.isUrlInList(data + '') && (archive.isUrlArchived(data + '')) {
        httpHelper.serveAssets(res, path.join(__dirname, '../', 'archives/', 'sites/' + data + '.html'))
      }
      archive.addUrlToList(data);
    }); 

    httpHelper.serveAssets(res, path.join(__dirname, './', 'public/', 'loading.html'), function(res,data) {
      httpHelper.sendResponse(res, data, 302)
    });
    archive.downloadUrls();
  }
};
