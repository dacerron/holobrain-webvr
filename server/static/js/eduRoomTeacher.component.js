AFRAME.registerComponent('eduroomteacher', {
    schema: { type: 'vec3' },

    init: function () {
        this.sessionKey;
        var socket = io.connect('/');
        socket.on('ready', function() {
            socket.on('teacherSessionCreated', function(data) {
                console.log("created session, key: " + data.key)
                this.sessionKey = data.key;
                document.querySelector("#session").setAttribute("value", "" + this.sessionKey);
                share(socket);
            });
            socket.on('teacherSessionCreateFailed', function(data) {
                console.log(data.error);
            });
            socket.emit('teacherJoin');
        })

        var share = function(socket) {
            document.networkInterface = socket;
        }.bind(this);
        
        /*
        function initializeRecorder(mediaStream) {
            var audioContext = window.AudioContext;
            context = new audioContext({
                sampleRate: 44100
            });
            var audioInput = context.createMediaStreamSource(mediaStream);
            var bufferSize = 4096;
            var recorder = context.createScriptProcessor(bufferSize, 1, 1);
            recorder.onaudioprocess = recorderProcess;
            audioInput.connect(recorder);
            recorder.connect(context.destination);
        }

        function recorderProcess(e) {
            var left = e.inputBuffer.getChannelData(0);
            stream.write(left);
        }
        */
    },
});
