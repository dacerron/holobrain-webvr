AFRAME.registerComponent('structure-loader', {
    schema: {
        container: { type: 'selector' }
    },

    init: function () {
        console.log('structure-loader init')
        var container = this.data.container;
        var addModel = function (iter, i) {
            let curModel = document.createElement('a-entity');
            curModel.addEventListener('loaded', function () {
                if(iter.length === i++){
                    return;
                }
                addModel(iter, i)
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
            }
            container.appendChild(curModel);
        }
        var structureIterator = Object.keys(Structures.src);
        addModel(structureIterator, 0);
    },
});