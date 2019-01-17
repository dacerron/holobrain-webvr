AFRAME.registerComponent('structure-loader', {
    schema: {
        container: {type: 'selector'}
    },

    init: function() {
        var structureIterator = Object.keys(Structures.src);
        this.addModel(structureIterator, 0);
    },

    addModel(iter, i) {
        let curModel = document.createElement('a-entity');
        curModel.addEventListener('loaded', function() {
            addModel(iter, i++)
        })
        curModel.setAttribute('gltf-model', Structures.src[iter[i]])
        if(Structures.rules[iter[i]]) {

        }
    }
});