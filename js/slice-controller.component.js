AFRAME.registerComponent("slice-controller", {
  schema: {
    target: {"type": "selector"},
    controllers: {"type": "selectorAll", default: ".sliceController"},
    axis: {type: "string"},
    position_based: {type: "boolean", default: true},
    bound: {type: "number", default: 1000},
    state: {type: "int", default: 0},
    animating: {type: "boolean", default: false}
  },
  
  init: function() {
    var el = this.el
    var data = this.data
    
    el.addEventListener("click", function() {
      let state = this.el.getAttribute("slice-controller").state
      
      //wont do anything if currently animating
      if(this.el.getAttribute("slice-controller").animating) {
        console.log("animation canceled because currently animating")
        return;
      }
      
      //if not animating, start animating
      this.el.setAttribute("slice-controller", {
        animating: true
      })
      
      switch(state) {
        case 0:
          //do first motion, update state
          this.expand(this.el)
          this.el.setAttribute("slice-controller", {
            state: 1
          })
          break;
        case 1:
          this.expand(this.el)
          this.el.setAttribute("slice-controller", {
            state: 2
          })
          //do second motion, update state
          break;
        case 2:
          //undo last two motions, reset state
          this.contract(this.el)
          this.el.setAttribute("slice-controller", {
            state: 0
          })
          break;
        default:
          break;
      }
      //wait for the animation we just called to finish before allowing another
      this.waitForAnimation(500).then(function(res) {
        this.el.setAttribute("slice-controller", {
          animating: false
        })
      }.bind(this))
    }.bind(this))
    
    this.waitForAnimation = function(duration) {
      return new Promise(function(res, rej) {
        setTimeout(() => {
          res();
        }, duration)
      })
    }
    
    this.moveControllerZ = function(el, dir) {
      let pos = el.getAttribute("position")
      let dist = el.getAttribute("slice-controller").target.getAttribute("slice-renderer").separation;
      let newPos = pos.x + " " + pos.y + " " + (pos.z + (1/2 * dir * dist))
      var anim = {
        property: "position",
        from: pos,
        to: newPos,
        dur: 500,
        loop: 0
      }
      return anim
    }.bind(this)
    
    this.resetControllerZ = function(el, dir) {
      let pos = el.getAttribute("position")
      let dist = el.getAttribute("slice-controller").target.getAttribute("slice-renderer").separation;
      let newPos = pos.x + " " + pos.y + " " + (pos.z + (-dir * dist))
      var anim = {
        property: "position",
        from: pos,
        to: newPos,
        dur: 500,
        loop: 0
      }
      return anim
    }.bind(this)
    
    this.moveControllerY = function(el, dir) {
      let pos = el.getAttribute("position")
      let dist = el.getAttribute("slice-controller").target.getAttribute("slice-renderer").separation;
      let newPos = pos.x + " " + (pos.y + (1/2 * dir * dist)) + " " + pos.z
      var anim = {
        property: "position",
        from: pos,
        to: newPos,
        dur: 500,
        loop: 0
      }
      return anim
    }.bind(this)
    
    this.resetControllerY = function(el, dir) {
      let pos = el.getAttribute("position")
      let dist = el.getAttribute("slice-controller").target.getAttribute("slice-renderer").separation;
      let newPos = pos.x + " " + (pos.y + (-dir * dist)) + " " + pos.z
      var anim = {
        property: "position",
        from: pos,
        to: newPos,
        dur: 500,
        loop: 0
      }
      return anim
    }.bind(this)
    
    this.expand = function(el) {
      var controller = el.getAttribute("slice-controller")
      if(controller.position_based) {
        controller.target.setAttribute("slice-renderer", {
          bound: el.getAttribute("position")[controller.axis],
          axis: controller.axis,
          count: controller.count + 1,
          invert: false,
        })
      } else {
        console.log("setting bound to "+ controller.bound)
        controller.target.setAttribute("slice-renderer", {
          bound: controller.bound,
          axis: controller.axis,
          count: controller.count + 1,
          invert: false,
        })
      }
      
      for(let controller of el.getAttribute("slice-controller").controllers) {
        if(controller.getAttribute("position") === this.el.getAttribute("position")){
          continue;
        }
        
        //shorthand for setting animation attr.
        var change = function(el, anim) {
          el.setAttribute("animation", anim)
        }
        
        switch(el.getAttribute("slice-controller").axis){
          case "z":
            if(controller.getAttribute("slice-controller").axis === "y"){
              change(controller, this.moveControllerZ(controller, -1))
            } else {
              if(controller.getAttribute("position").z > this.el.getAttribute("position").z) {
                change(controller, this.moveControllerZ(controller, 1))
              } else {
                change(controller, this.moveControllerZ(controller, -1))
              }
            }
          break;
          case "y":
            if(controller.getAttribute("position").y > this.el.getAttribute("position").y) {
              change(controller, this.moveControllerY(controller, 1))
            } else {
              change(controller, this.moveControllerY(controller, -1))
            }
          break;
        }
      }
    }
    
    this.contract = function(el) {
      var controller = el.getAttribute("slice-controller")
      if(controller.position_based) {
        controller.target.setAttribute("slice-renderer", {
          bound: el.getAttribute("position")[controller.axis],
          axis: controller.axis,
          count: controller.count + 1,
          invert: true,
        })
      } else {
        console.log("setting bound to "+ controller.bound)
        controller.target.setAttribute("slice-renderer", {
          bound: controller.bound,
          axis: controller.axis,
          count: controller.count + 1,
          invert: true,
        })
      }
      
      for(let controller of el.getAttribute("slice-controller").controllers) {
        if(controller.getAttribute("position") === this.el.getAttribute("position")){
          continue;
        }
        
        //shorthand for setting animation attr.
        var change = function(el, anim) {
          el.setAttribute("animation", anim)
        }
        
        switch(el.getAttribute("slice-controller").axis){
          case "z":
            if(controller.getAttribute("slice-controller").axis === "y"){
              change(controller, this.resetControllerZ(controller, -1))
            } else {
              if(controller.getAttribute("position").z > this.el.getAttribute("position").z) {
                change(controller, this.resetControllerZ(controller, 1))
              } else {
                change(controller, this.resetControllerZ(controller, -1))
              }
            }
          break;
          case "y":
            if(controller.getAttribute("position").y > this.el.getAttribute("position").y) {
              change(controller, this.resetControllerY(controller, 1))
            } else {
              change(controller, this.resetControllerY(controller, -1))
            }
          break;
        }
      }
    }
  }
})