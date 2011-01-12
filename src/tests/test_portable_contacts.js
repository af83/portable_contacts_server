var server = require('../server')
, model = require('../model')
, config = require('../config').config
, assert = require('nodetk/testing/custom_assert')
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

['No param', 2, function() {
  var req = {};
  var res = {writeHead: function(status, headers) {
    assert.equal(status, 200);
  }, end: function(body) {
    var data = JSON.parse(body);
    assert.equal(data.entry.length, 2);
  }};
  portable_contacts(req, res);
}],

];
