AFRAME.registerComponent("play-button", {
  schema: {
    target: {type: 'selector'},
    rate: {type: 'int', default: 500},
    playing: {type: 'boolean', default: false},
    intervalId: {type: 'string'},
    buttonText: {type:'selector', default:'#play-button-text'}
  },
  
  init: function() {
    var el = this.el
    var data = this.data
    
    el.addEventListener('click', function(e) {
      let button = el.getAttribute("play-button")
      if(button.playing) {
        if(!button.intervalId) {
          console.log("playing but no interval id")
          return
        }
        clearInterval(button.intervalId)
        
        el.setAttribute("play-button", "playing:" + false)
        el.setAttribute("play-button", "intervalId", "")
        button.buttonText.setAttribute("text", {value: "Play"})
        
      } else {
        el.setAttribute("play-button", "intervalId:" + setInterval(function() {
          let ind = button.target.getAttribute("slide-container").index
          let len = button.target.getAttribute("slide-container").length
          ind = (ind + 1) % len
          button.target.setAttribute("slide-container", "index:" + ind)
        }, button.rate))
        
        el.setAttribute("play-button", "playing:" + true)
        button.buttonText.setAttribute("text", {value: "Pause"})
      }
    })
  },
})

