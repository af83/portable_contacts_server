
var stools = require('nodetk/server_tools');
var model = require('./model');


var portable_contacts = function(res, res) {
  /* Portable contacts end point. */
  var R = model.RFactory();
  R.User.index({}, function(users) {
    var result = { startIndex: 0
                 , itemsPerPage: users.length
                 , totalResults: users.length
                 , entry: users
                 };
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(JSON.stringify(result));
  }, function(err) {stools.server_error(res, err)});
};

exports.connector = function() {
  var routes = {GET: {}};
  routes.GET['/portable_contacts'] = portable_contacts;
  return stools.get_connector_from_str_routes(routes);
};
