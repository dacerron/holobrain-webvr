window.closeDropdown = function() {
    console.log("closedropdown");
    var animateDropdown = document.getElementById("dropaniback");
    animateDropdown.emit('closedropdown');
    var animateDropdown1 = document.getElementById("dropani1back");
    animateDropdown1.emit('closedropdown');

    var animateDropdownVal = document.getElementById("dropvalaniback");
    var animateDropdownVal1 = document.getElementById("dropvalani1back");
    var animateDropdownVal2 = document.getElementById("dropvalani2back");
    animateDropdownVal.emit('closedropdown');
    animateDropdownVal1.emit('closedropdown');
    animateDropdownVal2.emit('closedropdown');

}
window.openDropdown = function() {
    console.log("opendropdown");
    var animateDropdown = document.getElementById("dropani");
    animateDropdown.emit('opendropdown');
    var animateDropdown1 = document.getElementById("dropani1");
    animateDropdown1.emit('opendropdown');

    var animateDropdownVal = document.getElementById("dropvalani");
    var animateDropdownVal1 = document.getElementById("dropvalani1");
    var animateDropdownVal2 = document.getElementById("dropvalani2");
    animateDropdownVal.emit('opendropdown');
    animateDropdownVal1.emit('opendropdown');
    animateDropdownVal2.emit('opendropdown');
}