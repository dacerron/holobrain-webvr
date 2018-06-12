AFRAME.registerComponent("slice-renderer", {
  schema: {
    slices: {type: "selectorAll"},
    axis: {type: "string"},
    bound: {type: "number", default: 10},
    separation: {type: "number", default: 0.5},
    count: {type: "int", default: 0},
    controllers: {type: "selectorAll", default: ".sliceController"},
    invert: {type: "boolean", default: false}
  },
  
  init: function() {
    this.getBoundary = function(el, axis) {
      switch(axis) {
        case "z":
          return parseFloat((el.getAttribute("position").z + (1/2) * el.getAttribute("scale").z).toPrecision(3))
          break
        case "y":
          return parseFloat((el.getAttribute("position").y + (1/2) * el.getAttribute("scale").y).toPrecision(3))
          break
        default:
          return -100
      }
    }
    
    this.zAnimation = function(el, dir) {
      let pos = el.getAttribute("position")
      let newPos = pos.x + " " + pos.y + " " + (pos.z + 1/2 * dir * this.el.getAttribute("slice-renderer").separation)
      var anim = {
        property: "position",
        from: pos,
        to: newPos,
        dur: 500,
        loop: 0
      }
      return anim
    }.bind(this)
    
    this.zAnimationReset = function(el, dir) {
      let pos = el.getAttribute("position")
      let newPos = pos.x + " " + pos.y + " " + (pos.z +  -dir * this.el.getAttribute("slice-renderer").separation)
      var anim = {
        property: "position",
        from: pos,
        to: newPos,
        dur: 500,
        loop: 0
      }
      return anim
    }.bind(this)
    
    this.yAnimation = function(el, dir) {
      let pos = el.getAttribute("position")
      let newPos = pos.x + " " + (1/2 * dir * this.el.getAttribute("slice-renderer").separation + pos.y) + " " + pos.z 
      var anim = {
        property: "position",
        from: pos,
        to: newPos,
        dur: 500,
        loop: 0
      }
      return anim
    }.bind(this)
    
    this.yAnimationReset = function(el, dir) {
      let pos = el.getAttribute("position")
      let newPos = pos.x + " " + (-dir * this.el.getAttribute("slice-renderer").separation + pos.y) + " " + pos.z 
      var anim = {
        property: "position",
        from: pos,
        to: newPos,
        dur: 500,
        loop: 0
      }
      return anim
    }.bind(this)
  },
  
  update: function(oldData) {
    var data = this.data
    var el = this.el

    if(!data.slices) {
      console.log("slice-renderer could not find any slices")
      return
    }
    switch(data.axis) 
        {
      case "z":
        for(var slice of data.slices) {
          if(!!!data.invert) {
            let boundary = this.getBoundary(slice, data.axis)
            console.log("boundary for slice: " + boundary)
            if(boundary <= data.bound) {
              slice.setAttribute("animation", this.zAnimation(slice, -1))
            } else {
              slice.setAttribute("animation", this.zAnimation(slice, 1))
            }
          } else {
            if(this.getBoundary(slice, data.axis) <= data.bound) {
              slice.setAttribute("animation", this.zAnimationReset(slice, -1))
            } else {
              slice.setAttribute("animation", this.zAnimationReset(slice, 1))
            }
          }
        }
        break;
      case "y":
        for(var slice of data.slices) {
          if(!!!data.invert) {
            if(this.getBoundary(slice, data.axis) <= data.bound) {
              slice.setAttribute("animation", this.yAnimation(slice, -1))
            } else {
              slice.setAttribute("animation", this.yAnimation(slice, 1))
            }
          }else {
            if(this.getBoundary(slice, data.axis) <= data.bound) {
              slice.setAttribute("animation", this.yAnimationReset(slice, -1))
            } else {
              slice.setAttribute("animation", this.yAnimationReset(slice, 1))
            }
          }
        }
      default:
        break;
    }
  }
})