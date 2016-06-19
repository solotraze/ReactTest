// Refer: https://mongodb.github.io/node-mongodb-native/api-articles/nodekoarticle1.html

var constants = require('../constants.js');
//var logger = require('./logger');
var MongoClient = require('mongodb').MongoClient;

getDb = function(callback) {
  // Connect to the db
  MongoClient.connect(constants.CONNECTION_MONGODB, function(err, db) {
    if(!err) {
      console.log("DB is connected");
      callback(err, db);
    }
    else {
      console.log("DB failed to connected");
      callback(err);
    }
  });
};

add = function(comment, callback) {
  getDb(function(err, db) {
    if(!err) {
      var collection = db.collection('comments');
      collection.insert(comment, {w:1}, function(err, result) {
        if(!err) {
          console.log("comment added");
          callback(null);
        }
        else {
          console.log("comment could not be added");
          callback(err);
        }
      });
    }
    else {
      console.log("comment could not be added");
      callback(err);
    }
  });
};

getAll = function(callback) {
  getDb(function(err, db) {
    if(!err) {
      var items = [];
      var collection = db.collection('comments');
      var stream = collection.find().stream();
      stream.on("data", function(item) {
        items.push(item);
      });
      stream.on("end", function() {
        callback(null, items);
      });
    }
    else {
      console.log("comments could not be fetched");
      callback(err);
    }
  });
};


/* Public properties */
exports.add = add;
exports.getAll = getAll;
