AFRAME.registerComponent('override-material', {

  
  init:function() {
  }, 
  
  update:function() {
    const mesh = this.el.getObject3D('mesh');
    const material = this.el.getAttribute("material");
    console.log(mesh);
    console.log(material);
    if (mesh) {
    mesh.traverse((node) => {
    if (node.isMesh && node.material) {
      
      console.log(node);
  
      if (node.material.isGLTFSpecularGlossinessMaterial) {
        node.onBeforeRender = function () {};
      }
      
      console.log("changing material");
      //node.material = material;
      
      console.log(material);
      console.log(node);
      //node.material.needsUpdate = true;
    }
  });}
  }, 

  
});

