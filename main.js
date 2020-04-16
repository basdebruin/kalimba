// script for kalimba webapp
// bas de bruin

var tines;

const DEBUG = false;

// y-axis mouse movement
var lastMousePosition = 0;
var mouseVelocity = 0;

// INIT called on body load
function init() {
    
    tines = document.getElementById('tines').childNodes;
    
    // add button event listeners
    tines.forEach( elem => {

        elem.addEventListener('pointerdown',  event => tineEnter(elem, event));
        elem.addEventListener('pointerup',    ()    => tineLeave(elem));
        elem.addEventListener('pointermove',  event => tineMove(elem, event));

    });

}



var active = false;

// tine enter and leave functions
function tineEnter(elem, event) {
    active = true;

    Tone.context.resume();

    // add active class
    if (!elem.classList.contains('active')) elem.classList.add('active');

    // reset lastMousePosition and velocity
    lastMousePosition = event.clientY - 1;
    mouseVelocity = 1;
}

function tineMove(elem, event) {
    // calc velocity
    mouseVelocity = event.clientY - lastMousePosition;
    // set lastMousePosition
    lastMousePosition = event.clientY;

    // check if still touching inside tine
    if (active) {
        const rect = elem.getBoundingClientRect();
        if (rect.bottom - 10 < event.clientY) {
            tineLeave(elem);
        }
    }
}

function tineLeave(elem) {
    if (active) {
        active = false;

        // remove active class
        if (elem.classList.contains('active')) elem.classList.remove('active');

        // calc velocity
        const velocity = Math.abs(mouseVelocity*0.01) + 0.1;

        // TRIGGER SYNTH
        synth.triggerAttackRelease(elem.dataset.note, '8n', Tone.now(), velocity);

        // debug velocity
        if (DEBUG) {
            console.log("vel y: " + mouseVelocity);
            document.getElementById('debug').innerHTML = "vel y: " + mouseVelocity;
        }
    }
}