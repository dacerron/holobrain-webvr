StructureManager = (function () {
    var structures
    var currentHighlight = ""

    getStructures = function () {
        if (structures == undefined) {
            var names = Object.keys(src)
            structures = {}
            names.forEach(function (e) {
                structures[e] = {}
            })
        }
        return structures
    }

    updateStructuresInfo = function () {
        var struc = getStructures()
        for (var name in struc) {
            var current = document.getElementById(name)
            struc[name].position = current.getAttribute("position")
            struc[name].rotation = current.getAttribute("rotation")
            struc[name].visible = current.getAttribute("visible")
            if(current.hasAttribute("model-opacity")) {
                struc[name].opacity = current.getAttribute("model-opacity")
            }
            if(current.hasAttribute("scale")) {
                struc[name].scale = current.getAttribute("scale")
            }
        }
    }

    updateStructuresHighlight = function () {
        var struc = getStructures()
        for (var name in struc) {
            let current = document.getElementById(name)
            if (current.getAttribute("hover-highlight") && current.getAttribute("hover-highlight").highlighted) {
                currentHighlight = name
            }
        }
    }

    GetStructuresInfo = function () {
        updateStructuresInfo()
        return Object.assign({}, structures)
    }

    GetStructuresHighlight = function () {
        updateStructuresHighlight()
        return currentHighlight
    }

    //pass in object received from server to update self
    PutStructuresInfo = function (struc) {
        structures = getStructures()
        for (var name in structures) {
            console.log("updating " + JSON.stringify(struc[name]))
            let current = document.getElementById(name)
            let newRot = struc[name]["rotation"]
            let newPos = struc[name]["position"]
            let oldRot = current.getAttribute("rotation")
            let oldPos = current.getAttribute("position")
            if(differenceIsBigEnough(oldRot, newRot)){
                current.setAttribute("animation__rotation", "property: rotation; from: "+oldRot.x+" "+oldRot.y+" "+oldRot.z+";to:"+newRot.x+" "+newRot.y+" "+newRot.z+"; dur: 400; easing: linear")
            }
            if(differenceIsBigEnough(oldPos, newPos)) {
                current.setAttribute("animation__position", "property: position; from:"+oldPos.x+" "+oldPos.y+" "+oldPos.z+"; to:"+newPos.x+" "+newPos.y+" "+newPos.z+"; dur: 400; easing: linear")
            }
            current.setAttribute("visible", struc[name]["visible"])

            if('opacity' in struc[name]) {
                current.setAttribute("model-opacity", struc[name]["opacity"])
            }
            if('scale' in struc[name]) {
                current.setAttribute("scale", struc[name]["scale"])
            }
        }
    }

    PutStructuresHighlight = function (highlighted) {
        if (currentHighlight != "") {
            document.querySelector("#" + currentHighlight).emit("mouseleave") // this is bad coupling, eventually all highlight behaviour should be encapsulated
        }
        currentHighlight = highlighted
        document.querySelector("#" + currentHighlight).emit("mouseenter")
    }

    //expected object with x, y and z number attributes
    differenceIsBigEnough = function(old, next) {
        return Math.abs(old.x - next.x) > 1 || Math.abs(old.y - next.y) > 1 || Math.abs(old.z - next.z) > 1
    }

    var src = {
        cortex: "../assets/cortex.glb",
        arteries: "../assets/arteries.glb",
        cerebellum: "../assets/cerebellum.gltf",
        fornix: "../assets/fornix.glb",
        hippocampus: "../assets/hippocampus.glb",
        lamygdala: "../assets/L-Amygdala.gltf",
        lcaudate: "../assets/L-caudate.glb",
        lglobus: "../assets/L-Globus.gltf",
        lputamen: "../assets/L-Putamen.gltf",
        mamtract: "../assets/MamilloThalamicTract.gltf",
        mambodies: "../assets/MammillaryBodies.gltf",
        ramygdala: "../assets/R-Amygdala.gltf",
        rcaudate: "../assets/R-caudate.glb",
        rglobus: "../assets/R-Globus.gltf",
        rputamen: "../assets/R-Putamen.gltf",
        sinuses: "../assets/sinus.glb",
        subnigra: "../assets/Substantia-Nigra.gltf",
        subthalamic: "../assets/Subthalamic-Nuclei.gltf",
        thalamus: "../assets/thalamus.glb",
        ventricles: "../assets/ventricles.glb"
    }
    var rules = {
        cortex: {
            expandPosition: {
                disappear: true,
                pos: "0 0 0"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "",
            opacity: 0.5,
            gltfColor: "#ffffff",
            hoverHighlight: false,
            visible: true,
        },
        arteries: {
            ogPosition: {
                pos: "0 0 0"
            },
            expandPosition: {
                disappear: true,
                pos: "0 0 0"
            },
            class: "arteries",
            opacity: 0.6,
            gltfColor: "#950714",
            hoverHighlight: true,
            visible: false
        },
        sinuses: {
            expandPosition: {
                disappear: true,
                pos: "0 0 0"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "sinuses",
            opacity: 0.6,
            gltfColor: "#003366",
            hoverHighlight: true,
            visible: false
        },
        ramygdala: {
            expandPosition: {
                disappear: false,
                pos: "-25 -25 -25"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "amygdala",
            gltfColor: "#ff81b0",
            hoverHighlight: {
                counterPart: "#lamygdala"
            },
            visible: false
        },
        lamygdala: {
            expandPosition: {
                disappear: false,
                pos: "-25 -25 25"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "amygdala",
            gltfColor: "#ff81b0",
            hoverHighlight: {
                counterPart: "#ramygdala"
            },
            visible: false
        },
        mambodies: {
            expandPosition: {
                disappear: false,
                pos: "0 0 0"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "mambodies",
            gltfColor: "#00ffff",
            hoverHighlight: true,
            visible: false
        },
        mamtract: {
            expandPosition: {
                disappear: false,
                pos: "0 0 0"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "mamtract",
            gltfColor: "#66cd00",
            hoverHighlight: true,
            visible: false
        },
        hippocampus: {
            expandPosition: {
                disappear: false,
                pos: "0 0 0"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "hippocampus",
            gltfColor: "#ffd700",
            hoverHighlight: true,
            visible: false
        },
        fornix: {
            expandPosition: {
                disappear: false,
                pos: "0 0 0"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "fornix",
            gltfColor: "#be29ec",
            hoverHighlight: true,
            visible: false
        },
        ventricles: {
            expandPosition: {
                disappear: false,
                pos: "0 0 0",
            },
            ogPosition: {
                pos: "0 0 0",
            },
            class: "ventricles",
            opacity: 0.6,
            gltfColor: "#3b5998",
            hoverHighlight: true,
            visible: true
        },
        cerebellum: {
            expandPosition: {
                disappear: false,
                pos: "0 0 0"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "cerebellum",
            gltfColor: "#ff7f50",
            hoverHighlight: true,
            visible: false
        },
        thalamus: {
            expandPosition: {
                disappear: false,
                pos: "0 0 0"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "thalamus",
            gltfColor: "#008080",
            hoverHighlight: true,
            visible: false
        },
        subthalamic: {
            expandPosition: {
                disappear: false,
                pos: "0 0 0"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "subthalamic",
            gltfColor: "#000000",
            hoverHighlight: true,
            visible: false
        },
        lcaudate: {
            expandPosition: {
                disappear: false,
                pos: "0 10 20"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "caudate",
            gltfColor: "#f6546a",
            hoverHighlight: {
                counterPart: "#rcaudate"
            },
            visible: false
        },
        lputamen: {
            expandPosition: {
                disappear: false,
                pos: "0 0 50"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "putamen",
            gltfColor: "#45a54f",
            hoverHighlight: {
                counterPart: "#rputamen"
            },
            visible: false
        },
        lglobus: {
            expandPosition: {
                disappear: false,
                pos: "0 0 30"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "globuspallidus",
            gltfColor: "#6760aa",
            hoverHighlight: {
                counterPart: "#rglobus"
            },
            visible: false
        },
        rcaudate: {
            expandPosition: {
                disappear: false,
                pos: "0 10 -20"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "caudate",
            gltfColor: "#f6546a",
            hoverHighlight: {
                counterPart: "#lcaudate"
            },
            visible: false
        },
        rputamen: {
            expandPosition: {
                disappear: false,
                pos: "0 0 -50"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "putamen",
            gltfColor: "#45a54f",
            hoverHighlight: {
                counterPart: "#lputamen"
            },
            visible: false
        },
        subnigra: {
            expandPosition: {
                disappear: false,
                pos: "0 0 0"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "substantianigra",
            gltfColor: "#4d4e4f",
            hoverHighlight: true,
            visible: false
        },
        rglobus: {
            expandPosition: {
                disappear: false,
                pos: "0 0 -30"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "globuspallidus",
            gltfColor: "#6760aa",
            hoverHighlight: {
                counterPart: "#lglobus"
            },
            visible: false
        }
    }

    return {
        GetStructuresInfo,
        GetStructuresHighlight,
        PutStructuresInfo,
        PutStructuresHighlight,
        src,
        rules
    }
}())