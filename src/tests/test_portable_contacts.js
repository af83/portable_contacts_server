var server = require('../server')
, model = require('../model')
, config = require('../config').config
, assert = require('nodetk/testing/custom_assert')
, querystring = require('querystring')
;

config.db.db_name = "portable_contacts_test";
model.init(config);

var portable_contacts = require('../portable_contacts').portable_contacts
, load_data = require('../scripts/load_data')
;

var R = model.RFactory();

exports.setup = function(fn) {
  R.User.remove({}, function() {
    load_data.load_data(__dirname + '/../../examples/fake.json', fn);
  });
};

exports.tests = [

['No param', 3, function() {
  var req = {
    url: 'http://localhost/portable_contacts'
  };
  var res = {writeHead: function(status, headers) {
    assert.equal(status, 200);
    assert.equal(headers['Content-Type'], 'application/json');
  }, end: function(body) {
    var data = JSON.parse(body);
    assert.equal(data.entry.length, 2);
  }};
  portable_contacts(req, res);
}],

['Filter by email', 3, function() {
  var qs = querystring.stringify({filterBy: 'emails.value',
                                  filterOp: 'equals',
                                  filterValue: 'wendy.wellesley@example.com'});
  var req = {
    url: 'http://localhost/portable_contacts?'+ qs
  };
  var res = {writeHead: function(status, headers) {
    assert.equal(status, 200);
  }, end: function(body) {
    var data = JSON.parse(body);
    assert.equal(data.entry.length, 1);
    assert.equal(data.entry[0].displayName, "Wendy Wellesley");
  }};
  portable_contacts(req, res);
}],

['Filter by email when more than one emails', 3, function() {
  var qs = querystring.stringify({filterBy: 'emails.value',
                                  filterOp: 'equals',
                                  filterValue: 'John@Doe.fr'});
  var req = {
    url: 'http://localhost/portable_contacts?'+ qs
  };
  var res = {writeHead: function(status, headers) {
    assert.equal(status, 200);
  }, end: function(body) {
    var data = JSON.parse(body);
    assert.equal(data.entry.length, 1);
    assert.equal(data.entry[0].displayName, "John Doe");
  }};
  portable_contacts(req, res);
}],

['FilterOp != equals is not implemented', 3, function() {
  ['contains', 'startwith', 'present'].forEach(function(filterOp) {
    var qs = querystring.stringify({filterBy: 'emails.value',
                                    filterOp: filterOp,
                                    filterValue: 'John@Doe.fr'});
    var req = {
      url: 'http://localhost/portable_contacts?'+ qs
    };
    var res = {writeHead: function(status, headers) {
      assert.equal(status, 503);
    }, end: function(body) {}};
    portable_contacts(req, res);
  });
}],

];
