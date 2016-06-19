/*** Constants ***/
var constantsList = {
  'CONNECTION_MONGODB':     'mongodb://localhost:27017/ReactTest',
	'DATA_PATH':              process.env.OPENSHIFT_DATA_DIR || './data/',
  'LOGFILE_TRACE':          'trace.json',
  'LOGFILE_ERROR':          'exceptions.json'
};

function define(name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
}

function defineAllConstants(constantsList) {
	for(var key in constantsList){
	    define(key,constantsList[key]);
	}
};

// Define all the constants
defineAllConstants(constantsList);

