AFRAME.registerComponent('structure-loader', {
    schema: {
        container: { type: 'selector' }
    },

    init: function () {
        var container = this.data.container;
        var ERROR_COUNT = 0;
        const MAX_ERRORS = 100;
        var addModel = function (iter, i) {
            let curModel = document.createElement('a-entity');

            curModel.addEventListener('model-loaded', function () {
                let index = i + 1;
                if(iter.length === index){
                    return;
                }
                addModel(iter, index);
            })
            curModel.addEventListener('model-error', function() {
                console.log("error loading structure");
                ERROR_COUNT += 1;
                if(MAX_ERRORS === ERROR_COUNT) {
                    return;
                }
                addModel(iter, i);
            })

            curModel.setAttribute('gltf-model', Structures.src[iter[i]])
            curModel.setAttribute('id', iter[i]);
            let curRules = Structures.rules[iter[i]];
            if (curRules) {
                if (curRules.opacity) {
                    curModel.setAttribute('model-opacity', curRules.opacity);
                }
                if(curRules.gltfColor) {
                    curModel.setAttribute('gltf-color', "current:" + curRules.gltfColor);
                }
                if(curRules.class) {
                    curModel.setAttribute('class', curRules.class);
                }
                if(curRules.expandPosition) {
                    curModel.setAttribute('expand-position', 'disappear:' + curRules.expandPosition.disappear + '; pos:' + curRules.expandPosition.pos);
                }
                if(curRules.ogPosition) {
                    curModel.setAttribute('og-position', 'pos:' + curRules.ogPosition.pos)
                }
            }
            container.appendChild(curModel);
        }
        var structureIterator = Object.keys(Structures.src);
        addModel(structureIterator, 0);
    },
});