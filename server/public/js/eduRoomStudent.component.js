AFRAME.registerComponent("eduroomstudent", {
    schema: {
        brain: {type: 'selector', default: '#holobrain'}
    },

    init: function () {
        var data = this.data;
        var sessionKey = Number.parseInt(CookieParser.grabCookie("session"));
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

        var socket = io.connect('/');
        socket.on('ready', function() {
            socket.on('studentShareState', function(data) {
                setState(data.state);
            });
            socket.emit('studentJoin', {key: sessionKey});
        }.bind(this));

        var setState = function (state) {
            brain.setAttribute("position", state.brain.pos);
            brain.setAttribute("rotation", state.brain.rot);
            updateObject(ventricles, state.ventricles);
            updateObject(thalamus, state.thalamus);
            updateObject(subthalamic, state.subthalamic);
            updateObject(lcaudate, state.lcaudate);
            updateObject(lputamen, state.lputamen);
            updateObject(substantianigra, state.substantianigra);
            updateObject(lglobuspallidus, state.lglobuspallidus);
            updateObject(rcaudate, state.lglobuspallidus);
            updateObject(rputamen, state.rputamen);
            updateObject(cortex, state.cortex);
            updateObject(sinuses, state.sinuses);
            updateObject(ramygdala, state.ramygdala);
            updateObject(lamygdala, state.lamygdala);
            updateObject(mambodies, state.mambodies);
            updateObject(mamtract, state.mamtract);
            updateObject(hippocampus, state.hippocampus);
            updateObject(fornix, state.fornix);
            updateObject(arteries, state.arteries);
            updateObject(cerebellum, state.cerebellum);
            updateObject(rglobuspallidus, state.rglobuspallidus);
        }

        var updateObject = function(obj, state) {
            obj.setAttribute("position", state.pos);
            obj.setAttribute("rotation", state.rot);
            obj.setAttribute("material", {color: state.col});
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
