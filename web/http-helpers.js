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
  loading_html: path.join(__dirname, './public/loading.html'),
  index_css: path.join(__dirname, './public/styles.css'),
  index_favicon: path.join(__dirname, './public/favicon.ico')
};

//dynamic files mapped to paths
exports.dynamicFiles = {
  //add them here
  // index_html: path.join(__dirname, './public/index.html'),
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
   },
   '/favicon.ico': {
    asset: exports.staticFiles.index_favicon,
    'Content-Type': 'image/x-icon'
   },
   '/loading.html': {
    asset: exports.staticFiles.loading_html,
    'Content-Type': 'text/html'
  }
};

exports.handleGet = function(req, res) {
  let headers = exports.headers;
  //if not found in static endpoints
  console.log('req.url', req.url);
  if (exports.endpointsData.hasOwnProperty(req.url))
    // if not found in dynamoc endpoints
      // return 404
    //else handle dynamics
    
  //write the headers to response
  let endpointInfo = exports.endpointsData[req.url];
  
  headers['Content-Type'] = endpointInfo['Content-Type'];
  res.writeHead(200, headers);
  fs.readFile(endpointInfo.asset, function(errors, data){
    res.end(data);
  });  
};

exports.handlePost = function(req, res, url) {
  let headers = exports.headers;
  
  //checking for file existence
  fs.access(archive.paths.archivedSites + '/' + url, function (err) {
    //if error, write 404
    if (err) {
      res.writeHead(404, headers);
      res.end();
    //else, write 201, read file, add url to list
    } else {
      headers['Content-Type'] = 'text/html';
      res.writeHead(201, headers);
      //for now, return loading page
      fs.readFile(exports.endpointsData['/loading.html'].asset, function(errors, data){
        res.end(data);
      });  
      //adds url to list .txt
      archive.addUrlToList(url);
    }
  });
  
  
}

exports.extractRequestData = function(req, res) {
  //body is url
  let body = '';
  req.on('data', (chunk) => {
    console.log('chunk', chunk);
    body += chunk.toString();
  });
  req.on('end', () => {
    //turns body into pure url
    body = body.slice(body.indexOf('=') + 1);
    exports.handlePost(req, res, body);
  });
}

exports.serveAssets = function(res, asset, callback) {
};



// As you progress, keep thinking about what helper functions you can put here!
