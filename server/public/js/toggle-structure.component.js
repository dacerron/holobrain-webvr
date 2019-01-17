AFRAME.registerComponent('toggle-structure', {
    schema: {
        target: { type: 'selectorAll', default: '' }
    },

    init: function () {
        var el = this.el;
        var target = this.data.target;
        if (target) {
            console.log(target);
            el.addEventListener('click', function () {
                target.forEach((e) => {
                    e.getAttribute("visible") ? e.setAttribute("visible", false) : e.setAttribute("visible", true);
                });
            });
        }
    }
})