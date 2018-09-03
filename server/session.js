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

    var init = function(io) {
      var eduFirst = false;
      var key;
      io.of('/eduRoom')
      .on('connection', function(socket){
        //teacher joining triggers session initialization
        socket.on('teacherJoin', function() {
          console.log('teacher joining');
          //create session state
          key = makeKey();
          sessions[key] = {
            stream: new PassThrough({
              objectMode: true,
              allowHalfOpen: true,
            })
          }
          //prepare socket for events on session key namespace
          io.of('/' + key)
          .on('connection', function(sock) {
            ss(sock).on('studentJoin', function(stream) {
              if(sessions[key] !== undefined) {
                sessions[key].stream.pipe(stream);
              }
              if(!eduFirst) {
                socket.emit('share', {session: key});
                eduFirst = true;
              }
            });
            ss(sock).on('teacherShare', function(stream) {
              stream.pipe(sessions[key].stream);
            });
          });
          socket.emit('sessionReady', {session: key});
        });
      });
    }

    return {
      init
    }
})();

module.exports = Session;
