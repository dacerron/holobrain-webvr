AFRAME.registerComponent('og-position', {
  schema: {
    pos: {type: "vec3"}
  },
  
  init: function() {
    var el = this.el
    let pos = el.getAttribute("position")
    el.setAttribute("og-position", {
      pos: {
        x: pos.x,
        y: pos.y,
        z: pos.z
      }
    })
  }
})