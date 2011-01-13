
var stools = require('nodetk/server_tools')
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
  }, function(err) {stools.server_error(res, err)});
};

exports.connector = function() {
  var routes = {GET: {}};
  routes.GET['/portable_contacts'] = portable_contacts;
  return stools.get_connector_from_str_routes(routes);
};
