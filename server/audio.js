var Audio = (function() {
    const ss = require('socket.io-stream');
    const PassThrough = require('stream').PassThrough;
    
    function prepareAudioStream(sessionKey, io) {
        var interStream = new PassThrough({
            objectMode: true,
            allowHalfOpen: true
        });
        var first = false;
        var teacherSocket;
        var audio = io
        .of('/' + sessionKey)
        .on('connection', function(socket) {
            socket.on('prepare', function() {
                teacherSocket = socket;
            });
            ss(socket).on('audio', function(incomingstream) {
                incomingstream.pipe(interStream);
                console.log("piped incoming audio");
            });
            ss(socket).on('join', function(stream) {
                if(teacherSocket) {
                    interStream.pipe(stream);
                    if(!first) {
                        teacherSocket.emit('ready');
                        first = true;
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