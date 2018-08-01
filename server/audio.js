var Audio = (function() {
    var Env = require("./env.js");
    var ss = require('socket.io-stream');
    
    function prepareAudioStream(sessionKey, io) {
        var audio = io
        .of('/' + sessionKey)
        .on('connection', function(socket) {
            ss(socket).on('audio', function(incomingstream, data) {
                for(var i in io.connected) {
                    if(io.connected[i].id != socket.id) {
                        var socketTo = io.connected[i];
                        var outgoingstream = ss.createStream();
                        ss(socketTo).emit('play', outgoingstream, data);
                        incomingstream.pipe(outgoingstream);
                    }
                }
            });
        });
        console.log("audio stream ready");
        return audio;
    }

    return {
        prepareAudioStream
    }
})()

module.exports = Audio;