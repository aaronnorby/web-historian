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

exports.paths = {
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

exports.readListOfUrls = function() {
};

exports.isUrlInList = function() {
};

exports.addUrlToList = function(url) {
  urlVar = url + '';
  urlVar = urlVar.split('=')[1];

  fs.appendFile(path.join(__dirname, '../', 'archives/', 'sites.txt'), urlVar + '\n', function(err) {
    if (err) throw err;
    console.log('The ' + urlVar + ' was appended to file!')
  })
};

exports.isUrlArchived = function() {
};

exports.downloadUrls = function() {
  var child = spawn('node', ['workers/htmlfetcher.js']);
  child.stdout.on('data', function(data) {
    console.log(data + '');
  });
  child.stderr.on('data', function(err){
    console.log('child err: ' + err);
  });
};
