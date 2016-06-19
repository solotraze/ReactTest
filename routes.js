var fs      = require('fs');
//var constants = require('./constants.js');
var logger = require('./logger');

var zcache, cache_get;
/* routing table entries */
var getRoutes = { };
var postRoutes = { };

/**
 *  Create the routing table entries + handlers for the application.
 */

/**
 *  Populate the cache.
 */
populateCache = function() {
    if (typeof zcache === "undefined") {
      zcache = { 'index.html': '' };
    }

    //  Local cache for static content.
    zcache['index.html'] = fs.readFileSync('./index.html');
};


/**
 *  Retrieve entry (content) from cache.
 *  @param {string} key  Key identifying content to retrieve from cache.
 */
cache_get = function(key) { return zcache[key]; };

/********************************/
/* Pages						*/
/********************************/
/* Home page */
getRoutes['/'] = function(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.send(cache_get('index.html') );
};

/********************************/
/* GET Services				*/
/********************************/

getRoutes['/api/users'] = function(req, res) {
  //var url = req.query.targeturl;
  var userFullName = 'solo tr';
  var returnObj = { userFullName: userFullName };
  res.setHeader('Content-Type', 'application/json');
  res.send(returnObj);
};

getRoutes['/api/comments'] = function(req, res) {
  //var url = req.query.targeturl;
  var commentsList = [
    {id: 1, authorName: "Pete Hunt", content: "This is one comment"},
    {id: 2, authorName: "Jordan Walke", content: "This is *another* comment"}
  ];
  var returnObj = { commentsList: commentsList, lastUpdated: (new Date().toUTCString())};
  res.setHeader('Content-Type', 'application/json');
  res.send(returnObj);
};


/********************************/
/* POST Services				*/
/********************************/

/* Create a new comment */
postRoutes['/api/comments'] = function(req, res) {
  console.log('Request recieved for new comment.\n'
              + req.body.authorName + ':\n'
              + req.body.content + '\n');

  // TODO: store in DB

  // Return success
  res.setHeader('Content-Type', 'application/json');
  res.send({success:true});

};


/* Public properties */
exports.getRoutes = getRoutes;
exports.postRoutes = postRoutes;
exports.populateCache = populateCache;
