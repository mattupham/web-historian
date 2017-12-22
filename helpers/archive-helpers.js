var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */
//static paths for archived assets
exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!


// 1 COMPLETE
exports.addUrlToList = function(url) {
  //call isUrlInList, pass anonymous function
  console.log('in addURL', url);
  exports.isUrlInList(url, function(isInList) {
    //anonymous function is synomymous with the cb in isUrlInList
    if (isInList === false) {
      console.log('paths in addURL boolean', exports.paths.list);
      fs.appendFile(exports.paths.list, `${url}${'\n'}`, (error) => {
        console.log('paths in addURL', exports.paths.list);
        if (error) {
          throw (error);
        }
      });
    }
  });
    
  
  
};

// 2 COMPLETE
exports.isUrlInList = function(url, callback) {
  console.log('in isurlinlist', url);
  
  //take array from readList
  exports.readListOfUrls((data) => {
    var isInList = data.includes(url);
    //calls callback if url is in list (boolean)
    callback(isInList);
  });
};

//3 COMPLETE
exports.readListOfUrls = function(callback) {
  //fs readFile points to .txt
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {  
    if (err) {
      throw err;
    }
    
    if (callback) {
      //passes array of urls into callback
      data = data.split('\n');
      callback(data);
    } 
  });
};



exports.isUrlArchived = function(url, callback) {
  fs.open(exports.paths.archivedSites + '/' + url, 'r', function(err, data) {
    callback(!err);
  });
};

exports.downloadUrls = function(urls) {
};
