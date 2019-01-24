AFRAME.registerComponent('eduroomteacher', {
    schema: { 
        brain: {type: 'selector', default: '#holobrain'}
    },

    init: function () {
        var data = this.data;
        var sessionNumber = ""

        document.addEventListener("structures-loaded", () => {
            fetch("/teacher/createSession").then(function(res) {
                return res.text()
            }).then(function(text) {
                console.log("created session: " + text)
                sessionNumber = text
                shareInfo();
                shareHighlight();
            }).catch(function(err) {
                console.log("failed to create session!: " + err.message)
            })
        })

        var shareInfo = function() {
            setTimeout(() => {
                var info = StructureManager.GetStructuresInfo()
                fetch("/teacher/shareInfo?" + "id=" + sessionNumber, {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                    body: JSON.stringify(info)
                }).then(response => {
                    shareInfo();
                }).catch(err => {
                    console.log("problem sharing info with server, retrying: " + err.message)
                    shareInfo()
                })
            }, 300)
        }

        var shareHighlight = function() {
            setTimeout(() => {
                var highlighted = StructureManager.GetStructuresHighlight()
                fetch("/teacher/shareHighlight?" + "id=" + sessionNumber, {
                    method: "POST",
                    headers: {
                        "Content-Type": "text/plain"
                    },
                    body: JSON.stringify(highlighted)
                }).then(response => {
                    shareHighlight();
                }).catch(err => {
                    console.log("problem sharing highlight with server, retrying: " + err.message)
                    shareHighlight()
                })
            }, 100)
        }
        
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
