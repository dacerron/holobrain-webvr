AFRAME.registerComponent('eduroomteacher', {
    schema: { type: 'vec3' },

    init: function () {
        this.sessionKey;

        //TODO: extend this function if we want to support more browsers
        this.makeXHR = function () {
            return new XMLHttpRequest();
        };

        this.sendState = function () {
            return new Promise(function (resolve, reject) {
                var req = this.makeXHR();
                req.open('POST', '/teacher/shareEducationalState');
                req.onload = function () {
                    if (req.status === 200) {
                        console.log("updated state, key: " + req.response);
                        resolve();
                    } else {
                        console.log("failed to update state");
                        reject();
                    }
                };
                req.setRequestHeader('Content-Type', 'application/json');
                let state = this.readState();
                let key = this.sessionKey;
                req.send(JSON.stringify({
                    state: state,
                    key: key,
                }));
            }.bind(this));
        }.bind(this);

        this.readState = function () {
            let brainParts, generalPos, generalRot, ventricles, ventriclesPos, ventriclesRot, thalamus, thalamusPos, thalamusRot,
                subthalamic, subthalamicPos, subthalamicRot, lCaudate, lCaudatePos, lCaudateRot, lPutamen, lPutamenPos, lPutamenRot,
                lSubstantiaNigra, lSubstantiaNigraPos, lSubstantiaNigraRot, lGlobusPallidus, lGlobusPallidusPos, lGlobusPallidusRot,
                rCaudate, rCaudatePos, rCaudateRot, rPutamen, rPutamenPos, rPutamenRot, rSubstantiaNigra, rSubstantiaNigraPos, rSubstantiaNigraRot,
                rGlobusPallidus, rGlobusPallidusPos, rGlobusPallidusRot;
            brainParts = document.querySelector("#isolated-brain-parts");
            generalPos = brainParts.getAttribute("position");
            generalRot = brainParts.getAttribute("rotation");
            ventricles = brainParts.querySelector("#isolated-ventricles");
            ventriclesPos = ventricles.getAttribute("position");
            ventriclesRot = ventricles.getAttribute("rotation");
            thalamus = brainParts.querySelector("#isolated-Thalamus");
            thalamusPos = thalamus.getAttribute("position");
            thalamusRot = thalamus.getAttribute("rotation");
            subthalamic = brainParts.querySelector("#isolated-Subthalamic");
            subthalamicPos = subthalamic.getAttribute("position");
            subthalamicRot = subthalamic.getAttribute("rotation");
            lCaudate = brainParts.querySelector("#isolated-Lcaudate");
            lCaudatePos = lCaudate.getAttribute("position");
            lCaudateRot = lCaudate.getAttribute("rotation");
            lPutamen = brainParts.querySelector("#isolated-Lputamen");
            lPutamenPos = lPutamen.getAttribute("position");
            lPutamenRot = lPutamen.getAttribute("rotation");
            lSubstantiaNigra = brainParts.querySelector("#isolated-Lsubstantianigra");
            lSubstantiaNigraPos = lSubstantiaNigra.getAttribute("position");
            lSubstantiaNigraRot = lSubstantiaNigra.getAttribute("rotation");
            lGlobusPallidus = brainParts.querySelector("#isolated-Lglobuspallidus");
            lGlobusPallidusPos = lGlobusPallidus.getAttribute("position");
            lGlobusPallidusRot = lGlobusPallidus.getAttribute("rotation");
            rCaudate = brainParts.querySelector("#isolated-Rcaudate");
            rCaudatePos = rCaudate.getAttribute("position");
            rCaudateRot = rCaudate.getAttribute("rotation");
            rPutamen = brainParts.querySelector("#isolated-Rcaudate");
            rPutamenPos = rPutamen.getAttribute("position");
            rPutamenRot = rPutamen.getAttribute("rotation");
            rSubstantiaNigra = brainParts.querySelector("#isolated-Rsubstantianigra");
            rSubstantiaNigraPos = rSubstantiaNigra.getAttribute("position");
            rSubstantiaNigraRot = rSubstantiaNigra.getAttribute("rotation");
            rGlobusPallidus = brainParts.querySelector("#isolated-Rglobuspallidus");
            rGlobusPallidusPos = rGlobusPallidus.getAttribute("position");
            rGlobusPallidusRot = rGlobusPallidus.getAttribute("rotation");

            return {
                general: {
                    pos: generalPos,
                    rot: generalRot
                },
                ventricles: {
                    pos: ventriclesPos,
                    rot: ventriclesRot
                },
                thalamus: {
                    pos: thalamusPos,
                    rot: thalamusRot
                },
                subthalamic: {
                    pos: subthalamicPos,
                    rot: subthalamicRot
                },
                lCaudate: {
                    pos: lCaudatePos,
                    rot: lCaudateRot
                },
                lPutamen: {
                    pos: lPutamenPos,
                    rot: lPutamenRot,
                },
                lSubstantiaNigra: {
                    pos: lSubstantiaNigraPos,
                    rot: lSubstantiaNigraRot,
                },
                lGlobusPallidus: {
                    pos: lGlobusPallidusPos,
                    rot: lGlobusPallidusRot,
                },
                rCaudate: {
                    pos: rCaudatePos,
                    rot: rCaudateRot
                },
                rPutamen: {
                    pos: rPutamenPos,
                    rot: rPutamenRot
                },
                rSubstantiaNigra: {
                    pos: rSubstantiaNigraPos,
                    rot: rSubstantiaNigraRot
                },
                rGlobusPallidus: {
                    pos: rGlobusPallidusPos,
                    rot: rGlobusPallidusRot
                }
            }
        }

        this.share = function () {
            setTimeout(function () {
                this.sendState().then(function () {
                    this.share();
                }.bind(this))
                    .catch(function () {
                        this.share();
                    }.bind(this));
            }.bind(this), 40);
        }

        var sessionRequest = new XMLHttpRequest();
        sessionRequest.open('PUT', '/teacher/createEducationalSession', true);
        sessionRequest.onload = function () {
            if (sessionRequest.status === 200) {
                console.log("created session, key: " + sessionRequest.response)
                this.sessionKey = sessionRequest.response;
                this.share();
            }
        }.bind(this);
        sessionRequest.setRequestHeader('Content-Type', 'application/json');
        console.log('sending request');
        sessionRequest.send(JSON.stringify(this.readState()));
    }
});