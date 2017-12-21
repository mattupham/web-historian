const path = require('path');
const fs = require('fs');
const archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

//static files mapped to paths
exports.staticFiles = {
  index_html: path.join(__dirname, './public/index.html'),
  index_css: path.join(__dirname, './public/styles.css')
};

exports.endpointsData = {
  '/': {
    asset: exports.staticFiles.index_html,
    'Content-Type': 'text/html'
  },
  '/index.html': {
    asset: exports.staticFiles.index_html,
    'Content-Type': 'text/html'
  },
  '/styles.css': {
    asset: exports.staticFiles.index_css,
    'Content-Type': 'text/css'
   }  
};

exports.handleGet = function(req, res) {
  let endpointInfo = exports.endpointsData[req.url];
  let headers = exports.headers;
  headers['Content-Type'] = endpointInfo['Content-Type'];
  res.writeHead(200, headers)
  fs.readFile(endpointInfo.asset, function(errors, data){
    res.end(data);
  });  
}

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  
  
  
  
  
  
  // fs.readFile(exports.staticFiles[asset], (error, data) => {
  //   if (!error) {
  //     res.end(data);
  //   }
  //   else {
  //     console.log(error);
  //   }
  // });
};



// As you progress, keep thinking about what helper functions you can put here!
