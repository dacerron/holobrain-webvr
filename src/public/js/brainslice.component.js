AFRAME.registerComponent("brainslice", {
  schema: {
    "duration": {type: "int", default: "500"},
    "zDist1": {type: "number", default: "0.2"}
  },
  
  init: function() {
    var el = this.el
    var data = this.data
    
    this.zAnimator1 = document.createElement("a-animation")
    this.zAnimator1.setAttribute("attribute", "position")
    this.zAnimator1.setAttribute("from", "0 0 " + el.getAttribute("position").z)
    this.zAnimator1.setAttribute("to", "0 0 " + (el.getAttribute("position").z + el.getAttribute("brainslice").zDist1))
    this.zAnimator1.setAttribute("dur", el.getAttribute("brainslice").duration)
  }
});