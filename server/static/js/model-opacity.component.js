AFRAME.registerComponent('material-opacity', {
    schema: {type: "number", default: 1.0},
    init: function() {
        this.el.addEventListener('model-loaded', function(e) {
            e.detail.model.traverse(function(node) {
                if(node.isMesh) node.material.alphaTest = 0.5;
            }) ;
            this.update.bind(this)
        });
    },
    update: function() {
        var mesh = this.el.getObject3d('mesh');
        var data = this.data;
        if(!mesh) {return;}
        mesh.traverse(function(node) {
            if(node.isMesh) {
                node.material.opacity = data;
                node.material.transparent = data < 1.0;
                node.material.needsUpdate = true;
            }
        });
    }
})