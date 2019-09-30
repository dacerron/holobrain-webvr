AFRAME.registerComponent('structure-loader', {
    schema: {
        cortex: {type: 'selector', default: '#cortex'}
    },

    init: function () {
        var cortex = this.data.cortex; // find the a-entity with the id of "cortex"
        var index = 0;
        const STRUCTURE_ITERATOR = Object.keys(StructureManager.src)
        var ERROR_COUNT = 0;
        const MAX_ERRORS = 100;
        var addModel = function () {
            if (STRUCTURE_ITERATOR.length <= index) { //done loading all structures
                if(STRUCTURE_ITERATOR.length == index) {
                    document.querySelector("a-scene").dispatchEvent(new Event('structures-loaded'))
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
                    if ('opacity' in curRules) {
                        curModel.setAttribute('model-opacity', curRules.opacity);
                    }
                    if ('gltfColor' in curRules) {
                        curModel.setAttribute('gltf-color', "current:" + curRules.gltfColor);
                    }
                    if ('class' in curRules) {
                        curModel.setAttribute('class', curRules.class);
                    }
                    if ('expandPosition' in curRules) {
                        curModel.setAttribute('expand-position', 'disappear:' + curRules.expandPosition.disappear + '; pos:' + curRules.expandPosition.pos);
                    }
                    if ('ogPosition' in curRules) {
                        curModel.setAttribute('og-position', 'pos:' + curRules.ogPosition.pos)
                    }
                    if ('hoverHighlight' in curRules) {
                        curModel.setAttribute("hover-highlight", curRules.hoverHighlight.counterPart? "counterpart:" + curRules.hoverHighlight.counterPart:"")
                    }
                    if('visible' in curRules) {
                        curModel.setAttribute("visible", curRules.visible)
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