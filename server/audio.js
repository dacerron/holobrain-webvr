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
                audioStream.on('data', function(chunk) {
                    console.log(chunk);
                });
            });

            ss(socket).on('join', function(stream) {
                if(audioStream) {
                    console.log("piping stream to student");
                    audioStream.pipe(stream);
                }
            });
        });
        return audio;
    }

    return {
        prepareAudioStream
    }
})()

module.exports = Audio;