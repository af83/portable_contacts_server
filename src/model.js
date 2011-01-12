
var rest_mongo = require('rest-mongo/core')
  , mongo_backend = require('rest-mongo/mongo_backend')
  , schema = require('./schema').schema
;


exports.init = function(config) {
  var backend = mongo_backend.get_backend(config.db);
  exports.RFactory = rest_mongo.getRFactory(schema, backend);
};
