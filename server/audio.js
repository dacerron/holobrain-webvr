var Audio = (function() {
    var Env = require("./env.js");
    var ss = require('socket.io-stream');
    
    function prepareAudioStream(sessionKey, io) {
        var audioStream;
        var audio = io
        .of('/' + sessionKey)
        .on('connection', function(socket) {
            ss(socket).on('audio', function(incomingstream) {
                audioStream = incomingstream;
                console.log("starting audio stream");
            });

            ss(socket).on('join', function() {
                console.log("student tried to join");
                if(audioStream) {
                    var outgoingstream = ss.createStream();
                    ss(socketTo).emit('play', outgoingstream, data);
                    audioStream.pipe(outgoingstream);
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