AFRAME.registerComponent('override-material', {

  
  init:function() {
  }, 
  
  update:function() {
    const mesh = this.el.getObject3D('mesh');
    const material = this.el.getAttribute("material");
    if (mesh) {
    mesh.traverse((node) => {
    if (node.isMesh && node.material) {
      
  
      if (node.material.isGLTFSpecularGlossinessMaterial) {
        node.onBeforeRender = function () {};
      }
      //node.material = material;
      
      //node.material.needsUpdate = true;
    }
  });}
  }, 

  
});

