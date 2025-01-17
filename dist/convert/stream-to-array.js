"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = streamToArray;

function streamToArray(stream, done) {
  if (!stream) {
    // no arguments, meaning stream = this
    stream = this;
  } else if (typeof stream === 'function') {
    // stream = this, callback passed
    done = stream;
    stream = this;
  }

  var deferred;
  if (!stream.readable) deferred = Promise.resolve([]);else deferred = new Promise(function (resolve, reject) {
    // stream is already ended
    if (!stream.readable) return resolve([]);
    var arr = [];
    stream.on('data', onData);
    stream.on('end', onEnd);
    stream.on('error', onEnd);
    stream.on('close', onClose);

    function onData(doc) {
      arr.push(doc);
    }

    function onEnd(err) {
      if (err) reject(err);else resolve(arr);
      cleanup();
    }

    function onClose() {
      resolve();
      cleanup();
    }

    function cleanup() {
      arr = null;
      stream.removeListener('data', onData);
      stream.removeListener('end', onEnd);
      stream.removeListener('error', onEnd);
      stream.removeListener('close', onClose);
    }
  });

  if (typeof done === 'function') {
    deferred.then(function (arr) {
      done(null, arr);
    }, done);
  }

  return deferred;
}