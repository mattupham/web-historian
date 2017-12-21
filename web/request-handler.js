var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var http_helpers = require('./http-helpers');
var fs = require('fs');

exports.handleRequest = function(req, res) {
  
  console.log(`Serving ${req.method} request at enpoint: ${req.url}`);
  exports.endpointAction = {
    'GET': http_helpers.handleGet,
    'POST': http_helpers.extractRequestData,
    // 'OPTIONS'http_helpers.handleOptions: 
  }
  
  exports.endpointAction[req.method](req, res);
  
  
  
  
  // console.log('req.method, req.url', req.method, req.url);
  // if (req.url === '/' || req.url === '/index.html') {
  //   fs.readFile(http_helpers.staticFiles.index_html, function(errors, data){
  //     res.end(data);
  //   });  
    
  //   // http_helpers.serveAssets(res, 'index_html', res.end.bind(this));
  // }
  // else if (req.url === '/styles.css') {
  //   //added correct headers to response object
  //   let headers = {'Content-Type':'text/css'};
  //   res.writeHead(200, headers)
  //   fs.readFile(http_helpers.staticFiles.index_css, function(errors, data){
  //     res.end(data);
  //   });  
    
  // }
  
  //reads list file, sends response object back to client

};
