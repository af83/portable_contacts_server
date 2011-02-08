
var router = require('connect').router
  , model = require('./model')
  , parseurl = require('url').parse
;

var portable_contacts = exports.portable_contacts = function(req, res) {
  /* Portable contacts end point. */
  var query = parseurl(req.url, true).query || {};
  var mongoquery = {};
  if (query.filterBy && query.filterValue) {
    if (query.filterOp == 'equals') {
      mongoquery[query.filterBy] = query.filterValue;
    } else {
      res.writeHead(503, {'Content-Type': 'application/json'});
      res.end();
      return;
    }
  }
  var R = model.RFactory();
  R.User.index({query: mongoquery}, function(users) {
    users = users.map(function(user) {
      return user.json();
    });
    var result = { startIndex: 0
                 , itemsPerPage: users.length
                 , totalResults: users.length
                 , entry: users
                 };
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(result));
  }, function(err) {
    res.writeHead(500, {'Content-Type': 'application/json'});
    res.end();
    console.error(err);
  });
};

exports.connector = function() {
  return router(function(app) {
    app.get('/portable_contacts', portable_contacts);
  });
};
