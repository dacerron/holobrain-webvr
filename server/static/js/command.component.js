AFRAME.registerComponent('command', {
    schema: {type: "string"},
    init: function() {
        var el = this.el;

        this.el.addEventListener('click', function(e) {
            console.log('command clicked');
            var networkInterface = document.networkInterface;
            var id = el.getAttribute("id");
            console.log(networkInterface);
            if(networkInterface) {
                console.log("sending command: " + id);
                networkInterface.emit('teacherCommand', {command: id});
            } else {
                console.log("network interface is not ready yet");
            }
        });
    }
})