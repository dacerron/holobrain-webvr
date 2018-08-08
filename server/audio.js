var Audio = (function() {
    const ss = require('socket.io-stream');
    const PassThrough = require('stream').PassThrough;
    
    function prepareAudioStream(sessionKey, io) {
        var interStream;
        var audio = io
        .of('/' + sessionKey)
        .on('connection', function(socket) {
            ss(socket).on('audio', function(incomingstream) {
                interStream = new PassThrough({
                    objectMode: true,
                    allowHalfOpen: true
                });
                interStream.on('data', (data) => {
                    console.log(JSON.stringify(data));
                });
                incomingstream.pipe(interStream);
                console.log("piped incoming audio");
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