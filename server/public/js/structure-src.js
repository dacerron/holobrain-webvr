var Structures = (function () {
    return {
        src: {
            "cortex": "/assets/Cortex.glb",
            "arteries": "/assets/Arteries.glb",
            "cerebellum": "/assets/Cerebellum.glb",
            "fornix": "/assets/Fornix.glb",
            "hippocampus": "/assets/Hippocampus.glb",
            "lamygdala": "/assets/L-Amygdala.glb",
            "lcaudate": "/assets/L-Caudate.glb",
            "lglobus": "/assets/L-Globus.glb",
            "lputamen": "/assets/L-Putamen.glb",
            "mamtract": "/assets/MamilloThalamicTract.glb",
            "mambodies": "/assets/MammillaryBodies.glb",
            "ramygdala": "/assets/R-Amygdala.glb",
            "rcaudate": "/assets/R-Caudate.glb",
            "rglobus": "/assets/R-Globus.glb",
            "rputamen": "/assets/R-Putamen.glb",
            "sinuses": "/assets/Sinuses.glb",
            "subnigra": "/assets/Substantia-Nigra.glb",
            "subthalamic": "/assets/Subthalamic-Nuclei.glb",
            "thalamus": "/assets/Thalamus.glb",
            "ventricles": "/assets/Ventricles.glb"
        },
        rules: {
            cortex: {
                expandPosition: {
                    disappear: true,
                    pos: "0 0 0"
                },
                ogPosition: {
                    pos: "0 0 0"
                },
                opacity: 0.5,
                gltfColor: "#ffffff"
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
                gltfColor: "#950714"                
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
                gltfColor: "#003366"
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
                gltfColor: "#ff81b0"
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
                gltfColor: "#ff81b0"
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
                gltfColor: "#00ffff"
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
                gltfColor: "#66cd00"
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
                gltfColor: "#ffd700"
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
                gltfColor: "#be29ec"
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
                gltfColor: "#3b5998"
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
                gltfColor: "#ff7f50"
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
                gltfColor: "#008080"
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
                gltfColor: "#000000"
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
                gltfColor: "#f6546a"
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
                gltfColor: "#45a54f"
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
                gltfColor: "#6760aa"
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
                gltfColor: "#f6546a"
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
                gltfColor: "#45a54f"
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
                gltfColor: "#4d4e4f"
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
                gltfColor: "#6760aa"
            }
        }
    }
})()