AFRAME.registerComponent('eduroomteacher', {
    schema: { 
        brain: {type: 'selector', default: '#holobrain'}
    },

    init: function () {
        var data = this.data;
        var parts,cortex, sinuses, ramygdala, lamygdala, mambodies, mamtract, hippocampus, fornix,
            arteries, ventricles, cerebellum, thalamus, subthalamic, lcaudate, lputamen, lglobuspallidus,
            rcaudate, rputamen, substantianigra, rglobuspallidus;
        brain = data.brain; 
        cortex = data.brain.querySelector("#brain-cortex");
        sinuses = data.brain.querySelector("#sinuses");
        ramygdala = data.brain.querySelector("#ramygdala");
        lamygdala = data.brain.querySelector("#lamygdala");
        mambodies = data.brain.querySelector("#mambodies");
        mamtract = data.brain.querySelector("#mamtract");
        hippocampus = data.brain.querySelector("#hippocampus");
        fornix = data.brain.querySelector("#fornix"); 
        arteries = data.brain.querySelector("#arteries");
        ventricles = data.brain.querySelector("#ventricles");
        cerebellum = data.brain.querySelector("#cerebellum");
        thalamus = data.brain.querySelector("#thalamus");
        subthalamic = data.brain.querySelector("#subthalamic");
        lcaudate = data.brain.querySelector("#lcaudate");
        lputamen = data.brain.querySelector("#lputamen");
        lglobuspallidus = data.brain.querySelector("#lglobuspallidus");
        rcaudate = data.brain.querySelector("#rcaudate");
        rputamen = data.brain.querySelector("#rputamen");
        substantianigra = data.brain.querySelector("#substantianigra");
        rglobuspallidus = data.brain.querySelector("#rglobuspallidus");

        var sessionKey;
        var socket = io.connect('/');
        socket.on('ready', function() {
            socket.on('teacherSessionCreated', function(data) {
                console.log("created session, key: " + data.key)
                sessionKey = data.key;
                document.querySelector("#session").setAttribute("value", "" + sessionKey);
                share(socket);
            });
            socket.on('teacherSessionCreateFailed', function(data) {
                console.log(data.error);
            });
            socket.emit('teacherJoin');
        })

        var getState = function() {
            return {
                brain: {
                    pos: brain.getAttribute("position"),
                    rot: brain.getAttribute("rotation"),
                },
                cortex: {
                    pos: cortex.getAttribute("position"),
                    rot: cortex.getAttribute("rotation"),
                    col: cortex.getAttribute("material").color
                },
                sinuses: {
                    pos: sinuses.getAttribute("position"),
                    rot: sinuses.getAttribute("rotation"),
                    col: sinuses.getAttribute("material").color
                },
                ramygdala: {
                    pos: ramygdala.getAttribute("position"),
                    rot: ramygdala.getAttribute("rotation"),
                    col: ramygdala.getAttribute("material").color
                },
                lamygdala: {
                    pos: lamygdala.getAttribute("position"),
                    rot: lamygdala.getAttribute("rotation"),
                    col: lamygdala.getAttribute("material").color
                },
                mambodies: {
                    pos: mambodies.getAttribute("position"),
                    rot: mambodies.getAttribute("rotation"),
                    col: mambodies.getAttribute("material").color
                },
                mamtract: {
                    pos: mamtract.getAttribute("position"),
                    rot: mamtract.getAttribute("rotation"),
                    col: mamtract.getAttribute("material").color
                },
                hippocampus: {
                    pos: hippocampus.getAttribute("position"),
                    rot: hippocampus.getAttribute("rotation"),
                    col: hippocampus.getAttribute("material").color
                },
                fornix: {
                    pos: fornix.getAttribute("position"),
                    rot: fornix.getAttribute("rotation"),
                    col: fornix.getAttribute("material").color
                },
                arteries: {
                    pos: arteries.getAttribute("position"),
                    rot: arteries.getAttribute("rotation"),
                    col: arteries.getAttribute("material").color
                },
                ventricles: {
                    pos: ventricles.getAttribute("position"),
                    rot: ventricles.getAttribute("rotation"),
                    col: ventricles.getAttribute("material").color
                },
                cerebellum: {
                    pos: cerebellum.getAttribute("position"),
                    rot: cerebellum.getAttribute("rotation"),
                    col: cerebellum.getAttribute("material").color
                },
                thalamus: {
                    pos: thalamus.getAttribute("position"),
                    rot: thalamus.getAttribute("rotation"),
                    col: thalamus.getAttribute("material").color
                },
                subthalamic: {
                    pos: subthalamic.getAttribute("position"),
                    rot: subthalamic.getAttribute("rotation"),
                    col: subthalamic.getAttribute("material").color
                },
                lcaudate: {
                    pos: lcaudate.getAttribute("position"),
                    rot: lcaudate.getAttribute("rotation"),
                    col: lcaudate.getAttribute("material").color
                },
                lputamen: {
                    pos: lputamen.getAttribute("position"),
                    rot: lputamen.getAttribute("rotation"),
                    col: lputamen.getAttribute("material").color
                },
                lglobuspallidus: {
                    pos: lglobuspallidus.getAttribute("position"),
                    rot: lglobuspallidus.getAttribute("rotation"),
                    col: lglobuspallidus.getAttribute("material").color
                },
                rcaudate: {
                    pos: rcaudate.getAttribute("position"),
                    rot: rcaudate.getAttribute("rotation"),
                    col: rcaudate.getAttribute("material").color
                },
                rputamen: {
                    pos: rputamen.getAttribute("position"),
                    rot: rputamen.getAttribute("rotation"),
                    col: rputamen.getAttribute("material").color
                },
                substantianigra: {
                    pos: substantianigra.getAttribute("position"),
                    rot: substantianigra.getAttribute("rotation"),
                    col: substantianigra.getAttribute("material").color
                },
                rglobuspallidus: {
                    pos: rglobuspallidus.getAttribute("position"),
                    rot: rglobuspallidus.getAttribute("rotation"),
                    col: rglobuspallidus.getAttribute("material").color
                },
            }
        }

        var share = function(socket) {
            setInterval(() => {
                socket.emit('teacherShareState', {
                    key: sessionKey,
                    state: getState()
                })
            }, 40);
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
