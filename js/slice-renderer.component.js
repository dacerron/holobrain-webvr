AFRAME.registerComponent("slice-renderer", {
  schema: {
    slices: {type: "selectorAll"},
    axis: {type: "string"},
    bound: {type: "number", default: 10}
  },
  
  init: function() {
    this.getBoundary = function(el, axis) {
      switch(axis) {
        case "z":
          return parseFloat((el.getAttribute("position").z + (1/2) * el.getAttribute("scale").z).toPrecision(4))
          break
        case "y":
          return parseFloat((el.getAttribute("position").y + (1/2) * el.getAttribute("scale").y).toPrecision(4))
          break
        default:
          return -100
      }
    }
  },
  
  update: function(oldData) {
      var data = this.data
      var el = this.el
    
      if(!data.axis) {
        console.log("please assign an axis for slice-renderer to slice against")
        return;
      }
      if(!data.slices) {
        console.log("slice-renderer could not find any slices")
        return;
      }
      
      for(var slice of data.slices) {
        if(this.getBoundary(slice, data.axis) <= data.bound) {
          slice.object3D.visible = true
        } else {
          slice.object3D.visible = false
      }
    }
  }
})