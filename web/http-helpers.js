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
  'index_html': path.join(__dirname, './public/index.html'),
  'loading_html': path.join(__dirname, './public/loading.html'),
  'index_css': path.join(__dirname, './public/styles.css'),
  'index_favicon': path.join(__dirname, './public/favicon.ico')
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
  
  console.log('req.url', req.url);
  //if found in static endpoints
  if (exports.endpointsData.hasOwnProperty(req.url)) {
    let endpointInfo = exports.endpointsData[req.url];
    headers['Content-Type'] = endpointInfo['Content-Type'];
    res.writeHead(200, headers);
    //reads file, sends back data
    fs.readFile(endpointInfo.asset, function(error, data) {
      res.end(data);
    }); 
  //if found in dynamic endpoints
  } else {
    archive.isUrlArchived(req.url, function(exists) {
      if (exists) {
        //return 200
        headers['Content-Type'] = 'text/html';
        res.writeHead(200, headers);
        //reads file, sends back data
        fs.readFile(archive.paths.archivedSites + '/' + req.url, function(error, data) {
          res.end(data);
        }); 
      } else {
        //return 404
        res.writeHead(404, headers);
        res.end();
      }
    });
  }
};

exports.handlePost = function(req, res, url) {
  let headers = exports.headers;
  console.log('in handle post', url);
  //checking for file existence

  archive.isUrlArchived(url, function(exists) {
    //if file is not found, return loading page, add url to list.txt
    if (exists) {
      headers['Content-Type'] = 'text/html';
      res.writeHead(302, headers);
      //adds url to list .txt
      archive.addUrlToList(url);
      //for now, return loading page
      fs.readFile(exports.endpointsData['/loading.html'].asset, function(errors, data) {
        res.end(data);
      });  
    } else {
      //write that the file was found
      res.writeHead(302, headers);
      //how to send a redirect request
      res.end();
    }
  });
};

exports.extractRequestData = function(req, res) {
  //body is url
  let bodyUrl = '';
  req.on('data', (chunk) => {
    //console.log('chunk', chunk);
    bodyUrl += chunk.toString();
    console.log(bodyUrl);
  });
  req.on('end', () => {
    
    //turns body into pure url
    bodyUrl = bodyUrl.slice(bodyUrl.indexOf('=') + 1);
    console.log('before handlepost',bodyUrl);
    exports.handlePost(req, res, bodyUrl);
  });
};

exports.serveAssets = function(res, asset, callback) {
};



// As you progress, keep thinking about what helper functions you can put here!
