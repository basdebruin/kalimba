// script for kalimba webapp
// bas de bruin

var tines;


// check if device has mouse
var isTouchDevice = true;
document.addEventListener('mousemove', function() {
    isTouchDevice = false;
});


// INIT called on body load
function init() {
    
    tines = document.getElementById('tines').childNodes;
    

    // add button event listeners
    tines.forEach( elem => {

        elem.addEventListener('pointerdown',  () => tineEnter(elem));
        elem.addEventListener('pointerup',    () => tineLeave(elem));
        elem.addEventListener('pointermove',  (event) => tineMove(elem, event));

    });

}

// tine enter and leave functions
function tineEnter(elem) {
    if (!elem.classList.contains('active')) elem.classList.add('active');
}

function tineLeave(elem) {
    if (elem.classList.contains('active')) elem.classList.remove('active');
}

function tineMove(elem, event) {
    // check if still touching inside tine (only works on phones)
    const rect = elem.getBoundingClientRect();
    if (rect.bottom - 10 < event.clientY) {
        tineLeave(elem);
        console.log("tineMove end");
        elem.removeEventListener('pointermove', tineMove);
    }
}
