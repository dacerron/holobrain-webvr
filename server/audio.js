var Audio = (function() {
    var Env = require("./env.js");
    var ss = require('socket.io-stream');
    
    function prepareAudioStream(sessionKey, io) {
        var interStream = ss.createStream(); 
        var audio = io
        .of('/' + sessionKey)
        .on('connection', function(socket) {
            ss(socket).on('audio', function(incomingstream, data) {
                incomingstream.pipe(interStream);
            });
            ss(socket).on('join', function(stream) {
                if(interStream) {
                    interStream.pipe(stream);
                    console.log("student joined");
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