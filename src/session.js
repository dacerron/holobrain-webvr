var Session = (function () {
    //sessions will have info that is relevant to the specific
    var sessions = {};
    const Audio = require('./audio.js');
    const PassThrough = require('stream').PassThrough;
    const ss = require('socket.io-stream');

    var createSession = function(body) {
        let session = {};
        session.key = Math.round(Math.random() * 100000); //TODO: this should to avoid collisions
        session.body = {};
        return session;
    }

    var setSessionState = function(key, body) {
      sessions[key] = body;
    }

    var getSessionState = function(key) {
      return sessions[key];
    }

    var makeKey = function() {
      return Math.round(Math.random() * 100000);
    }

    var init = function(app) {
    }

    return {
      init
    }
})();

module.exports = Session;
