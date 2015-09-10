var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var spawn = require('child_process').spawn;

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!


exports.readListOfUrls = readListOfUrls = function(cb) {
  fs.readFile(paths.list, function(err, data){
    if (err) throw err;
    var sites = (data+'').split('\n');
    for (var i = 0; i < sites.length; i++) {
      if (sites[i].length !== 0) {
        cb(sites[i])
      }
    }
  });
};

exports.isUrlInList = function(url, cb) {
  var contains = false;
  fs.readFile(paths.list, function(err, data){
    if (err) throw err;
    var sites = (data+'').split('\n');
    for (var i = 0; i < sites.length; i++) {
      if (sites[i].length !== 0) {
        if (sites[i] === url) {
          contains = true;
        }
      }
    }
    cb(contains);
  });
}



exports.addUrlToList = function(url) {
  urlVar = url;

  fs.appendFile(path.join(__dirname, '..', 'archives', 'sites.txt'), urlVar + '\n', function(err) {
    if (err) throw err;
    console.log('The ' + urlVar + ' was appended to file!')
  })
};

exports.isUrlArchived = function(url, cb) {
  console.log("urlarch: " + url)
  return fs.stat(path.join(__dirname, '../', 'archives/', 'sites/') + url + '.html', function(err, stat) {
    if (err) {
      cb(false);
    } else {
      cb(true);
    }
  });
};

exports.downloadUrls = function() {
  var child = spawn('node', [path.join(__dirname, '..', 'workers', 'htmlfetcher.js')]);
  child.stdout.on('data', function(data) {
    console.log(data + '');
  });
  child.stderr.on('data', function(err){
    console.log('child err: ' + err);
  });
};
