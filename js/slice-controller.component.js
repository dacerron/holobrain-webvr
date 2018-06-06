AFRAME.registerComponent("slice-controller", {
  schema: {
    target: {"type": "selector"},
    axis: {type: "string"},
    torus: {type: "boolean", default: true},
    bound: {type: "number", default: 1000},
  },
  
  init: function() {
    var el = this.el
    var data = this.data
    
    el.addEventListener("click", function() {
      var controller = el.getAttribute("slice-controller")
      if(controller.torus) {
        controller.target.setAttribute("slice-renderer", {
          bound: el.getAttribute("position")[controller.axis],
          axis: controller.axis
        })
      } else {
        console.log("setting bound to "+ controller.bound)
        controller.target.setAttribute("slice-renderer", {
          bound: controller.bound,
          axis: controller.axis
        })
      }
    })
  }
})