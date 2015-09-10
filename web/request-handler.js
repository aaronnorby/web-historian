var path = require('path');
var url = require('url');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  // res.end(archive.paths.list);
  var pathName = url.parse(req.url).path;

  if (req.method === "GET" && pathName === '/') {
    httpHelper.serveAsset(res, path.join(__dirname, 'public', 'index.html'));
  } else if (req.method === 'GET' && pathName === '/styles.css'){
    httpHelper.serveAsset(res, path.join(__dirname, 'public', 'styles.css'));
  } else if (req.method === "GET") {
    pathName = path.basename(pathName);
    archive.isUrlInList(pathName, function(boole) {
      if (!boole){
        httpHelper.sendResponse(res, null, 404);
      } else {
        archive.isUrlArchived(pathName, function(boole) {
          if (boole) {
            var file = pathName + '.html';
            httpHelper.serveAsset(res, path.join(__dirname, '..', 'archives', 'sites', file));
          } else {
            httpHelper.serveAsset(res, path.join(__dirname, 'public', 'loading.html'));
          }
        });
      }
    });
  } else if (req.method === 'POST') {
    req.addListener('data', function(data) {
      var urlName = (data + '').trim().split('=')[1];
      archive.isUrlInList(urlName, function(boole) {
        if (!boole) {
          archive.addUrlToList(urlName)
          httpHelper.serveAsset(res, path.join(__dirname, 'public', 'loading.html'), function(res, data) {
            httpHelper.sendResponse(res, data, 302)
          });
        } else {
          archive.isUrlArchived(urlName, function(boole) {
            if (boole) {
              httpHelper.serveAsset(res, path.join(__dirname, '..', 'archives', 'sites', urlName + '.html'))
            } else {
              httpHelper.serveAsset(res, path.join(__dirname, 'public', 'loading.html'));
            }
          })
        }
      }) 
    }); 
    // archive.downloadUrls();
  }
};

