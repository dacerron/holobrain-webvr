AFRAME.registerComponent("slice-renderer", {
  schema: {
    slices: {type: "selectorAll"},
    axis: {type: "string"},
    bound: {type: "number", default: 10},
    separation: {type: "number", default: 0.5},
    count: {type: "int", default: 0},
    controllers: {type: "selectorAll"},
    invert: {type: "boolean", default: false}
  },
  
  init: function() {
    this.getBoundary = function(el, axis) {
      switch(axis) {
        case "z":
          return this.round(el.getAttribute("position").z + (1/2) * el.getAttribute("scale").z, 2)
          break
        case "y":
          return this.round(el.getAttribute("position").y + (1/2) * el.getAttribute("scale").y, 2)
          break
        default:
          return -100
      }
    }.bind(this)

    this.round = function(number, decimals) {
      return Number(Math.round(number + 'e' + decimals) + 'e-' + decimals)
    }
    
    //TODO: might want to make a fxn that rounds vec3's to make the animation fxns nicer
    this.zAnimation = function(el, dir) {
      let pos = el.getAttribute("position")
      let newPos = this.round(pos.x, 2) + " " + this.round(pos.y, 2) + " " + this.round((pos.z + 1/2 * dir * this.el.getAttribute("slice-renderer").separation), 2)
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
      let newPos = this.round(pos.x, 2) + " " + this.round(pos.y, 2) + " " + this.round((pos.z +  -dir * this.el.getAttribute("slice-renderer").separation), 2)
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
      let newPos = this.round(pos.x, 2) + " " + this.round((1/2 * dir * this.el.getAttribute("slice-renderer").separation + pos.y), 2) + " " + this.round(pos.z, 2) 
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
      let newPos = this.round(pos.x, 2) + " " + this.round((-dir * this.el.getAttribute("slice-renderer").separation + pos.y), 2) + " " + this.round(pos.z, 2) 
      var anim = {
        property: "position",
        from: pos,
        to: newPos,
        dur: 500,
        loop: 0
      }
      return anim
    }.bind(this)

    this.resetSlicesOnAxis = function(els, oldAxis) {
      let cur, og, assign
      for(let elmnt of els) {
        og = elmnt.getAttribute("og-position").pos
        cur = elmnt.getAttribute("position")
        assign = cur
        assign[oldAxis] = og[oldAxis]
        elmnt.setAttribute("position", assign)
      }
    }

    this.resetControllersOnAxis = function(conts, oldAxis) {
      let cur, og, assign
      for(let elmnt of conts) {
        og = elmnt.getAttribute("og-position").pos
        cur = elmnt.getAttribute("position")
        assign = cur
        assign[oldAxis] = og[oldAxis]
        elmnt.setAttribute("position", assign)
        elmnt.setAttribute("slice-controller", {
          state: 0
        })
      }
    }
  },
  
  update: function(oldData) {
    var data = this.data
    var el = this.el

    if(!data.slices) {
      console.log("slice-renderer could not find any slices")
      return
    }

    if(data.axis !== oldData.axis && oldData.axis && data.axis) {
      this.resetSlicesOnAxis(data.slices, oldData.axis)
      this.resetControllersOnAxis(data.controllers, oldData.axis)
    }
    
    var bound = this.round(data.bound, 2)

    switch(data.axis) 
        {
      case "z":
        for(var slice of data.slices) {
          let boundary = this.getBoundary(slice, data.axis)
          if(!!!data.invert) {
            if(boundary <= bound) {
              slice.setAttribute("animation", this.zAnimation(slice, -1))
            } else {
              slice.setAttribute("animation", this.zAnimation(slice, 1))
            }
          } else {
            if(boundary <= bound) {
              slice.setAttribute("animation", this.zAnimationReset(slice, -1))
            } else {
              slice.setAttribute("animation", this.zAnimationReset(slice, 1))
            }
          }
        }
        break;
      case "y":
        for(var slice of data.slices) {
          let boundary = this.getBoundary(slice, data.axis)
          if(!!!data.invert) {
            if(boundary <= bound) {
              slice.setAttribute("animation", this.yAnimation(slice, -1))
            } else {
              slice.setAttribute("animation", this.yAnimation(slice, 1))
            }
          }else {
            if(boundary <= bound) {
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