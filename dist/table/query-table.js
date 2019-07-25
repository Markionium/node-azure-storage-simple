"use strict";

var azure = require('azure-storage');

var getTableService = require('./get-table-service');

var unwrapTableValues = require('./unwrap-table-values');

module.exports = wrapQuery;

function wrapQuery(store, key, name) {
  var query = new azure.TableQuery();
  var wrapped = {
    select: function select() {
      for (var _len = arguments.length, columns = new Array(_len), _key = 0; _key < _len; _key++) {
        columns[_key] = arguments[_key];
      }

      //nothing to do ...
      if (!columns.length) return wrapped; //unwrap array ...

      if (columns.length === 1 && columns[0].length && !(columns[0] instanceof String)) columns = columns[0];
      query = query.select(colunms);
      return wrapped;
    },
    top: function top(count) {
      query = query.top(count);
      return wrapped;
    },
    where: function where() {
      var _query;

      query = (_query = query).where.apply(_query, arguments);
      return wrapped;
    },
    next: function next() {
      return getTableService(store, key, name).then(function (svc) {
        return runQuery(svc, name, query, null);
      });
    }
  };
  return wrapped;
}

function runQuery(service, name, query, continuationToken) {
  return new Promise(function (resolve, reject) {
    service.queryEntities(name, query, continuationToken, function (err, result, response) {
      if (err) {
        err.detail = {
          response: response
        };
        return reject(err);
      }

      ; //unwrap results

      var ret = (result.entries || []).map(unwrapTableValues); //set next method, if there are more records to retrieve

      if (result.continuationToken) ret.next = function () {
        return runQuery(service, name, query, result.continuationToken);
      };
      return resolve(ret);
    });
  });
}