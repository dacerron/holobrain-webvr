AFRAME.registerComponent("slide-container", {
  schema: {
    index: {type:'int', default:-1},
    target: {type:'selectorAll'},
    length: {type: 'int', default:0}
  },
  
  init: function() {
    this.el.setAttribute("slide-container", "length: " + this.data.target.length)
  },
  
  update: function(oldData) {
    var el = this.el;
    var data = this.data;

    console.log("new index: " + data.index)
    
    for (var i=0; i<data.target.length; i++) {
      if (i === data.index) {
        data.target[i].object3D.visible = true;
      } else {
        data.target[i].object3D.visible = false;
      }
    }
  }
})