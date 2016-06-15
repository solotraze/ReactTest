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
/*
getRoutes['/api/readful'] = function(req, res) {
  var url = req.query.targeturl;
};
*/


/********************************/
/* POST Services				*/
/********************************/


/* Public properties */
exports.getRoutes = getRoutes;
exports.postRoutes = postRoutes;
exports.populateCache = populateCache;
