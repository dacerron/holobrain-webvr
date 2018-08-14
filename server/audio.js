var Audio = (function() {
    const ss = require('socket.io-stream');
    const PassThrough = require('stream').PassThrough;
    
    function prepareAudioStream(sessionKey, io) {
        var interStream = new PassThrough({
            objectMode: true,
            allowHalfOpen: true
        });
        var first = false;
        var audio = io
        .of('/' + sessionKey)
        .on('connection', function(socket) {
            ss(socket).on('audio', function(incomingstream) {
                incomingstream.pipe(interStream);
                console.log("piped incoming audio");
            });
            ss(socket).on('join', function(stream) {
                interStream.pipe(stream);
                socket.emit('ready');
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