var fs = require('fs');
var constants = require('./constants');

var failedUrlsLogFileName = constants.dataPath + constants.failedUrlsLogFileName

var logFailedUrl = function (urlToLog) {
  var contentToWrite = { url : urlToLog, logTime : (new Date()).toString() }
  fs.appendFile(failedUrlsLogFileName, (JSON.stringify(contentToWrite) + ',\n'), null);
};

var readFailedUrls = function (callback) {
  fs.readFile (failedUrlsLogFileName, 'utf8', function (err, data) {
    if (err) {
      console.log('Failed to read log file.');
      callback('{ "urls" : [] }');
      return;
    }
    if (data.lastIndexOf(',') > -1) {
      data = data.substr(0, data.lastIndexOf(','));
    }

    callback('{ "urls" : [' + data + '] }');
    return;
  });
};

exports.logFailedUrl = logFailedUrl;
exports.readFailedUrls = readFailedUrls;
