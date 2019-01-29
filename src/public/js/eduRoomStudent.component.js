AFRAME.registerComponent("eduroomstudent", {
    schema: {
        brain: {type: 'selector', default: '#holobrain'}
    },

    init: function () {
        var data = this.data;
        var sessionKey = Number.parseInt(CookieParser.grabCookie("session"));

        document.addEventListener("structures-loaded", function() {
            console.log("heard structures loaded event")
            if(sessionKey) {
                console.log("starting info request")
                startInfoRequest()
            } else {
                console.log("no session key, not communicating")
            }
        })

        var startInfoRequest = function() {
            fetch("/student/requestInfo?id=" + sessionKey, {
                method: "GET",
                headers: {
                    "Content-Type": "text/plain"
                }
            }).then((response) => {
                return response.text()
            }).then((text) => {=
                console.log(text)
                StructureManager.PutStructuresInfo(JSON.parse(text))
                setTimeout(a => startInfoRequest(), 250)
            }).catch((err) => {
                console.log("problem while fetching info: " + err.message)
                setTimeout((e) => {
                    console.log("retrying...")
                    startInfoRequest()
                })
            })
        }

        var startHighlightRequest = function() {
            fetch("/student/requestHighlight?id=" + sessionKey, {
                method: "GET",
                headers: {
                    "Content-Type": "text/plain"
                },
            }).then((response) => {
                return response.text()
            }).then((text) => {
                console.log("got highlight response: " + text)
                StructureManager.PutStructuresHighlight(text)
                setTimeout(() => startHighlightRequest(), 75)
            }).catch((err) => {
                console.log("error while fetching highlight: "  + err.message)
                setTimeout(() => {
                    console.log("retrying...")
                    startHighlightRequest()
                })
            })
        }
/*
        var stream;
        //session is created, connect to audio server
        function convertBlock(incoming) {
            var i, l = Object.keys(incoming).length;
            var buff = new Float32Array(l);
            for(i = 0; i < l; i ++) {
                buff[i] = incoming[i];
            }
            return buff;
        }

        var audioQueue = [];
        var audioCtx;
        var nextBufferTime = 0;
        function queueAudioBuffer(audioBuffer) {
            audioQueue.push(audioBuffer);
        }

        function startAudio() {
            var waitTime = 0;
            setInterval(() => {
                let curBuffer = audioQueue.shift();
                if(curBuffer !== undefined) {
                    let source = audioCtx.createBufferSource();
                    source.buffer = curBuffer;
                    source.connect(audioCtx.destination);
                    if(nextBufferTime === 0) {
                        nextBufferTime = audioCtx.currentTime + 0.05;
                    }
                    nextBufferTime += curBuffer.duration;
                    source.start(nextBufferTime);
                } else {
                    console.log("no data");
                }
            }, waitTime)
        }

        function initializePlayer(audioStream) {
            var context = window.AudioContext;
            audioCtx = new context({
                sampleRate: 44100
            });
            audioStream.on('data', function(data) {
                let buffer = audioCtx.createBuffer(1, 4096, audioCtx.sampleRate);
                buffer.copyToChannel(convertBlock(data), 0);
                queueAudioBuffer(buffer);
            });
            setTimeout(() => {
                startAudio();
            }, 1000)
        }
        this.share();
        */
    }
});
