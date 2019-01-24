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
            let current = document.querySelector("#" + name)
            current.setAttribute("position", struct[name].position)
            current.setAttribute("rotation", struct[name].rotation)
        }
    }

    PutStructuresHighlight = function (highlighted) {
        if (currentHighlight != "") {
            document.querySelector("#" + currentHighlight).emit("mouseleave") // this is bad coupling, eventually all highlight behaviour should be encapsulated
        }
        document.querySelector("#" + highlighted).emit("mouseenter")
    }

    var src = {
        cortex: "/assets/Cortex.glb",
        arteries: "/assets/Arteries.glb",
        cerebellum: "/assets/Cerebellum.glb",
        fornix: "/assets/Fornix.glb",
        hippocampus: "/assets/Hippocampus.glb",
        lamygdala: "/assets/L-Amygdala.glb",
        lcaudate: "/assets/L-Caudate.glb",
        lglobus: "/assets/L-Globus.glb",
        lputamen: "/assets/L-Putamen.glb",
        mamtract: "/assets/MamilloThalamicTract.glb",
        mambodies: "/assets/MammillaryBodies.glb",
        ramygdala: "/assets/R-Amygdala.glb",
        rcaudate: "/assets/R-Caudate.glb",
        rglobus: "/assets/R-Globus.glb",
        rputamen: "/assets/R-Putamen.glb",
        sinuses: "/assets/Sinuses.glb",
        subnigra: "/assets/Substantia-Nigra.glb",
        subthalamic: "/assets/Subthalamic-Nuclei.glb",
        thalamus: "/assets/Thalamus.glb",
        ventricles: "/assets/Ventricles.glb"
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
            class: "interactible",
            opacity: 0.5,
            gltfColor: "#ffffff",
            hoverHighlight: false
        },
        arteries: {
            ogPosition: {
                pos: "0 0 0"
            },
            expandPosition: {
                disappear: true,
                pos: "0 0 0"
            },
            class: "arteries interactible",
            opacity: 0.6,
            gltfColor: "#950714",
            hoverHighlight: true
        },
        sinuses: {
            expandPosition: {
                disappear: true,
                pos: "0 0 0"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "sinuses interactible",
            opacity: 0.6,
            gltfColor: "#003366",
            hoverHighlight: true
        },
        ramygdala: {
            expandPosition: {
                disappear: false,
                pos: "-25 -25 -25"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "amygdala interactible",
            gltfColor: "#ff81b0",
            hoverHighlight: {
                counterPart: "#lamygdala"
            }
        },
        lamygdala: {
            expandPosition: {
                disappear: false,
                pos: "-25 -25 25"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "amygdala interactible",
            gltfColor: "#ff81b0",
            hoverHighlight: {
                counterPart: "#ramygdala"
            }
        },
        mambodies: {
            expandPosition: {
                disappear: false,
                pos: "0 0 0"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "mambodies interactible",
            gltfColor: "#00ffff",
            hoverHighlight: true
        },
        mamtract: {
            expandPosition: {
                disappear: false,
                pos: "0 0 0"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "mamtract interactible",
            gltfColor: "#66cd00",
            hoverHighlight: true
        },
        hippocampus: {
            expandPosition: {
                disappear: false,
                pos: "0 0 0"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "hippocampus interactible",
            gltfColor: "#ffd700",
            hoverHighlight: true
        },
        fornix: {
            expandPosition: {
                disappear: false,
                pos: "0 0 0"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "fornix interactible",
            gltfColor: "#be29ec",
            hoverHighlight: true
        },
        ventricles: {
            expandPosition: {
                disappear: false,
                pos: "0 0 0",
            },
            ogPosition: {
                pos: "0 0 0",
            },
            class: "ventricles interactible",
            opacity: 0.6,
            gltfColor: "#3b5998",
            hoverHighlight: true
        },
        cerebellum: {
            expandPosition: {
                disappear: false,
                pos: "0 0 0"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "cerebellum interactible",
            gltfColor: "#ff7f50",
            hoverHighlight: true
        },
        thalamus: {
            expandPosition: {
                disappear: false,
                pos: "0 0 0"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "thalamus interactible",
            gltfColor: "#008080",
            hoverHighlight: true
        },
        subthalamic: {
            expandPosition: {
                disappear: false,
                pos: "0 0 0"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "subthalamic interactible",
            gltfColor: "#000000",
            hoverHighlight: true
        },
        lcaudate: {
            expandPosition: {
                disappear: false,
                pos: "0 10 20"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "caudate interactible",
            gltfColor: "#f6546a",
            hoverHighlight: {
                counterPart: "#rcaudate"
            }
        },
        lputamen: {
            expandPosition: {
                disappear: false,
                pos: "0 0 50"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "putamen interactible",
            gltfColor: "#45a54f",
            hoverHighlight: {
                counterPart: "#rputamen"
            }
        },
        lglobus: {
            expandPosition: {
                disappear: false,
                pos: "0 0 30"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "globuspallidus interactible",
            gltfColor: "#6760aa",
            hoverHighlight: {
                counterPart: "#rglobus"
            }
        },
        rcaudate: {
            expandPosition: {
                disappear: false,
                pos: "0 10 -20"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "caudate interactible",
            gltfColor: "#f6546a",
            hoverHighlight: {
                counterPart: "#lcaudate"
            }
        },
        rputamen: {
            expandPosition: {
                disappear: false,
                pos: "0 0 -50"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "putamen interactible",
            gltfColor: "#45a54f",
            hoverHighlight: {
                counterPart: "#lputamen"
            }
        },
        subnigra: {
            expandPosition: {
                disappear: false,
                pos: "0 0 0"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "substantianigra interactible",
            gltfColor: "#4d4e4f",
            hoverHighlight: true
        },
        rglobus: {
            expandPosition: {
                disappear: false,
                pos: "0 0 -30"
            },
            ogPosition: {
                pos: "0 0 0"
            },
            class: "globuspallidus interactible",
            gltfColor: "#6760aa",
            hoverHighlight: {
                counterPart: "#lglobus"
            }
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