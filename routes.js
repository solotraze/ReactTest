var fs          = require('fs');
var comments    = require('./repositories/comments');
//var constants = require('./constants.js');
//var logger = require('./logger');


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
  /*
  var commentsList = [
    {authorName: "Pete Hunt", content: "This is one comment"},
    {authorName: "Jordan Walke", content: "This is *another* comment"}
  ];
  */

  comments.getAll(function(err, comments) {
    if (!err) {
      // Return list
      var returnObj = { commentsList: comments, lastUpdated: (new Date().toUTCString())};
      res.setHeader('Content-Type', 'application/json');
      res.send(returnObj);
    }
    else {
      // Return failure
      res.sendStatus(500);
    }
  });
};


/********************************/
/* POST Services				*/
/********************************/

/* Create a new comment */
postRoutes['/api/comments'] = function(req, res) {
  console.log('Request recieved for new comment.');
  console.log(req.body.authorName + ':' + req.body.content);

  var comment = { authorName: req.body.authorName, content: req.body.content };
  // store in DB
  comments.add(comment, function(err) {
    if (!err) {
      // Return success
      res.sendStatus(200);
    }
    else {
      // Return failure
      res.sendStatus(500);
    }
  });
};


/* Public properties */
exports.getRoutes = getRoutes;
exports.postRoutes = postRoutes;
exports.populateCache = populateCache;
