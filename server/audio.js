var Audio = (function() {
    var Env = require("./env.js");
    var ss = require('socket.io-stream');
    
    function prepareAudioStream(sessionKey, io) {
        var interStream = ss.createStream();
        var audio = io
        .of('/' + sessionKey)
        .on('connection', function(socket) {
            ss(socket).on('audio', function(incomingstream) {
                incomingstream.pipe(interStream);
                audioStream.on('data', function(chunk) {
                    console.log(chunk);
                });
            });

            ss(socket).on('join', function(stream) {
                interStream.pipe(stream);
            });
        });
        return audio;
    }

    return {
        prepareAudioStream
    }
})()

module.exports = Audio;