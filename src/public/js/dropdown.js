AFRAME.registerComponent('opendropdown', {
    schema: {
        target: { type: 'selector', default: '' }
    },

    init: function () {
        var target = this.data.target;
        if (target) {
            this.el.addEventListener('click', () => {
                var animateDropdown = target.querySelector("#dropani");
                console.log("animate dropdown : " + animateDropdown);
                animateDropdown.emit('opendropdown');
                var animateDropdown1 = target.querySelector("#dropani1");
                animateDropdown1.emit('opendropdown');

                var animateDropdownVal = target.querySelector("#dropvalani");
                var animateDropdownVal1 = target.querySelector("#dropvalani1");
                var animateDropdownVal2 = target.querySelector("#dropvalani2");
                animateDropdownVal.emit('opendropdown');
                animateDropdownVal1.emit('opendropdown');
                animateDropdownVal2.emit('opendropdown');
            });
        }
    }
});

AFRAME.registerComponent('closedropdown', {
    schema: {
        target: { type: 'selector', default: '' }
    },

    init: function () {
        var target = this.data.target;
        this.el.addEventListener('click', () => {
            var animateDropdown = target.querySelector("#dropaniback");
            animateDropdown.emit('closedropdown');
            var animateDropdown1 = target.querySelector("#dropani1back");
            animateDropdown1.emit('closedropdown');

            var animateDropdownVal = target.querySelector("#dropvalaniback");
            var animateDropdownVal1 = target.querySelector("#dropvalani1back");
            var animateDropdownVal2 = target.querySelector("#dropvalani2back");
            animateDropdownVal.emit('closedropdown');
            animateDropdownVal1.emit('closedropdown');
            animateDropdownVal2.emit('closedropdown');
        });
    }
});