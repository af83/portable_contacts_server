var server = require('../server')
, model = require('../model')
, config = require('../config').config
, querystring = require('querystring')
;

var vows = require('vows')
  , assert = require('assert');

config.db.db_name = "portable_contacts_test";
model.init(config);

var portable_contacts = require('../portable_contacts').portable_contacts
, load_data = require('../scripts/load_data')
;

var R = model.RFactory();

function call_portable_contact(url) {
  return function() {
    var self = this;
    var req = {
      url: url
    };
    var res = {
      writeHead: function(status, headers) {
        this.status = status;
        this.headers = headers;
      },
      end: function(body) {
        this.body = body;
        self.callback(null, this);
      }
    };
    portable_contacts(req, res);
  }
}

function test_filter_op(filterOp) {
  var context = {
    topic:  call_portable_contact('http://localhost/portable_contacts?'+
                                  querystring.stringify({filterBy: 'emails.value',
                                                         filterOp: filterOp,
                                                         filterValue: 'John@Doe.fr'}))
  };
  context['FilterOp '+ filterOp +' is not implemented'] = function(res) {
      assert.equal(res.status, 503);
  }
  return context;
}

vows.describe('portable contact middleware').addBatch({
  "should": {
    topic: function() {
      var self = this;
      R.User.remove({}, function() {
        load_data.load_data(__dirname + '/../../examples/fake.json', self.callback);
      });
    },
    'accept': {
      topic: call_portable_contact('http://localhost/portable_contacts'),

      'no params': function (res) {
        assert.equal(res.status, 200);
        assert.equal(res.headers['Content-Type'], 'application/json');
        var data = JSON.parse(res.body);
        assert.equal(data.entry.length, 2);
      }
    },
    'filter': {
      topic: call_portable_contact('http://localhost/portable_contacts?'+
                                   querystring.stringify({filterBy: 'emails.value',
                                                          filterOp: 'equals',
                                                          filterValue: 'wendy.wellesley@example.com'})),

      'by email' : function(res) {
        assert.equal(res.status, 200);
        var data = JSON.parse(res.body);
        assert.equal(data.entry.length, 1);
        assert.equal(data.entry[0].displayName, "Wendy Wellesley");
      }
    },
    'and': {
      topic: call_portable_contact('http://localhost/portable_contacts?'+
                                   querystring.stringify({filterBy: 'emails.value',
                                                          filterOp: 'equals',
                                                          filterValue: 'John@Doe.fr'})),

      'Filter by email when more than one emails': function(res) {
          assert.equal(res.status, 200);
          var data = JSON.parse(res.body);
          assert.equal(data.entry.length, 1);
          assert.equal(data.entry[0].displayName, "John Doe");
      }
    },
    'filter with': {
      'contains': test_filter_op('contains'),
      'startwith': test_filter_op('startwith'),
      'present': test_filter_op('present')
    }
  }
}).export(module);
