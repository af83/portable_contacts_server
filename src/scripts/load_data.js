// require server to add submodules to path:
require('../server');

var model = require('../model')
  , config = require('../config').config
  , fs = require('fs')
  ;

model.init(config);
var R = model.RFactory();

var load_data = function(data_file, callback) {
  fs.readFile(data_file, function(err, data) {
    if(err) throw err;
    var json_users = JSON.parse(data);
    var users = json_users.map(function(json_user) {
      return new R.User(json_user);
    });
    R.save(users, callback, function(err) {throw err;});
  });
};

if(process.argv[1] == __filename) {
  if(process.argv.length != 3) {
    console.log('USAGE: node '+process.argv[1]+' data.json')
    process.exit(1);
  }
  else R.User.remove({}, function() {
    load_data(process.argv[2], function(res) {
      console.log("done");
      process.exit(0);
    });
  });
};
