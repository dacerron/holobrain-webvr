AFRAME.registerComponent('structure-loader', {
    schema: {
        cortex: {type: 'selector', default: '#cortex'}
    },

    init: function () {
        var cortex = this.data.cortex;
        var index = 0;
        const STRUCTURE_ITERATOR = Object.keys(StructureManager.src)
        var ERROR_COUNT = 0;
        const MAX_ERRORS = 100;
        var addModel = function () {
            if (STRUCTURE_ITERATOR.length <= index) { //done loading all structures
                if(STRUCTURE_ITERATOR.length == index) {
                    document.querySelector("a-scene").emit('structures-loaded')
                }
                return;
            } else {
                console.log("LOADING: " + STRUCTURE_ITERATOR[index])
                let curModel = document.getElementById(STRUCTURE_ITERATOR[index])
                if (!curModel) {
                    console.log("could not find " + STRUCTURE_ITERATOR[index] + ", creating")
                    curModel = document.createElement('a-entity')
                }
                curModel.addEventListener('model-loaded', () => {
                    console.log("heard model-loaded event")
                    index++
                    addModel();
                })
                curModel.addEventListener('model-error', () => {
                    console.log("ERROR loading structure");
                    ERROR_COUNT += 1;
                    if (MAX_ERRORS <= ERROR_COUNT) {
                        return;
                    } else {
                        addModel();
                    }
                })
                curModel.setAttribute('gltf-model', StructureManager.src[STRUCTURE_ITERATOR[index]])
                curModel.setAttribute('id', STRUCTURE_ITERATOR[index]);
                let curRules = StructureManager.rules[STRUCTURE_ITERATOR[index]];
                if (curRules) {
                    if (curRules.opacity) {
                        curModel.setAttribute('model-opacity', curRules.opacity);
                    }
                    if (curRules.gltfColor) {
                        curModel.setAttribute('gltf-color', "current:" + curRules.gltfColor);
                    }
                    if (curRules.class) {
                        curModel.setAttribute('class', curRules.class);
                    }
                    if (curRules.expandPosition) {
                        curModel.setAttribute('expand-position', 'disappear:' + curRules.expandPosition.disappear + '; pos:' + curRules.expandPosition.pos);
                    }
                    if (curRules.ogPosition) {
                        curModel.setAttribute('og-position', 'pos:' + curRules.ogPosition.pos)
                    }
                    if (curRules.hoverHighlight) {
                        curModel.setAttribute("hover-highlight", curRules.hoverHighlight.counterPart? "counterpart:" + curRules.hoverHighlight.counterPart:"")
                    }
                }
                if(STRUCTURE_ITERATOR[index] !== "cortex") {
                    cortex.appendChild(curModel);
                }
            }
        }
        addModel();
    },
});