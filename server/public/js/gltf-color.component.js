AFRAME.registerComponent('gltf-color', {
    schema: {
        current: {default: "#ffffff", type: "string"}
    },
    init: function() {
        this.el.addEventListener('model-loaded', this.update.bind(this));
    },
    update: function() {
        var mesh = this.el.getObject3D('mesh');
        var color = this.data.current;
        if(!mesh) {return;}
        mesh.traverse(function(node) {
            if(node.isMesh) {
                var material = node.material;
                if(material.color) {
                    material.color.set(color);
                }
                material.needsUpdate = true;
            }
        })
    },
})