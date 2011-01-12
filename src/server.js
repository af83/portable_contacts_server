// Add location of submodules to path:
[ 'nodetk/src'
, 'rest-mongo/src'
, 'connect/lib'
].forEach(function(submodule) {
  require.paths.unshift(__dirname + '/../vendors/' + submodule);
});

var connect = require('connect')
  , config = require('./config').config
  , model = require('./model')
  , portable_contacts = require('./portable_contacts').connector
  ;

model.init(config);

var create_server = function() {
  return connect.createServer(
    portable_contacts()
  );
};


if(process.argv[1] == __filename) {
  var server = create_server();
  server.listen(config.port);
  console.log('Server listening on http://localhost:' + config.port);
}
